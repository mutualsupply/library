import { Editor, editorViewOptionsCtx, rootCtx } from "@milkdown/core"
import { clipboard } from "@milkdown/plugin-clipboard"
import { cursor } from "@milkdown/plugin-cursor"
import { emoji } from "@milkdown/plugin-emoji"
import { history, historyKeymap } from "@milkdown/plugin-history"
import { indent } from "@milkdown/plugin-indent"
import { listener, listenerCtx } from "@milkdown/plugin-listener"
import { upload } from "@milkdown/plugin-upload"
import { commonmark } from "@milkdown/preset-commonmark"
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react"
import { nord } from "@milkdown/theme-nord"

interface MilkdownEditorProps {
  onChange: (value: string) => void
  placeholder?: string
}

const MilkdownEditor = ({ onChange }: MilkdownEditorProps) => {
  useEditor(
    (root) =>
      Editor.make()
        .config((ctx) => {
          const listener = ctx.get(listenerCtx)
          listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
            if (markdown !== prevMarkdown) {
              if (onChange) {
                onChange(markdown)
              }
            }
          })

          ctx.set(historyKeymap.key, {
            Undo: "Mod-z",
            Redo: ["Mod-y", "Shift-Mod-z"],
          })

          ctx.update(editorViewOptionsCtx, (prev) => ({
            ...prev,
            attributes: {
              class:
                "border border-primary px-3 py-1 outline-none text-base min-h-[150px] bg-transparent text-base prose max-w-full",
            },
          }))
          ctx.set(rootCtx, root)

          ctx.set(historyKeymap.key, {
            Undo: "Mod-z",
            Redo: ["Mod-y", "Shift-Mod-z"],
          })
        })
        .config(nord)
        .use(clipboard)
        .use(history)
        .use(emoji)
        .use(listener)
        .use(commonmark)
        .use(indent)
        .use(upload)
        .use(cursor),
    [],
  )
  return <Milkdown />
}

export const MilkdownEditorWrapper = ({ onChange }: MilkdownEditorProps) => {
  return (
    <MilkdownProvider>
      <MilkdownEditor onChange={onChange} />
    </MilkdownProvider>
  )
}
