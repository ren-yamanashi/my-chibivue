interface Invoker extends EventListener {
  value: EventValue;
}

type EventValue = Function;

export function addEventListener(
  el: Element,
  event: string,
  handler: EventListener
) {
  el.addEventListener(event, handler);
}

export function removeEventListener(
  el: Element,
  event: string,
  handler: EventListener
) {
  el.removeEventListener(event, handler);
}

export function patchEvent(
  el: Element & { _vie?: Record<string, Invoker | undefined> },
  rawName: string,
  value: EventValue | null
) {
  // vei = vue event invokers
  const invokers = el._vie || (el._vie = {});
  const existingInvoker = invokers[rawName];

  if (value && existingInvoker) {
    // patch
    existingInvoker.value = value;
  } else {
    const name = parseName(rawName);
    if (value) {
      // add
      const invoker = (invokers[rawName] = createInvoker(value));
      addEventListener(el, name, invoker);
    } else if (existingInvoker) {
      // remove
      removeEventListener(el, name, existingInvoker);
      invokers[rawName] = undefined;
    }
  }
}

// NOTE: props のキー名は onClick や onInput のようになっているので、それらを on を除いた小文字に変換している
function parseName(rowName: string): string {
  return rowName.slice(2).toLocaleLowerCase();
}

function createInvoker(initialValue: EventValue) {
  const invoker: Invoker = (e: Event) => {
    invoker.value(e);
  };
  invoker.value = initialValue;
  return invoker;
}
