// NOTE: reactive proxyのハンドラを定義

import { track, trigger } from "./effect";
import { reactive } from "./reactive";

export const mutableHandlers: ProxyHandler<object> = {
  get(target: object, key: string | symbol, receiver: object) {
    track(target, key);

    const res = Reflect.get(target, key, receiver);
    // NOTE: objectの場合はreactiveにしてあげる (これにより、ネストしたオブジェクトもリアクティブにできる。)(再起的にreactiveになる)
    if (res !== null && typeof res === "object") {
      return reactive(res);
    }

    return res;
  },

  set(target: object, key: string | symbol, value: unknown, receiver: object) {
    Reflect.set(target, key, value, receiver);
    trigger(target, key);
    return true;
  },
};
