// NOTE: renderロジックのみを持つオブジェクトを生成するためのファクトリ関数を実装する
//       Node(DOMに限らず)を扱うオブジェクトはfactory関数の引数として受け取るようにする

import { VNode } from "./vnode";

export interface RendererOptions<HostNode = RendererNode> {
  createElement(type: string): HostNode;
  createText(text: string): HostNode;
  setElementText(node: HostNode, text: string): void;
  insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void;
}

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement
) => void;

/**
 * renderロジックのみを持つオブジェクトを生成するためのファクトリ関数
 * @param {RendererOptions}options
 * @returns {RootRenderFunction}
 */
export function createRenderer(options: RendererOptions) {
  const { createElement:hostCreateElement, createText:hostCreateText, insert:hostInsert } = options;

  function renderVNode(vnode: VNode | string) {
    if(typeof vnode === "string") return hostCreateText(vnode);
    const el = hostCreateElement(vnode.type);

    for(let child of vnode.children) {
      const childEl = renderVNode(child);
      hostInsert(childEl, el)
    }

    return el
  }

  const render: RootRenderFunction = (vnode, container) => {
    const el = renderVNode(vnode);
    hostInsert(el, container)
  };

  return { render };
}
