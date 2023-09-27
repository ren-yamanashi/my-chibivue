// NOTE: DOM操作をするためのオブジェクトを実装
import { RendererOptions } from "../runtime-core";

export const nodeOps: RendererOptions<Node> = {
  setElementText(node, text) {
    node.textContent = text;
  },
};
