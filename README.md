- runtime-core/renderer: rendererを生成するファクトリ関数を実装
- runtime-dom/nodeOps: DOMに依存するオペレーション(操作)をするためのオブジェクトを実装
- rumtime-dom/index: ファクトリ関数とnodeOpsを組み合わせてrendererを生成

ファクトリ関数とnodeOpsは `RendererOptions` を守るように実装(DIP)

runtime-core/rendererFactory -- runtime-dom/renderer -- runtime-dom/nodeOps

