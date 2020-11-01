import { x } from './babelExample';

export function createDataElement(container: HTMLElement, value: string): HTMLElement {
    const t = x(1);
    container.innerText = value + t;
    return container;
}
