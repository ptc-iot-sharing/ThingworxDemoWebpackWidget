
/**
 * This file contains runtime support information for creating widgets by extending TW.Widget
 */
if (TW.IDE && (typeof TW.IDE.Widget == 'function')) {
    (function () {
        let TWWidgetConstructor = TW.IDE.Widget;
        let __BMTWInternalState;
        let __BMTWArguments;
        TW.IDE.Widget = function () {
            TWWidgetConstructor.apply(this, arguments);
            // To capture the internal state for class-based widgets, the base thingworx widget constructor
            // is decorated and its object is temporarily stored as a global variable
            __BMTWInternalState = this;
            __BMTWArguments = Array.prototype.slice.call(arguments);
            return this;
        }

        // Copy over the static methods
        Object.keys(TWWidgetConstructor).forEach((key) => {
            TW.IDE.Widget[key] = TWWidgetConstructor[key];
        });

        let internalStates = new WeakMap();
        window.TWComposerWidget = function () {
            // Retain the object's current keys and values
            let keys = Object.keys(this);
            let values = {};
            let self = this;
            keys.forEach((key) => values[key] = self[key]);

            // Invoke the IDE constructor here as well
            TWWidgetConstructor.apply(this, __BMTWArguments);

            // Because Thingworx incorrectly attempts to change the prototype of the exported widget
            // the new prototype is temporarily stored as a global variable and used as the internal state
            // for the widget
            internalStates.set(this, __BMTWInternalState);

            // After the internal state is initialized, all of its methods are redefined and bound
            // to the real widget and all of its properties are copied over to the widget
            // A possible hurdle would be the `thisWidget` reference to self that the Thingworx widget
            // creates, however that is reset in `appendTo` to that function's context object
            Object.keys(__BMTWInternalState).forEach((key) => {
                let value = __BMTWInternalState[key];
                let state = __BMTWInternalState;

                if (typeof value == 'function') {
                    if (!TWComposerWidget.prototype[key]) {
                        (TWComposerWidget.prototype[key] = function () {
                            return internalStates.get(this)[key].apply(this, arguments);
                        })
                    }
                    __BMTWInternalState[key] = value.bind(this);
                    if (keys.indexOf(key) == -1) {
                        // Remove methods which are already defined on the prototype
                        delete this[key];
                    }
                    else {
                        // Otherwise restore the previous value
                        this[key] = values[key];
                    }
                }
                else {
                    // Restore previous values if they were defined
                    if (keys.indexOf(key) != -1) {
                        this[key] = values[key];
                    }
                    else {
                        this[key] = state[key];
                    }
                }
            });

            // Clear out the global internal state to prevent it from leaking
            __BMTWInternalState = undefined;
            __BMTWArguments = undefined;
        }
        TWComposerWidget.prototype = {};
    })();

}

if (typeof TW.Widget == 'function') {
    (function () {
        let TWWidgetConstructor = TW.Widget;
        let __BMTWInternalState;
        TW.Widget = function () {
            TWWidgetConstructor.apply(this, arguments);
            // To capture the internal state for class-based widgets, the base thingworx widget constructor
            // is decorated and its object is temporarily stored as a global variable
            __BMTWInternalState = this;
            return this;
        }

        // Copy over the static methods
        Object.keys(TWWidgetConstructor).forEach((key) => {
            TW.Widget[key] = TWWidgetConstructor[key];
        });

        let internalStates = new WeakMap();
        window.TWRuntimeWidget = function () {
            // Because Thingworx incorrectly attempts to change the prototype of the exported widget
            // the new prototype is temporarily stored as a global variable and used as the internal state
            // for the widget
            internalStates.set(this, __BMTWInternalState);

            // After the internal state is initialized, all of its methods are redefined and bound
            // to the real widget and all of its properties are copied over to the widget
            // A possible hurdle would be the `thisWidget` reference to self that the Thingworx widget
            // creates, however that is reset in `appendTo` to that function's context object
            let self = this;
            Object.keys(__BMTWInternalState).forEach((key) => {
                let value = __BMTWInternalState[key];
                let state = __BMTWInternalState;

                if (typeof value == 'function') {
                    if (!TWRuntimeWidget.prototype[key]) {
                        (TWRuntimeWidget.prototype[key] = function () {
                            return internalStates.get(this)[key].apply(this, arguments);
                        })
                    }
                    __BMTWInternalState[key] = value.bind(this);
                }
                else {
                    this[key] = value;
                }
            });

            // Clear out the global internal state to prevent it from leaking
            __BMTWInternalState = undefined;
        }
        TWRuntimeWidget.prototype = {};
    })();
}

/**
 * Makes the given widget class available to Thingworx.
 * @param widget        The widget class to export.
 */
export function ThingworxRuntimeWidget(widget) {
    // Thingworx attempts to change the prototype of the custom widget constructor
    // which in addition to being a bad practice, prevents the usual prototype-based inheritance
    // and prevents using the class-based syntax
    Object.defineProperty(widget, 'prototype', {writable: false});

    TW.Runtime.Widgets[widget.name] = widget;
}

/**
 * Makes the given widget class available to Thingworx.
 * @param widget        The widget class to export.
 */
export function ThingworxComposerWidget(widget) {
    Object.defineProperty(widget, 'prototype', {writable: false});

    TW.IDE.Widgets[widget.name] = widget;
}