export * from "./runtime-core";
export * from "./runtime-dom";
export * from "./reactivity";
import { compile } from "./compiler-dom";
import {
  type InternalRenderFunction,
  registerRuntimeCompiler,
} from "./runtime-core";
import * as runtimeDom from "./runtime-dom";

// コンパイラ本体を登録する関数の生成
function compileToFunction(template: string): InternalRenderFunction {
  const code = compile(template);
  return new Function("ChibiVue", code)(runtimeDom);
}

registerRuntimeCompiler(compileToFunction);
