import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link2,
  ImagePlus,
  Pilcrow,
  Loader2,
} from "lucide-react";
import { adminUploadImage } from "@/serverfn/admin";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  onUploadError?: (message: string) => void;
}

export function RichTextEditor({ value, onChange, onUploadError }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [uploading, setUploading] = useState(false);

  // Initialise / sync content without clobbering the caret while editing.
  useEffect(() => {
    const el = editorRef.current;
    if (el && el.innerHTML !== value) {
      el.innerHTML = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = editorRef.current;
    if (el && document.activeElement !== el && el.innerHTML !== value) {
      el.innerHTML = value;
    }
  }, [value]);

  function emitChange() {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }

  function saveSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  }

  function restoreSelection() {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    const sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    if (savedRange.current) {
      sel.addRange(savedRange.current);
    } else {
      // place caret at end
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      sel.addRange(range);
    }
  }

  function exec(command: string, arg?: string) {
    restoreSelection();
    document.execCommand(command, false, arg);
    emitChange();
    saveSelection();
  }

  function insertHtmlAtCaret(html: string) {
    restoreSelection();
    document.execCommand("insertHTML", false, html);
    emitChange();
    saveSelection();
  }

  function addLink() {
    const url = window.prompt("Endereço do link (https://...)");
    if (!url) return;
    exec("createLink", url);
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const { url } = await adminUploadImage({ data: form });
        insertHtmlAtCaret(
          `<figure><img src="${url}" alt="" /></figure><p></p>`,
        );
      }
    } catch (err) {
      onUploadError?.(err instanceof Error ? err.message : "Falha ao enviar a imagem.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  const tools: { icon: typeof Bold; label: string; action: () => void }[] = [
    { icon: Pilcrow, label: "Parágrafo", action: () => exec("formatBlock", "p") },
    { icon: Heading2, label: "Título", action: () => exec("formatBlock", "h2") },
    { icon: Heading3, label: "Subtítulo", action: () => exec("formatBlock", "h3") },
    { icon: Bold, label: "Negrito", action: () => exec("bold") },
    { icon: Italic, label: "Itálico", action: () => exec("italic") },
    { icon: Quote, label: "Citação", action: () => exec("formatBlock", "blockquote") },
    { icon: List, label: "Lista", action: () => exec("insertUnorderedList") },
    { icon: ListOrdered, label: "Lista numerada", action: () => exec("insertOrderedList") },
    { icon: Link2, label: "Link", action: addLink },
  ];

  return (
    <div className="rounded-md border border-input bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-input p-2">
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            title={t.label}
            aria-label={t.label}
            onMouseDown={(e) => {
              e.preventDefault();
              saveSelection();
            }}
            onClick={t.action}
            className="inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <t.icon className="h-4 w-4" />
          </button>
        ))}
        <span className="mx-1 h-5 w-px bg-border" />
        <button
          type="button"
          title="Inserir imagem"
          aria-label="Inserir imagem"
          disabled={uploading}
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
          }}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded px-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          <span className="hidden sm:inline">{uploading ? "Enviando…" : "Imagem"}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        onInput={emitChange}
        onBlur={() => {
          saveSelection();
          emitChange();
        }}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className={cn(
          "article-body min-h-[320px] w-full px-4 py-3 text-base leading-relaxed outline-none",
          "prose-editor",
        )}
      />
    </div>
  );
}
