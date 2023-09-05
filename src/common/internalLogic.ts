import { x } from './babelExample';

/**
 * Example of a function that takes in as a parameter an container and renders some text into it
 * @param container element to render data into
 * @param value value to render
 * @returns the same container element
 */
export function createDataElement(container: HTMLElement, value: string): HTMLElement {
    const t = x(1);
    container.innerText = value + t;
    return container;
}
