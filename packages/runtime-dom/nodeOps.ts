// NOTE: DOM操作をするためのオブジェクトを実装
import { RendererOptions } from "../runtime-core";

export const nodeOps: Omit<RendererOptions, "patchProp"> = {
  createElement: (tagName) => {
    return document.createElement(tagName);
  },

  createText: (text: string) => {
    return document.createTextNode(text);
  },

  setText: (node, text) => {
    node.nodeValue = text;
  },
  
  setElementText(node, text) {
    node.textContent = text;
  },

  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },

  parentNode: (node) => {
    return node.parentNode;
  },
};
