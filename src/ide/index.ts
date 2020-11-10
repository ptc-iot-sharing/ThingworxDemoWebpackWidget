// automatically import the css file
import './ide.css';
import {
    TWWidgetDefinition,
    autoResizable,
    description,
    property,
    defaultValue,
    bindingTarget,
    service,
    event,
    bindingSource,
    nonEditable,
    willSet,
    didSet,
} from 'typescriptwebpacksupport/widgetIDESupport';

import widgetIconUrl from '../images/icon.png';

/**
 * The `@TWWidgetDefinition` decorator marks a class as a Thingworx widget. It can only be applied to classes
 * that inherit from the `TWComposerWidget` class. It must receive the display name of the widget as its first parameter.
 * Afterwards any number of widget aspects may be specified.
 *
 * Because of this, the `widgetProperties` method is now optional. If overriden, you must invoke the superclass
 * implementation to ensure that decorated aspects are initialized correctly.
 */
@description('A widget')
@TWWidgetDefinition('Test', autoResizable)
class DemoWebpackWidget extends TWComposerWidget {
    /**
     * The `@property` decorator can be applied to class members to mark them as widget properties.
     * This must be applied with the base type of the property as its first parameter.
     * The decorator can then also receive a series of aspects to apply to that properties as parameters.
     *
     * Because of this, the `widgetProperties` method is now optional. If overriden, you must invoke the superclass
     * implementation to ensure that decorated properties are initialized correctly.
     */
    @property('NUMBER', defaultValue(90)) width: number;

    /**
     * When the `@description` decorator is not used, the JSDoc documentation will be used as
     * the description for the property.
     */
    @property('NUMBER', defaultValue(30)) height: number;

    /**
     * A number of aspects such as `willSet`, `didSet` and `didBind` can be used to specify various callback
     * that will be invoked when the value of the property is bound or updated by the user through using the composer.
     */
    @description('A label to display on the widget.')
    @property(
        'STRING',
        bindingTarget,
        defaultValue('my value'),
        willSet('valueWillSet'),
        didSet('valueDidSet'),
    )
    value: string;

    /**
     * The `@description` decorator can be applied before widget definitions and property, event or service decorators to specify
     * the description of the decorated class member. That description will appear in the composer.
     */
    @description('Tracks how many times the widget was clicked')
    @property('NUMBER', bindingSource, nonEditable)
    clickedAmount: number;

    /**
     * Invoked to obtain the URL to this widget's icon.
     * @return  The URL.
     */
    widgetIconUrl(): string {
        return widgetIconUrl;
    }

    /**
     * Invoked to obtain the HTML structure corresponding to the widget.
     * @return      The HTML structure.
     */
    renderHtml(): string {
        return `<div class="widget-content widget-demo-viewer">${this.value}</div>`;
    }

    /**
     * This method is invoked whenever the `value` property is about to be updated for any reason, either through
     * direct assignment or because the user has edited its value in the composer,
     * because it has been specified in the `willSet` aspect of the `value` property.
     *
     * Because of this, the `beforeSetProperty` method is now optional. If overriden, you must invoke the superclass
     * implementation to ensure that decorated properties are updated correctly.
     *
     * @param value         Represents the property's new value.
     * @return              A string, if the new value should be rejected, in which case the returned string will be
     *                      displayed as an error message to the user. If the value should be accepted, this method should return nothing.
     */
    valueWillSet(value: string): string | void {
        if (value == 'test') return 'Invalid value specified';
    }

    /**
     * This method is invoked whenever the `value` property has been updated for any reason, either through
     * direct assignment or because the user has edited its value in the composer,
     * because it has been specified in the `didSet` aspect of the `value` property.
     *
     * Because of this, the `afterSetProperty` method is now optional. If overriden, you must invoke the superclass
     * implementation to ensure that decorated properties are handled correctly.
     *
     * @param value         Represents the property's new value.
     * @return              `true` if the widget should be redrawn because of this change, nothing or `false` otherwise.
     */
    valueDidSet(value: string): boolean | void {
        this.jqElement[0].innerText = value;
    }

    /**
     * The service decorator defines a service.
     *
     * Because of this, the `widgetServices` method is now optional. If overriden, you must invoke the superclass
     * implementation to ensure that decorated services are initialized correctly.
     */
    @description('Prints out a message when invoked')
    @service
    testService;

    /**
     * Property declarations can be mixed in with other method and event or service declarations.
     */
    @description('A message to display when the widget is clicked.')
    @property('STRING', bindingTarget, defaultValue('Invoked via decorator'))
    clickMessage: string;

    /**
     * The event decorator defines an event.
     *
     * Because of this, the `widgetEvents` method is now optional. If overriden, you must invoke the superclass
     * implementation to ensure that decorated events are initialized correctly.
     */
    @description('Triggered when the widget is clicked')
    @event
    clicked;

    /**
     * Invoked after the widget's HTML element has been created.
     * The `jqElement` property will reference the correct element within this method.
     */
    afterRender(): void {
        // add after logic render here
    }

    /**
     * Invoked when this widget is destroyed. This method should be used to clean up any resources created by the widget
     * that cannot be reclaimed by the garbage collector automatically (e.g. HTML elements added to the page outside of the widget's HTML element)
     */
    beforeDestroy(): void {
        // add dispose logic here
    }
}
