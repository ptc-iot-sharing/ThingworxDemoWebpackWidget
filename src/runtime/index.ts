import {
    TWWidgetDefinition,
    property,
    canBind,
    TWEvent,
    event,
    service,
} from 'typescriptwebpacksupport/widgetRuntimeSupport';

/**
 * The `@TWWidgetDefinition` decorator marks a class as a Thingworx widget. It can only be applied to classes
 * that inherit from the `TWRuntimeWidget` class.
 */
@TWWidgetDefinition
class DemoWebpackWidget extends TWRuntimeWidget {
    /**
     * The `@event` decorator can be applied to class member to mark them as events.
     * They must have the `TWEvent` type and can be invoked to trigger the associated event.
     *
     * Optionally, the decorator can receive the name of the event as its parameter; if it is not specified,
     * the name of the event will be considered to be the same as the name of the class member.
     */
    @event clicked: TWEvent;

    /**
     * The `@property` decorator can be applied to class member to mark them as events.
     * The value of the class member and of the associated widget property will be kept in sync.
     *
     * The runtime will also automatically update the value of the property for bindings; because of this
     * the `updateProperty` method becomes optional. If `updateProperty` is overriden, you must invoke
     * the superclass implementation to ensure that decorated properties are updated correctly.
     *
     * Optionally, the decorator can receive a number of aspects as its parameters.
     */
    @property clickMessage: string;

    /**
     * The `canBind` and `didBind` aspects can be used to specify callback methods to execute when the value of
     * the property is about to be updated or has been updated because of a binding.
     *
     * For `canBind`, the method can decide to reject the newly received value.
     */
    @property(canBind('valueWillBind')) set value(value: string) {
        this.internalLogic.createDataElement(this.jqElement[0], value);
    }

    /**
     * Optionally, the first parameter of the `@property` decorator can be a string that specifies the
     * name of the property as it is defined in the IDE class. This can be used to have different names
     * in the definition and implementation.
     */
    @property('clickedAmount') timesClicked: number;

    /**
     * This method is invoked whenever the `value` property is about to be updated because of a binding,
     * because it has been specified in the `canBind` aspect of the `value` property.
     * @param value         Represents the property's new value.
     * @param info          The complete updatePropertyInfo object.
     * @return              `true` if the property should update to the new value, `false` otherwise.
     */
    valueWillBind(value: string, info: TWUpdatePropertyInfo): boolean {
        alert(`Value will be updated to ${value}`);
        return true;
    }

    /**
     * Invoked to obtain the HTML structure corresponding to the widget.
     * @return      The HTML structure.
     */
    renderHtml(): string {
        return `<div class="widget-content widget-demo">${this.value}</div>`;
    }

    internalLogic;

    /**
     * Invoked after the widget's HTML element has been created.
     * The `jqElement` property will reference the correct element within this method.
     */
    async afterRender(): Promise<void> {
        this.internalLogic = await import('../common/internalLogic');
        this.jqElement[0].addEventListener('click', (event: MouseEvent): void => {
            this.timesClicked++;
            this.clicked();
            event.stopPropagation();
        });
    }

    /**
     * The `@service` decorator can be applied to methods to mark them as events.
     *
     * The runtime will also automatically call the method when the associated service is invoked.
     *
     * Optionally, the decorator can receive the name of the service as its parameter; if it is not specified,
     * the name of the service will be considered to be the same as the name of the method.
     */
    @service testService(): void {
        alert(this.clickMessage);
    }

    /**
     * Invoked when this widget is destroyed. This method should be used to clean up any resources created by the widget
     * that cannot be reclaimed by the garbage collector automatically (e.g. HTML elements added to the page outside of the widget's HTML element)
     */
    beforeDestroy?(): void {
        // add disposing logic
    }
}
