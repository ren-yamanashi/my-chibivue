import { reactive } from "../reactivity";
import { Data } from "../runtime-dom/component";
import { ComponentInternalInstance } from "./vnode";

export type Props = Record<string, PropsOptions | null>;

export interface PropsOptions<T = any> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: null | undefined | object;
}

export type PropType<T> = { new (...args: any[]): T & {} };

export function initProps(
  instance: ComponentInternalInstance,
  // NOTE: h関数で渡されたprops
  rawProps: Data | null
) {
  const props: Data = {};
  setFullProps(instance, rawProps, props);
  instance.props = reactive(props);
}

export function setFullProps(
  instance: ComponentInternalInstance,
  // NOTE: h関数で渡されたprops
  rawProps: Data | null,
  // NOTE: コンポーネントのprops
  props: Data
) {
  const options = instance.propsOptions;

  if (rawProps) {
    for (let key in rawProps) {
      const value = rawProps[key];
      if (options && options.hasOwnProperty(key)) {
        props[key] = value;
      }
    }
  }
}

export function updateProps(
  instance: ComponentInternalInstance,
  rawProps: Data | null
) {
  const { props } = instance;
  Object.assign(props, rawProps);
}
