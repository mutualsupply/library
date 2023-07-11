import { Editor, editorViewOptionsCtx, rootCtx } from "@milkdown/core";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { upload } from "@milkdown/plugin-upload";
import { commonmark } from "@milkdown/preset-commonmark";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";

interface MilkdownEditorProps {
  onChange: (value: string) => void;
}

const MilkdownEditor = ({ onChange }: MilkdownEditorProps) => {
  const { get } = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => {
        const listener = ctx.get(listenerCtx);
        listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            if (onChange) {
              onChange(markdown);
            }
          }
        });
      })
      .config((ctx) => {
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            class:
              "border-b border-primary px-3 py-1 outline-none text-sm min-h-[150px] bg-transparent text-base prose max-w-full",
          },
        }));
        ctx.set(rootCtx, root);
      })
      .use(listener)
      .use(commonmark)
      .use(upload)
  );
  return <Milkdown />;
};

export const MilkdownEditorWrapper = ({ onChange }: MilkdownEditorProps) => {
  return (
    <MilkdownProvider>
      <MilkdownEditor onChange={onChange} />
    </MilkdownProvider>
  );
};
