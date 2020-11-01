import { createDataElement } from '../common/internalLogic';

window.onload = function (): void {
    // Program starts here. Creates a sample graph in the
    // DOM node with the specified ID. This function is invoked
    // from the onLoad event handler of the document (see below).
    createDataElement(document.getElementById('container'), 'test foo');
};
