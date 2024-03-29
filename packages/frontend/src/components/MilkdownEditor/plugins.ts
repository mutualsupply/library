import { InitReady, prosePluginsCtx } from "@milkdown/core";
import type { MilkdownPlugin, TimerType } from "@milkdown/ctx";
import { createSlice, createTimer } from "@milkdown/ctx";
import { Plugin, PluginKey } from "@milkdown/prose/state";
import type { EditorView } from "@milkdown/prose/view";

export const placeholderCtx = createSlice(
	"Please input here...",
	"placeholder",
);
export const placeholderTimerCtx = createSlice(
	[] as TimerType[],
	"editorStateTimer",
);

export const PlaceholderReady = createTimer("PlaceholderReady");

const key = new PluginKey("MILKDOWN_PLACEHOLDER");

export const placeholder: MilkdownPlugin = (ctx) => {
	ctx
		.inject(placeholderCtx)
		.inject(placeholderTimerCtx, [InitReady])
		.record(PlaceholderReady);

	return async () => {
		await ctx.waitTimers(placeholderTimerCtx);

		const prosePlugins = ctx.get(prosePluginsCtx);

		const update = (view: EditorView) => {
			const placeholder = ctx.get(placeholderCtx);
			const doc = view.state.doc;
			if (
				view.editable &&
				doc.childCount === 1 &&
				doc.firstChild?.isTextblock &&
				doc.firstChild?.content.size === 0 &&
				doc.firstChild?.type.name === "paragraph"
			) {
				// view.dom.innerHTML = placeholder;
				view.dom.setAttribute("data-placeholder", placeholder);
			} else {
				// view.dom.innerHTML = "";
				view.dom.removeAttribute("data-placeholder");
			}
		};

		const plugins = [
			...prosePlugins,
			new Plugin({
				key,
				// @note this was commented out in the source
				// https://github.com/HexMox/milkdown-plugin-placeholder/blob/main/src/index.ts

				// props: {
				//   decorations(state) {
				//     const doc = state.doc
				//     if (
				//       doc.childCount === 1 &&
				//       doc.firstChild?.isTextblock &&
				//       doc.firstChild?.content.size === 0
				//     ) {
				//       return DecorationSet.create(doc, [
				//         Decoration.widget(1, (view) => {
				//           if (view.editable) {
				//             const span = document.createElement('span')
				//             span.classList.add('placeholder')
				//             span.textContent = placeholder
				//             return span
				//           }
				//         }),
				//       ])
				//     }
				//   },
				// },
				view(view) {
					update(view);

					return { update };
				},
			}),
		];

		ctx.set(prosePluginsCtx, plugins);

		ctx.done(PlaceholderReady);
	};
};
