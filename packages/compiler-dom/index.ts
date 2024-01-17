import { baseCompile } from "../compiler-core/compile";

/**
 * ランタイム上で動作するコンパイラの実装
 */
export function compile(template: string) {
  return baseCompile(template);
}