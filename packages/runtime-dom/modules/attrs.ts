export function patchAttr(el: Element, key: string, value: string) {
  if (value === null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, value);
  }
}
