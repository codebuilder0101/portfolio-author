// Server-only Cloudinary client: signed upload + destroy, using Web Crypto
// (available in the Worker runtime). No SDK dependency.

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
}

export interface CloudinaryUploadResult {
  url: string; // secure_url
  publicId: string;
  bytes: number;
  format: string;
}

async function sha1Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Cloudinary signature: sort the to-sign params, join as `k=v&...`, append the
// API secret, then SHA-1 hex.
async function signParams(params: Record<string, string | number>, apiSecret: string): Promise<string> {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return sha1Hex(toSign + apiSecret);
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

export async function uploadImage(
  bytes: ArrayBuffer,
  filename: string,
  contentType: string,
  cfg: CloudinaryConfig,
): Promise<CloudinaryUploadResult> {
  const timestamp = nowSeconds();
  const signature = await signParams({ folder: cfg.folder, timestamp }, cfg.apiSecret);

  const form = new FormData();
  form.append("file", new Blob([bytes], { type: contentType }), filename);
  form.append("api_key", cfg.apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", cfg.folder);
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  const json = (await res.json()) as {
    secure_url?: string;
    public_id?: string;
    bytes?: number;
    format?: string;
    error?: { message?: string };
  };
  if (!res.ok || !json.secure_url || !json.public_id) {
    throw new Error(json.error?.message || "Falha no upload para o Cloudinary.");
  }
  return {
    url: json.secure_url,
    publicId: json.public_id,
    bytes: json.bytes ?? 0,
    format: json.format ?? "",
  };
}

export async function destroyImage(publicId: string, cfg: CloudinaryConfig): Promise<void> {
  const timestamp = nowSeconds();
  const signature = await signParams({ public_id: publicId, timestamp }, cfg.apiSecret);

  const form = new FormData();
  form.append("public_id", publicId);
  form.append("api_key", cfg.apiKey);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/image/destroy`, {
    method: "POST",
    body: form,
  });
  const json = (await res.json()) as { result?: string; error?: { message?: string } };
  // "ok" = deleted, "not found" = already gone — both acceptable.
  if (!res.ok || (json.result !== "ok" && json.result !== "not found")) {
    throw new Error(json.error?.message || "Falha ao remover a imagem no Cloudinary.");
  }
}
