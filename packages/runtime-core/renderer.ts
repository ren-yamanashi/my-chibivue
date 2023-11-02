// NOTE: renderロジックのみを持つオブジェクトを生成するためのファクトリ関数を実装する
//       Node(DOMに限らず)を扱うオブジェクトはfactory関数の引数として受け取るようにする

import { VNode } from "./vnode";

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement
) => void;

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement
> {
  patchProp(el: HostElement, key: string, value: any): void;

  createElement(type: string): HostNode;

  createText(text: string): HostNode;

  setElementText(node: HostNode, text: string): void;

  insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void;
}

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}

/**
 * renderロジックのみを持つオブジェクトを生成するためのファクトリ関数
 * @param {RendererOptions}options
 * @returns {RootRenderFunction}
 */
export function createRenderer(options: RendererOptions) {
  const {
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    insert: hostInsert,
  } = options;

  function renderVNode(vnode: VNode | string) {
    if (typeof vnode === "string") return hostCreateText(vnode);
    const el = hostCreateElement(vnode.type);

    Object.entries(vnode.props).forEach(([key, value]) => {
      hostPatchProp(el, key, value);
    });
    for (let child of vnode.children) {
      const childEl = renderVNode(child);
      hostInsert(childEl, el);
    }

    return el;
  }

  const render: RootRenderFunction = (vnode, container) => {
    while(container.firstChild) container.removeChild(container.firstChild);
    const el = renderVNode(vnode);
    hostInsert(el, container);
  };

  return { render };
}
