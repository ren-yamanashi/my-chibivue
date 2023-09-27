// NOTE: nodeOpsとruntime-core/rendererのファクトリをもとにrendererを完成させる
import { createRenderer } from "../runtime-core";
import { CreateAppFunction, createAppAPI } from "../runtime-core/apiCreateApp";
import { nodeOps } from "./nodeOps";

const { render } = createRenderer(nodeOps);
const _createApp = createAppAPI(render);

export const createApp = ((...args) => {
  const app = _createApp(...args);
  const { mount } = app;
  app.mount = (selector: string) => {
    const container = document.querySelector(selector);
    if (!container) return;
    mount(container);
  };
  return app;
}) as CreateAppFunction<Element>;
