import { CmdKey, Editor, editorViewOptionsCtx, rootCtx } from "@milkdown/core"
import { clipboard } from "@milkdown/plugin-clipboard"
import { cursor } from "@milkdown/plugin-cursor"
import { emoji } from "@milkdown/plugin-emoji"
import {
  history,
  historyKeymap,
  redoCommand,
  undoCommand,
} from "@milkdown/plugin-history"
import { indent } from "@milkdown/plugin-indent"
import { listener, listenerCtx } from "@milkdown/plugin-listener"
import { upload } from "@milkdown/plugin-upload"
import {
  commonmark,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from "@milkdown/preset-commonmark"
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react"
import { nord } from "@milkdown/theme-nord"
import { callCommand } from "@milkdown/utils"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  QuoteIcon,
} from "@radix-ui/react-icons"
import { BiListOl, BiListUl } from "react-icons/bi"
import { cn } from "utils"
import { Button } from "./ui/button"

interface MilkdownEditorProps {
  onChange: (value: string) => void
  placeholder?: string
}

const MilkdownEditor = ({ onChange }: MilkdownEditorProps) => {
  const { get } = useEditor(
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

  function call<T>(command: CmdKey<T>, payload?: T) {
    return get()?.action(callCommand(command, payload))
  }
  return (
    <div>
      <div
        className={cn(
          "border",
          "p-1",
          "bg-[#EAEAE6]",
          "flex",
          "items-center",
          "gap-1",
          "border-b-0",
        )}
      >
        <Button
          onClick={() => call(undoCommand.key)}
          variant={"outlineWhite"}
          size="icon"
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          onClick={() => call(redoCommand.key)}
          variant="outlineWhite"
          size="icon"
        >
          <ArrowRightIcon />
        </Button>
        <Button
          onClick={() => call(toggleStrongCommand.key)}
          variant="outlineWhite"
          size="icon"
        >
          <FontBoldIcon />
        </Button>
        <Button
          onClick={() => call(toggleEmphasisCommand.key)}
          variant="outlineWhite"
          size="icon"
        >
          <FontItalicIcon />
        </Button>
        <Button
          onClick={() => call(wrapInBulletListCommand.key)}
          variant="outlineWhite"
          size="icon"
        >
          <BiListUl />
        </Button>
        <Button
          onClick={() => call(wrapInOrderedListCommand.key)}
          variant="outlineWhite"
          size="icon"
        >
          <BiListOl />
        </Button>
        <Button
          onClick={() => call(wrapInBlockquoteCommand.key)}
          variant="outlineWhite"
          size="icon"
        >
          <QuoteIcon />
        </Button>
      </div>
      <Milkdown />
    </div>
  )
}

export const MilkdownEditorWrapper = ({ onChange }: MilkdownEditorProps) => {
  return (
    <MilkdownProvider>
      <MilkdownEditor onChange={onChange} />
    </MilkdownProvider>
  )
}
