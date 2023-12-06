import { ComponentOptions } from "./componentOptions";
import { ComponentInternalInstance, VNode } from "./vnode";

export type Component = ComponentOptions;

export function createComponentInstance(vnode: VNode): ComponentInternalInstance {
  const type = vnode.type as Component;

  // NOTE: 本家のVue.jsに合わせてインスタンスを生成した段階ではnullを設定しておく
  const instance: ComponentInternalInstance = {
    type,
    vnode,
    next: null,
    effect: null!,
    subTree: null!,
    update: null!,
    render: null!,
    isMounted: false,
  }

  return instance
}