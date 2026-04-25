import { e as enable_async_mode_flag, d as delegate, a as append_styles, r as run, b as async, c as append, p as pop, f as child, g as from_html, t as tick, o as onMount, h as push, s as set, i as if_block, j as get, k as reset, l as state } from "./svelte-DzVighvY.js";
const PUBLIC_VERSION = "5";
if (typeof window !== "undefined") {
  ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(PUBLIC_VERSION);
}
enable_async_mode_flag();
const Pause = '<svg viewBox="0 0 24 24" width="1.2em" height="1.2em" ><path fill="currentColor" d="M16 19q-.825 0-1.412-.587T14 17V7q0-.825.588-1.412T16 5t1.413.588T18 7v10q0 .825-.587 1.413T16 19m-8 0q-.825 0-1.412-.587T6 17V7q0-.825.588-1.412T8 5t1.413.588T10 7v10q0 .825-.587 1.413T8 19"/></svg>';
const Play = '<svg viewBox="0 0 24 24" width="1.2em" height="1.2em" ><path fill="currentColor" d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712"/></svg>';
var root = from_html(`<button aria-label="Pause video" class="button svelte-9rkofa"><!></button>`);
const $$css = {
  hash: "svelte-9rkofa",
  code: ".button.svelte-9rkofa {background:var(--color-);background:var(--color-orange-300);color:var(--color-orange-900);}.button.svelte-9rkofa:hover {background:var(--color-orange-200);}"
};
function PauseButton($$anchor, $$props) {
  push($$props, true);
  append_styles($$anchor, $$css);
  let video;
  function toggleVideo() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  let isPaused = state(false);
  var $$promises = run([
    tick,
    () => void onMount(() => {
      video = document.getElementById("herovid");
      video.addEventListener("pause", () => {
        set(isPaused, true);
      });
      video.addEventListener("play", () => {
        set(isPaused, false);
      });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.pause();
      }
    })
  ]);
  var button = root();
  button.__click = toggleVideo;
  var node = child(button);
  async(node, [$$promises[1]], void 0, (node2) => {
    var consequent = ($$anchor2) => {
      Play($$anchor2, { width: 32, height: 32 });
    };
    var alternate = ($$anchor2) => {
      Pause($$anchor2, { width: 32, height: 32 });
    };
    if_block(node2, ($$render) => {
      if (get(isPaused)) $$render(consequent);
      else $$render(alternate, false);
    });
  });
  reset(button);
  append($$anchor, button);
  pop();
}
delegate(["click"]);
export {
  PauseButton as default
};
