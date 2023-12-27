export const generate = ({
  tag,
  props,
  textContent,
}: {
  tag: string;
  props: Record<string, string>;
  textContent: string;
}): string => {
  return `return () => {
    const { h } = ChibiVue;
    return h("${tag}", { ${Object.entries(props)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ")} }, ["${textContent}"]) 
  }`;
};
