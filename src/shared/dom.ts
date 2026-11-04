export function findOne<T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T | null {
  return root.querySelector<T>(selector);
}

export function requireOne<T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T {
  const element = findOne<T>(selector, root);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}

export function findAll<T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T[] {
  return [...root.querySelectorAll<T>(selector)];
}
