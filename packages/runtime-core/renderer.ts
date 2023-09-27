// NOTE: renderロジックのみを持つオブジェクトを生成するためのファクトリ関数を実装する
//       Node(DOMに限らず)を扱うオブジェクトはfactory関数の引数として受け取るようにする

export interface RendererOptions<HostNode = RendererNode> {
  setElementText(node: HostNode, text: string): void;
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
  const { setElementText: hostSetElementText } = options;

  const render: RootRenderFunction = (message, container) => {
    hostSetElementText(container, message);
  };

  return { render };
}
