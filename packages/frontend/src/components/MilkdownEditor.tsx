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
import { Uploader, upload, uploadConfig } from "@milkdown/plugin-upload"
import {
  commonmark,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInHeadingCommand,
  wrapInOrderedListCommand,
} from "@milkdown/preset-commonmark"
import { Node, Schema } from "@milkdown/prose/model"
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react"
import { nord } from "@milkdown/theme-nord"
import { callCommand } from "@milkdown/utils"
import { FontBoldIcon, FontItalicIcon, QuoteIcon } from "@radix-ui/react-icons"
import { BiListOl, BiListUl } from "react-icons/bi"
import { GrRedo, GrUndo } from "react-icons/gr"
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu"
import { cn } from "utils"
import { Button } from "./ui/button"

interface MilkdownEditorProps {
  onChange: (value: string) => void
  placeholder?: string
}

const uploader: Uploader = async (files: FileList, schema: Schema) => {
  const images: File[] = []
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)
    if (!file) continue
    if (!file.type.includes("image")) continue
    images.push(file)
  }

  const nodes: Node[] = await Promise.all(
    images.map(async (image) => {
      console.log(image)
      const src = await fetch("/api/upload", {
        method: "POST",
        body: image,
      })
      const alt = image.name
      return schema.nodes.image.createAndFill({
        src,
        alt,
      }) as Node
    }),
  )

  return nodes
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

          ctx.update(uploadConfig.key, (prev) => ({
            ...prev,
            uploader,
          }))
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
          "p-3",
          "bg-[#D1E9FA]",
          "flex",
          "items-center",
          "gap-2",
          "border-b-0",
        )}
      >
        <Button
          onClick={() => call(undoCommand.key)}
          variant={"outlineWhite"}
          size="icon"
        >
          <GrUndo />
        </Button>
        <Button
          onClick={() => call(redoCommand.key)}
          variant="outlineWhite"
          size="icon"
        >
          <GrRedo />
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
        <Button
          onClick={() => call(wrapInHeadingCommand.key, 1)}
          variant="outlineWhite"
          size="icon"
        >
          <LuHeading1 />
        </Button>
        <Button
          onClick={() => call(wrapInHeadingCommand.key, 2)}
          variant="outlineWhite"
          size="icon"
        >
          <LuHeading2 />
        </Button>
        <Button
          onClick={() => call(wrapInHeadingCommand.key, 3)}
          variant="outlineWhite"
          size="icon"
        >
          <LuHeading3 />
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
