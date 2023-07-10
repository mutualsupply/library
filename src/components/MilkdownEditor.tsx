import { Editor, editorViewOptionsCtx, rootCtx } from "@milkdown/core";
import { upload } from "@milkdown/plugin-upload";
import { commonmark } from "@milkdown/preset-commonmark";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";
const MilkdownEditor = () => {
  const { get } = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => {
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            class:
              "border border-primary rounded-md px-3 py-1 outline-none text-sm min-h-[150px] bg-background",
          },
        }));
        ctx.set(rootCtx, root);
      })
      .use(commonmark)
      .use(upload)
  );
  return <Milkdown />;
};

export const MilkdownEditorWrapper = () => {
  return (
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  );
};
