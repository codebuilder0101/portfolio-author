import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  FolderTree,
  FileText,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/RichTextEditor";
import type { Article } from "@/lib/articles";
import {
  getSession,
  login,
  logout,
  adminListArticles,
  adminSaveArticle,
  adminDeleteArticle,
  adminListCategories,
  adminCreateCategory,
  adminDeleteCategory,
  type Category,
} from "@/serverfn/admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administração — J. G. Brasio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function errMessage(e: unknown): string {
  return e instanceof Error ? e.message : "Ocorreu um erro.";
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function AdminPage() {
  const [auth, setAuth] = useState<"loading" | "out" | "in">("loading");

  useEffect(() => {
    getSession()
      .then((s) => setAuth(s.authenticated ? "in" : "out"))
      .catch(() => setAuth("out"));
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 font-sans text-foreground">
      <Toaster position="top-center" richColors />
      {auth === "loading" && (
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {auth === "out" && <LoginScreen onSuccess={() => setAuth("in")} />}
      {auth === "in" && <Dashboard onLoggedOut={() => setAuth("out")} />}
    </div>
  );
}

// ---------------- Login ----------------

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { ok } = await login({ data: { password } });
      if (ok) onSuccess();
      else toast.error("Senha incorreta.");
    } catch (e) {
      toast.error(errMessage(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl border bg-background p-8 shadow-sm"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-light">Administração</h1>
          <p className="mt-1 text-sm text-muted-foreground">Acesso restrito ao autor.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
          />
        </div>
        <Button type="submit" className="mt-6 w-full" disabled={busy || !password}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </div>
  );
}

// ---------------- Dashboard ----------------

type View = "list" | "edit" | "categories";

function Dashboard({ onLoggedOut }: { onLoggedOut: () => void }) {
  const [view, setView] = useState<View>("list");
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAuthError = useCallback(
    (e: unknown) => {
      const msg = errMessage(e);
      if (/autoriz/i.test(msg)) {
        onLoggedOut();
        return true;
      }
      return false;
    },
    [onLoggedOut],
  );

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const [a, c] = await Promise.all([adminListArticles(), adminListCategories()]);
      setArticles(a);
      setCategories(c);
    } catch (e) {
      if (!handleAuthError(e)) toast.error(errMessage(e));
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);

  useEffect(() => {
    reload();
  }, [reload]);

  async function doLogout() {
    try {
      await logout();
    } catch {
      /* ignore */
    }
    onLoggedOut();
  }

  function newArticle() {
    setEditing(null);
    setView("edit");
  }

  function editArticle(a: Article) {
    setEditing(a);
    setView("edit");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-light">Painel de conteúdo</h1>
          <p className="text-sm text-muted-foreground">J. G. Brasio</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setView("categories")}>
            <FolderTree className="mr-1.5 h-4 w-4" /> Categorias
          </Button>
          <Button variant="ghost" size="sm" onClick={doLogout}>
            <LogOut className="mr-1.5 h-4 w-4" /> Sair
          </Button>
        </div>
      </header>

      {view === "list" && (
        <ArticleList
          articles={articles}
          loading={loading}
          onNew={newArticle}
          onEdit={editArticle}
          onDeleted={reload}
          onAuthError={handleAuthError}
        />
      )}

      {view === "edit" && (
        <ArticleEditor
          article={editing}
          categories={categories}
          onCancel={() => setView("list")}
          onSaved={async () => {
            await reload();
            setView("list");
          }}
          onCategoryAdded={reload}
          onAuthError={handleAuthError}
        />
      )}

      {view === "categories" && (
        <CategoryManager
          categories={categories}
          onBack={() => setView("list")}
          onChanged={reload}
          onAuthError={handleAuthError}
        />
      )}

    </div>
  );
}

// ---------------- Article list ----------------

function ArticleList({
  articles,
  loading,
  onNew,
  onEdit,
  onDeleted,
  onAuthError,
}: {
  articles: Article[];
  loading: boolean;
  onNew: () => void;
  onEdit: (a: Article) => void;
  onDeleted: () => void;
  onAuthError: (e: unknown) => boolean;
}) {
  async function del(a: Article) {
    if (!window.confirm(`Excluir o artigo “${a.title}”? Esta ação não pode ser desfeita.`)) return;
    try {
      await adminDeleteArticle({ data: a.id });
      toast.success("Artigo excluído.");
      onDeleted();
    } catch (e) {
      if (!onAuthError(e)) toast.error(errMessage(e));
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Artigos ({articles.length})</h2>
        <Button onClick={onNew} size="sm">
          <Plus className="mr-1.5 h-4 w-4" /> Novo artigo
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
          <FileText className="mx-auto mb-3 h-8 w-8 opacity-50" />
          Nenhum artigo ainda. Crie o primeiro.
        </div>
      ) : (
        <ul className="space-y-2">
          {articles.map((a) => (
            <li
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-background p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{a.title}</span>
                  {!a.published && <Badge variant="secondary">Rascunho</Badge>}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {a.category || "Sem categoria"} · {a.date} · {a.readingTime}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {a.published && (
                  <a
                    href={`/blog/${a.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Ver no site"
                    className="inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(a)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => del(a)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------------- Article editor ----------------

function ArticleEditor({
  article,
  categories,
  onCancel,
  onSaved,
  onCategoryAdded,
  onAuthError,
}: {
  article: Article | null;
  categories: Category[];
  onCancel: () => void;
  onSaved: () => void;
  onCategoryAdded: () => void;
  onAuthError: (e: unknown) => boolean;
}) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [category, setCategory] = useState(article?.category ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [date, setDate] = useState((article?.date ?? todayISO()).slice(0, 10));
  const [published, setPublished] = useState(article?.published ?? true);
  const [contentHtml, setContentHtml] = useState(article?.contentHtml ?? "");
  const [saving, setSaving] = useState(false);

  async function addCategory() {
    const name = window.prompt("Nome da nova categoria");
    if (!name?.trim()) return;
    try {
      const c = await adminCreateCategory({ data: name.trim() });
      setCategory(c.name);
      onCategoryAdded();
      toast.success("Categoria criada.");
    } catch (e) {
      if (!onAuthError(e)) toast.error(errMessage(e));
    }
  }

  async function save() {
    if (!title.trim()) {
      toast.error("Informe o título.");
      return;
    }
    setSaving(true);
    try {
      await adminSaveArticle({
        data: {
          id: article?.id,
          title: title.trim(),
          category,
          excerpt: excerpt.trim() || undefined,
          contentHtml,
          date,
          published,
        },
      });
      toast.success(article ? "Artigo atualizado." : "Artigo publicado.");
      onSaved();
    } catch (e) {
      if (!onAuthError(e)) toast.error(errMessage(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <button
        onClick={onCancel}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>

      <h2 className="mb-6 text-lg font-medium">{article ? "Editar artigo" : "Novo artigo"}</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="category">Categoria</Label>
              <button
                type="button"
                onClick={addCategory}
                className="text-xs text-primary hover:underline"
              >
                + nova
              </button>
            </div>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Sem categoria</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Resumo (opcional)</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Gerado automaticamente a partir do texto se deixado em branco."
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>Conteúdo</Label>
          <RichTextEditor
            value={contentHtml}
            onChange={setContentHtml}
            onUploadError={(m) => toast.error(m)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch id="published" checked={published} onCheckedChange={setPublished} />
          <Label htmlFor="published" className="cursor-pointer">
            {published ? "Publicado (visível no site)" : "Rascunho (oculto)"}
          </Label>
        </div>

        <div className="flex items-center gap-3 border-t pt-6">
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : article ? "Salvar alterações" : "Publicar"}
          </Button>
          <Button variant="ghost" onClick={onCancel} disabled={saving}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------------- Categories ----------------

function CategoryManager({
  categories,
  onBack,
  onChanged,
  onAuthError,
}: {
  categories: Category[];
  onBack: () => void;
  onChanged: () => void;
  onAuthError: (e: unknown) => boolean;
}) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      await adminCreateCategory({ data: name.trim() });
      setName("");
      onChanged();
      toast.success("Categoria criada.");
    } catch (e) {
      if (!onAuthError(e)) toast.error(errMessage(e));
    } finally {
      setBusy(false);
    }
  }

  async function del(c: Category) {
    if (!window.confirm(`Excluir a categoria “${c.name}”?`)) return;
    try {
      await adminDeleteCategory({ data: c.id });
      onChanged();
      toast.success("Categoria excluída.");
    } catch (e) {
      if (!onAuthError(e)) toast.error(errMessage(e));
    }
  }

  return (
    <div className="max-w-lg">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>
      <h2 className="mb-6 text-lg font-medium">Categorias</h2>

      <form onSubmit={add} className="mb-6 flex gap-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nova categoria" />
        <Button type="submit" disabled={busy || !name.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center justify-between rounded-lg border bg-background p-3">
            <span>{c.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => del(c)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
        {categories.length === 0 && (
          <li className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            Nenhuma categoria.
          </li>
        )}
      </ul>
    </div>
  );
}
