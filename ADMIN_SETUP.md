# Painel administrativo (`/admin`)

Painel de conteúdo para criar, editar e excluir artigos, com editor de texto rico,
upload de imagens no corpo do texto e gestão de categorias — tudo na infraestrutura
Cloudflare, sem depender do GitHub para publicar.

- **Conteúdo** → Cloudflare **D1** (binding `DB`)
- **Imagens** → **Cloudinary** (upload assinado no servidor; URL servida pela CDN do Cloudinary)
- **Login** → senha **estática** `111111` (valor fixo, sem banco). Para mudá-la,
  ajuste a variável `ADMIN_PASSWORD` (env file local / Worker secret em produção).

O site público lê do D1. Enquanto o D1 não estiver provisionado, ele continua
servindo os artigos estáticos antigos (`src/data/posts.ts`) — nada quebra.

---

## 1. Provisionar os recursos (uma vez)

```bash
# Banco de conteúdo
npx wrangler d1 create jgbrasio-content
# copie o "database_id" retornado para wrangler.jsonc (campo database_id)

# Segredos do Worker
npx wrangler secret put SESSION_SECRET          # valor aleatório longo
npx wrangler secret put CLOUDINARY_API_SECRET   # do painel do Cloudinary
```

Edite **`wrangler.jsonc`** e preencha em `vars`:
- `CLOUDINARY_CLOUD_NAME` e `CLOUDINARY_API_KEY` (do painel do Cloudinary)
- `CLOUDINARY_FOLDER` (opcional, padrão `jgbrasio`)

> **Cloudinary**: crie uma conta gratuita em cloudinary.com. Em **Settings → API Keys**
> você encontra *Cloud name*, *API Key* e *API Secret*. O *API Secret* é sigiloso —
> use `wrangler secret put`, nunca o coloque no código.

## 2. Aplicar a estrutura do banco

```bash
npx wrangler d1 migrations apply jgbrasio-content --remote
```

## 3. Publicar

`git push` na branch `main` dispara o deploy (GitHub Actions → Cloudflare).
Defina os secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` no GitHub e
`SESSION_SECRET` no Worker (passo 1).

## 4. Usar

1. Acesse `https://jgbrasio.com.br/admin`
2. Senha: **`111111`** (estática; para alterar, mude `ADMIN_PASSWORD`)
3. **Novo artigo** → título, categoria, texto rico, imagens no corpo → **Publicar**
4. O artigo aparece em `/blog` imediatamente

Os artigos estáticos existentes são migrados automaticamente para o D1 na primeira
vez que o banco é acessado.

---

## Desenvolvimento local

- `npm run dev` roda o site, **mas sem bindings** (o `@cloudflare/vite-plugin` só
  age no build). Em dev o site usa o conteúdo estático e o painel não grava no banco.
- Para testar o D1 localmente de verdade, use o banco local (imagens exigem as credenciais do Cloudinary no `.dev.vars`):
  ```bash
  npx wrangler d1 migrations apply jgbrasio-content --local
  ```
  e exercite o Worker já construído no ambiente Cloudflare (deploy de preview).

### Testes rápidos

```bash
# lógica pura (hash de senha, sanitização de HTML, slug/resumo)
node_modules/.bin/esbuild scripts/selftest.ts --bundle --platform=node --format=esm --tsconfig=tsconfig.json --outfile=scripts/selftest.mjs && node scripts/selftest.mjs

# SQL contra o SQLite local
npx wrangler d1 execute jgbrasio-content --local --file=scripts/dbtest.sql
```

---

## Segurança

- A senha é **estática** (`ADMIN_PASSWORD`, padrão `111111`), comparada em tempo constante, sem banco.
- A sessão é um cookie **httpOnly + Secure** cifrado com `SESSION_SECRET`.
- O HTML dos artigos é **sanitizado** no servidor (remove scripts, handlers e URLs perigosas).
- **Defina `SESSION_SECRET`** em produção e, se quiser, troque `ADMIN_PASSWORD` para algo mais forte que `111111`.
