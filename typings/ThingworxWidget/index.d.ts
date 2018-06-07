/**
 * An interface representing an object whose key values are constrained to a generic type.
 */
declare interface Dictionary<V> {
    [key: string]: V;
}

/**
 * An interface representing a data shape field definition.
 */
declare interface TWFieldDefinition {

    /**
     * The name of the field.
     * If this field is added to a `fieldDefinitions` dictionary, this should generally
     * match the name of the key to which this field definition is added.
     */
    name: string;

    /**
     * The field's base type.
     */
    baseType: TWBaseType;

    /**
     * An optional description to add to this field definition.
     */
    description?: string;

    /**
     * An optioanl default value to use for this field.
     */
    defaultValue?: any;

}

/**
 * An interface representing a literal data shape.
 */
declare interface TWDataShape {

    /**
     * A dictionary containing the fields in the data shape.
     */
    fieldDefinitions: Dictionary<TWFieldDefinition>;

}

/**
 * An interface representing a literal infotable.
 * Note that on the client side, infotables are just dummy objects
 * and do not support any of the usual server-side methods.
 */
declare interface TWInfotable {
    /**
     * The infotable's data shape.
     */
    dataShape: TWDataShape;

    /**
     * The contents of the infotable.
     */
    rows: any[];
}

/**
 * An interface representing the update property info that is sent to
 * widgets whenever any of their properties is updated as a result of a binding.
 */
declare interface TWUpdatePropertyInfo {

    /**
     * The name of the updated property.
     */
    TargetProperty: string;


    /** 
     *  The name of the property that caused this data change
    */
    SourceProperty: string;

    /**
     * The updated property value.
     */
    SinglePropertyValue: any;

    /**
     * The updated property value.
     */
    RawSinglePropertyValue: any;

    /**
     * If the updated property is an infotable, this field
     * contains the rows of objects contained within the infotable.
     */
    ActualDataRows: any[] | undefined;

    /** 
     * The raw data from the invoke of the service
     */
    RawDataFromInvoke: any;

    /**
     * The datashape of the updated property
     */
    DataShape: TWDataShape | undefined;

    /** 
     * Can be 'AllData' or 'SelectedRows' depending or where the binding is coming from. 
     * If the data is comming from a widget, then this in an empty string or undefined
     */
    SourceDetails: any | undefined;

    /**
     * Array of the currently selected row indices
     */
    SelectedRowIndices: number[] | undefined;

    /**
     * Specifies if the binding is done on the selected rows of a service
     */
    isBoundToSelectedRows: boolean
}

/**
 * The prototype of an object that defines a permitted value for a string property.
 */
declare interface TWPropertySelectOption {

    /**
     * The option's label as it appears in the composer.
     */
    text: string;

    /**
     * The option's value that is assigned to the property.
     */
    value: string;
}

/**
 * The prototype for an object representing a single widget service.
 */
declare interface TWWidgetService {

    /**
     * An optional description describing this service.
     */
    description?: string;

    /**
     * Defaults to `false`. If set to `true`, Thingworx will generate a to-do item if this service
     * is not bound as a target.
     */
    warnIfNotBoundAsTarget?: boolean;

}

/**
 * The prototype for an object representing a single widget event.
 */
declare interface TWWidgetEvent {

    /**
     * An optional description describing this event.
     */
    description?: string;

    /**
     * Defaults to `false`. If set to `true`, Thingworx will generate a to-do item if this event
     * is not bound
     */
    warnIfNotBound?: boolean;

}

/**
 * A union of string defining the available Thingworx base types.
 */
type TWBaseType = 'STRING' | 'LOCATION' | 'NUMBER' | 'INTEGER' | 'LONG' | 'BOOLEAN' |
    'DASHBOADNAME' | 'GROUPNAME' | 'GUID' | 'HTML' | 'HYPERLINK' | 'IMAGELINK' |
    'MASHUPNAME' | 'MENUNAME' | 'PASSWORD' | 'TEXT' | 'THINGCODE' | 'THINGNAME' |
    'USERNAME' | 'DATETIME' | 'XML' | 'JSON' | 'QUERY' | 'TAGS' |
    'SCHEDULE' | 'ANYSCALAR' | 'BLOB' | 'THINGSHAPENAME' | 'THINGTEMPLATENAME' | 'DATASHAPENAME' |
    'PROJECTNAME' | 'BASETYPENAME' | 'STATEDEFINITION' | 'STYLEDEFINITION' | 'FIELDNAME' | 'INFOTABLE';

/**
 * The prototype for an object representing a single widget property.
 */
declare interface TWWidgetProperty {
    /**
     * Defaults to an empty string.
     * The description that appears in the composer for this property.
     */
    description?: string;

    /**
     * A string that indicates what type of property this definition refers to.
     * This should not be included in the object returned by `widgetProperties`, but when using
     * the array returned by `allWidgetProperties`, this field should be set to the appropriate type of the given property.
     */
    type?: 'property' | 'event' | 'service';

    /**
     * This property's data type.
     */
    baseType: TWBaseType;

    /**
     * When the baseType is set to `'THINGNAME'`, this may be optionally specified
     * to constrain the list of choices selectable at design time to things that implement or
     * extend the given entities.
     */
    mustImplement?: {
        /**
         * The name of the entity that must be implemented by the thing.
         */
        EntityName: string;
        /**
         * The type of the entity that must be implemented by the thing.
         * This is the Thingworx collection name of the entity type (e.g. ThingTemplate).
         */
        EntityType: string;
    };

    /**
     * When the baseType is set to `'RENDERERWITHFORMAT'`, this attribute specifies what infotable
     * property this rendering is based upon. This must be the name of one of this widget's infotable properties.
     */
    baseTypeInfotableProperty?: string;

    /**
     * when the baseType is set to `'FIELDNAME'`, this attribute specifies what infotable the widget
     * should look into when displaying the available fields.
     */
    sourcePropertyName?: string;

    /**
     * When the baseType is set to `'FIELDNAME'`, this attribute restricts the available fields
     * to only the fields of this base type.
     */
    baseTypeRestriction?: TWBaseType;

    /**
     * Defaults to `'DataTags'`. When baseType is set to `'TAGS'` this represents the type of tags
     * that the user may select.
     */
    tagType?: 'DataTags' | 'ModelTags';

    /**
     * Defaults to undefined. Must be specified if baseType is set to `'BOOLEAN'`.
     * The default value for the property.
     * Note that if this is set in a newer version of the widget, older existing instances of
     * the widget will not gain this default value.
     */
    defaultValue?: any;

    /**
     * Defaults to false.
     * Controls whether this property is a binding source that may be bound to other targets.
     */
    isBindingSource?: boolean;

    /**
     * Defaults to false.
     * Controls whether this property is a binding target that other targets may bind to.
     */
    isBindingTarget?: boolean;

    /**
     * Defaults to true.
     * If set to false, the user will not be able to modify this property's value in the composer.
     */
    isEditable?: boolean;

    /**
     * Defaults to true.
     * If set to false, this property will not appear in the widget's properties panel.
     */
    isVisible?: boolean;

    /**
     * Defaults to false.
     * If the baseType is set to `'STRING'` and this is set to true, the property may be localized and the user
     * will be able to select localization tokens for it.
     */
    isLocalizable?: boolean;

    /**
     * If the baseType is set to `'STRING'`, this field may optionally specify a set of possible values for the property.
     * When this field is specified, the property will appear as a dropdown list in the composer, containing the values defined here.
     */
    selectOptions?: TWPropertySelectOption[];

    /**
     * Defaults to false.
     * If set to true and this property is a binding source, the composer will create a to-do item until this property is bound to a target.
     */
    warnIfNotBoundAsSource?: boolean;

    /**
     * Defaults to false.
     * If set to true and this property is a binding target, the composer will create a to-do item until a target is bound to this property.
     */
    warnIfNotBoundAsTarget?: boolean;
}

/**
 * The prototype for an object containing the properties object of a Thingworx widget.
 */
declare interface TWWidgetProperties {

    /**
     * The name of the widget as it appears in the Composer,
     * on the left-hand side widget selector.
     */
    name: string;

    /**
     * The widget's description, as it appears when hovering over the widget
     * on the left hand side widget selector.
     */
    description?: string;

    /**
     * @deprecated Superseded by the `widgetIconUrl` method.
     */
    icon?: string;

    /**
     * An array of category names to which the widget belongs.
     * This makes it possible to filter the widget using the Category selector in the composer.
     */
    category: string[];

    /**
     * Defaults to false. When set to true, the widget will be responsive and may be used in responsive layouts.
     */
    supportsAutoResize?: boolean;

    /**
     * Defaults to false. When set to true, this should be used together with `supportsAutoResize` and causes the widget
     * to only work within responsive layouts.
     */
    onlySupportedInResponsiveParents?: boolean;

    /**
     * Defaults to false.
     * When set to true, this widget is expected to have elements representing dedicated spots for sub-widgets in its runtime and design-time DOM structures.
     * Its subwidgets will be added in order to its declarative spots.
     * The declarative spots are HTML elements with the `sub-widget-container-id` attribute set to this widget's ID and the `sub-widget` attribute set to
     * the index of the sub-widget that will be rendered within that element.
     */
    isContainerWithDeclarativeSpotsForSubWidgets?: boolean;

    /**
     * Defaults to true. When set to false, the widget will not get the usual service loading indicator, regardless
     * of the user's selection in the properties panel.
     * If this is set to false, it is also required to set the similarly named runtime property to false in the runtime version of the widget.
     */
    needsDataLoadingAndError?: boolean;

    /**
     * Defaults to false. When set to true, the user is able to add other widgets into this widget.
     */
    isContainer?: boolean;

    /**
     * Defaults to true for non-container widgets. When set to false, the widget cannot be dragged.
     * If the widget is a container, 
     */
    isDraggable?: boolean;

    /**
     * Defaults to true.
     * If set to false, the widget cannot be moved through the composer.
     */
    allowPositioning?: boolean;

    /**
     * Defaults to true.
     * If set to false, other widgets cannot be dragged or pasted onto this widget.
     */
    allowPasteOrDrop?: boolean;

    /**
     * Defaults to true.
     * If set to false, this widget cannot be copied.
     */
    allowCopy?: boolean;

    /**
     * If the widget provides a border, this should be set to the width of the border. 
     * This helps ensure pixel-perfect WYSIWG between builder and runtime. 
     * If you set a border of 1px on the “widget-content” element at design time, you are effectively making that widget 2px taller and 2px wider (1px to each side). 
     * To account for this descrepancy, setting the borderWidth property will make the design-time widget the exact same number of pixels smaller. 
     * Effectively, this places the border “inside” the widget that you have created and making the width & height in the widget properties accurate.
     */
    borderWidth?: string;

    /**
     * Controls whether this widget supports a Thingworx generated label.
     * It is recommended to set this to `false` and control labels manually.
     */
    supportsLabel?: boolean;

    /**
     * To be clarified.
     */
    customEditor?: string;

    /**
     * To be clarified.
     */
    customEditorMenuText?: string;

    /**
     * An array of developer-defined custom properties for the widget.
     * The developer can also redefine certain generic properties such as `Width` or `Height` to customize their behaviour
     * by including them in this array. For these properties, it is not required to specify all of their attributes, but rather only the ones
     * that should be different from the default.
     */
    properties: Dictionary<TWWidgetProperty>;

}

/**
 * A class that represents the base controller that manages the lifecycle and content of a Thingworx widget.
 * This abstract class defines the functionality common to both the runtime and design-time versions of widgets.
 */
declare abstract class TWWidget {

    /**
     * Returns a reference to the jQuery element representing this widget's bounding box.
     * The bounding box is a `div` node that contains this widget's contents.
     * Subclasses are expected to not override this property.
     */
    boundingBox: JQuery;

    /**
     * Returns a reference to the jQuery element managed by this widget.
     * Subclasses are expected to not override this property.
     */
    jqElement: JQuery;

    /**
     * Returns the current value of the given property.
     * Subclasses are expected to not override this method.
     * @param property          The name of the property.
     * @param defaultValue      An optional default value that will be returned if the property has not yet been assigned any value.
     * @return                  The property's value.
     */
    getProperty(property: string, defaultValue?: any): any;

    /**
     * Sets the value of the given property.
     * If this property is bound to any targets, they will be updated accordingly.
     * Subclasses are expected to not override this method.
     * @param property          The name of the property.
     * @param value             The new value to assign to the property.
     */
    setProperty(property: string, value: any): void;

    /**
     * Returns a string representing the HTML content managed by this widget.
     * This method is invoked early on in the initialization, before the `jqElement` and `boundingBox` properties have been initialized.
     * Must be overriden by subclasses to provide the appropriate HTML content that this widget will manage.
     * The HTML structure returned by this method must contain a node with the `widget-content` class.
     * That node will represent this widget's `jqElement` property and will be used by the platform to implement
     * bindings and event triggers.
     */
    abstract renderHtml(): string;

    /**
     * This method is invoked by the platform after `renderHtml`, after adding the HTML content to the document.
     * When this method is invoked, the `jqElement` and `boundingBox` property will have been initialized and may be used.
     * May be optionally overriden by classes to perform any additional work needed for initialization.
     */
    abstract afterRender?(): void;

}


/**
 * A class that represents a controller that manages the lifecycle and content of a Thingworx widget.
 * This is the IDE variant of the widget type
 */
declare abstract class TWComposerWidget extends TWWidget {

    parentWidget: TWComposerWidget | undefined;

    widgets: TWComposerWidget[] | undefined;

    /**
     * Returns a string representing the HTML content managed by this widget.
     * This method is invoked early on in the initialization, before the `jqElement` and `boundingBox` properties have been initialized.
     * Must be overriden by subclasses to provide the appropriate HTML content that this widget will manage.
     * The HTML structure returned by this method must contain a node with the `widget-content` class.
     * That node will represent this widget's `jqElement` property and will be used by the platform to implement
     * bindings and event triggers.
     */
    abstract renderHtml(): string;

    /**
     * This method is invoked by the platform after `renderHtml`, after adding the HTML content to the document.
     * When this method is invoked, the `jqElement` and `boundingBox` property will have been initialized and may be used.
     * May be optionally overriden by classes to perform any additional work needed for initialization.
     */
    abstract afterRender?(): void;


    /**
     * Returns the URL to the icon representing this widget in the composer's widget list on the left hand side.
     * Subclasses should override this method to return the appropriate URL for their icon.
     * @return          The icon URL.
     */
    abstract widgetIconUrl?(): string;

    /**
     * Returns the properties object for this widget.
     * Subclasses must override this method and return the appropriate properties.
     * @return          The properties object.
     */
    abstract widgetProperties(): TWWidgetProperties;

    /**
     * Returns the services object for this widget.
     * Subclasses must override this method and return the appropriate services.
     * @return          The properties object.
     */
    abstract widgetServices(): Dictionary<TWWidgetService>;

    /**
     * Returns the events object for this widget.
     * Subclasses must override this method and return the appropriate events.
     * @return          The properties object.
     */
    abstract widgetEvents(): Dictionary<TWWidgetEvent>;

    /**
     * Invoked once, when an instance of this widget is first created.
     * This is only invoked when the widget is created initially and not when the mashup is reloaded
     * or when this widget is pasted into another container.
     * Sublcasses may override this method to perform custom initialization, for example setting the initial 
     * values of properties based on the environment.
     * Note that this method is invoked before any other, such as `renderHtml`, so properties like `jqElement` will
     * not have been initialized correctly at this time.
     */
    afterCreate?(): void;

    /**
     * Resets the given property to its default value.
     * Subclasses are expected to not override this method.
     * @param name          The property's name.
     */
    resetPropertyToDefaultValue(name: string): void;

    /**
     * This method is invoked by the platform to retrieve the data shape corresponding to
     * the given infotable property. For bound infotables, this should be the data shape defined
     * by the data source.
     * Subclasses may implement this method to return the appropriate data shapes that they are
     * using for their Infotable properties.
     * @param name      The name of the infotable property.
     * @return          The corresponding infotable. This may either be the name of an existing data shape
     *                  defined in the platform, or an object describing the data shape.
     */
    getSourceDatashapeName?(name: string): string | Dictionary<TWFieldDefinition>;

    /**
     * This method is invoked by the platform to retrieve the data shape corresponding to
     * the given infotable property. For bound infotables, this should be the data shape defined
     * by the data source.
     * Subclasses may implement this method to return the appropriate data shapes that they are
     * using for their Infotable properties.
     * @param name      The name of the infotable property.
     * @return          The corresponding infotable. This may either be the name of an existing data shape
     *                  defined in the platform, or an object describing the data shape.
     */
    getSourceDatashape?(name: string): string | TWDataShape;

    /**
     * Shows this widget's bounding box, if it was hidden.
     * Subclasses are expected to not override this method.
     */
    show(): void;

    /**
     * Hides this widget's bounding box, if it was visible.
     * Subclasses are expected to not override this method.
     */
    hide(): void;

    /**
     * Returns the internal value of the given property, without any additional conversions.
     * Subclasses are expected to not override this method.
     * @param name      The property's name.
     * @return          The property's value.
     */
    getInternalProperty(name: string): any;

    /**
     * Sets the internal value of the given property, without any additional conversions.
     * This does not update any bindings.
     * Subclasses are expected to not override this method.
     * @param name      The property's name.
     * @return          The property's value.
     */
    setInternalProperty(name: string, value: any): void;

    /**
     * Invoked internally before a property is updated. Ensures that default properties are not
     * assigned invalid values.
     * Subclasses are expected to not override this method.
     * @param name                  The property's name.
     * @param value                 The property's new value.
     * @return                      A string value indicating that the new value is unacceptable, or undefined if the property may be updated.
     */
    _beforeSetProperty(name: string, value: any): string | undefined;


    /**
     * Invoked by the platform whenever the user attempts to change any of this widget's properties
     * in the composer.
     * Subclasses can override this method to verify that the property's new value is acceptable.
     * If the property's value is acceptable, this method should return nothing, otherwise it should
     * return a string describing why the value is not acceptable. If this method returns a string,
     * it will be displayed to the user in the composer.
     * @param name                  The property's name.
     * @param value                 The property's new value.
     * @return                      A string value indicating that the new value is unacceptable, or undefined if the property may be updated.
     */
    beforeSetProperty?(name: string, value: any): string | undefined;

    /**
     * Invoked by the platform after the user updates any of this widget's properties in the composer.
     * Subclasses can override this method to react to property updates. Optionally, returning `true`
     * from this method will cause the mashup builder to re-render the widget.
     * @param name                  The property's name.
     * @param value                 The property's new value.
     * @return                      `true` if this property change should cause a redraw, false or undefined otherwise.
     */
    afterSetProperty?(name: string, value: any): boolean | undefined;

    /**
     * Initializes this widget and adds its content to the page.
     * Subclasses are expected to not override this method.
     * @param element                       The element to which this property should be added.
     * @param isCreatedFromUserDrop         A boolean that indicates whether or not this property is newly created, as a result of a drag-and-drop operation.
     */
    appendTo(element: JQuery, isCreatedFromUserDrop: boolean): void;

    /**
     * Determines whether this widget is resizable, based on this widget's
     * properties object values.
     * Subclasses are expected to not override this method.
     */
    isResizable(): boolean;

    /**
     * Determines whether this widget's width may be changed, based on this widget's
     * properties object values.
     * Subclasses are expected to not override this method.
     */
    isWidthEditable(): boolean;

    /**
     * Determines whether this widget's height may be changed', based on this widget's
     * properties object values.
     * Subclasses are expected to not override this method.
     */
    isHeightEditable(): boolean;

    /**
     * Invoked internally after a data source is bound to one of this widget's properties.
     * Subclasses are expected to not override this method.
     * @param id                    The widget element's HTML id.
     */
    afterDataBound(id: string): void;

    /**
     * Should be invoked whenever the widget's properties are updated.
     * Subclasses are expected to not override this method.
     * @param updateUi      Defaults to false. Should be set to true to update the properties panel for this widget when it is selected.
     */
    updateProperties({ updateUi }?: { updateUi?: boolean }): void;

    /**
     * Should be invoked after the property structure of this widget has been updated and the
     * properties table should be updated.
     * Subclasses are expected to not override this method.
     */
    updatedProperties(): void;

    /**
     * Returns the JSON representation of this widget.
     * Subclasses are expected to not override this method.
     * @return      An object.
     */
    toJSONObject(): any;

    /**
     * Returns the JSON representation of this widget.
     * Subclasses are expected to not override this method.
     * @return      An object.
     */
    toJSONObjectAsIs(): any;

    /**
     * Returns the string representation of this widget.
     * Subclasses are expected to not override this method.
     * @return      A string.
     */
    serialize(): string;

    /**
     * Finds the first child widget of this widget with the given identifier.
     * Subclasses are expected to not override this method.
     * @param id                The identifier.
     * @param result            Should be set to an empty array.
     *                          If the widget is found, it is added to this array.
     */
    findFirstWidgetWithId(id: string, result: TWWidget[]): void;

    /**
     * Finds the first child widget of this widget of the given type.
     * Subclasses are expected to not override this method.
     * @param id                The identifier.
     * @param result            Should be set to an empty array.
     *                          If the widget is found, it is added to this array.
     */
    findFirstWidgetOfType(type: string, result: TWWidget[]): void;

    /**
     * TBD
     */
    suggest(suggestions?: any, model?: any): any;

    /**
     * TBD
     */
    findDataSources(model?: any): any;

    /**
     * Returns an array containing all of this widget's property definitions.
     * This array contains both developer-defined properties and auto-generated standard properties.
     * It also contains services, events and anything else added to the widget after the widget has been created.
     * Whenever the array returned by this method is mutated, `updatedProperties` should be invoked
     * to update the widget's internal state.
     * Subclasses are expected to not override this method.
     * @return          An array of property definitions.
     */
    allWidgetProperties(): TWWidgetProperties;

    /**
     * Returns an array containing all of this widget's binding source properties.
     * Subclasses are expected to not override this method.
     * @return          An array of property definitions.
     */
    findBindingSources(): TWWidgetProperties[];

    /**
     * Returns an array containing all of this widget's binding target properties.
     * Subclasses are expected to not override this method.
     * @return          An array of property definitions.
     */
    findBindingTargets(): TWWidgetProperties[];

    /**
     * Returns an array containing all of this widget's binding source properties that have `warnIfNotBoundAsSource` set to `true`.
     * Subclasses are expected to not override this method.
     * @return          An array of property definitions.
     */
    findRequiredBindingSources(): TWWidgetProperties[];

    /**
     * Returns an array containing all of this widget's binding target properties that have `warnIfNotBoundAsTarget` set to `true`.
     * Subclasses are expected to not override this method.
     * @return          An array of property definitions.
     */
    findRequiredBindingTargets(): TWWidgetProperties[];

    /**
     * Returns an array containing all of this widget's events.
     * Subclasses are expected to not override this method.
     * @return          An array of property definitions.
     */
    findBindingEvents(): TWWidgetProperties[];

    /**
     * Returns an array containing all of this widget's events that have `warnIfNotBoundAsTarget` set to `true`.
     * Subclasses are expected to not override this method.
     * @return          An array of property definitions.
     */
    findRequiredBindingEvents(): TWWidgetProperties[];

    /**
     * Removes all bindings that have the given property as a target.
     * Subclasses are expected to not override this method.
     * @param name      The name of the property.
     */
    removeBindingsFromPropertyAsTarget(name: string): void;

    /**
     * Removes all bindings that have the given property as a source.
     * Subclasses are expected to not override this method.
     * @param name      The name of the property.
     */
    removeBindingsFromPropertyAsSource(name: string): void;

    /**
     * Checks whether the given property is a target of any bindings.
     * @param name      The name of the property.
     * @return          True if this property is a target of at least a binding, false otherwise.
     */
    isPropertyBoundAsTarget(name: string): boolean;

    /**
     * Checks whether the given property is a source of any bindings.
     * @param name      The name of the property.
     * @return          True if this property is a source of at least a binding, false otherwise.
     */
    isPropertyBoundAsSource(name: string): boolean;

    /**
     * Returns the property definition for the given property, or the default definition if this widget does not provide it.
     * @param name      The name of the property.
     * @return          The property definition if available.
     */
    getWidgetMetadata(name: string): TWWidgetProperty | undefined;

    /**
     * Returns the property attribute value for the given property, or the default value if the property definition does not provide it.
     * @param name          The name of the property.
     * @param attribute     The name of the attribute.
     * @return              The property definition if available.
     */
    getWidgetPropertyMetadata(name: string, attribute: string): TWWidgetProperty | undefined;

    /**
     * Invoked internally to mark the mashup as dirty and update its internal state.
     * Subclasses are not expected to override or invoke this method.
     */
    stateChanged(): void;

    /**
     * Invoked internally when the IDs of child widgets have changed.
     * Subclasses are not expected to override this method.
     * @param changes   An object describing the ID changes.
     */
    childWidgetIdsChanged(changes: Dictionary<string>): void;

    /**
     * Invoked after the IDs of child widgets have changed.
     * Subclasses may override this method if they need to respond to such changes.
     * @param changes       An object describing the ID changes.
     *                      This object's keys will be the old widget IDs and their values will correspond to the new IDs.
     */
    afterChildWidgetIdsChanged(changes: Dictionary<string>): void;

    /**
     * Returns a boolean indicating whether or not this widget may be copied or not.
     * @return          `true` if this widget may be copied, `false` otherwise.
     */
    copyable(): boolean;

    /**
     * Invoked when the IDE area resizes.
     */
    notifyWidgetsOfIdeResize(): void;

    /**
     * Invoked when this widget is deleted and its resources should be freed.
     * Subclasses should not generally override this method as the `beforeDestroy` method
     * is invoked early on during destruction and is meant to be overriden by sublcasses
     * to clean up any resources held.
     * Nevertheless, subclasses overriding this method must invoke the superclass
     * implementation at some point in their implementation.
     */
    destroy(): void;

    /**
     * Invoked before this widget is destroyed.
     * Subclasses that need to perform any additional work during destruction should override
     * this method and perform it here.
     */
    abstract beforeDestroy?(): void;

    /**
     * Returns this widget's display name.
     * If one isn't set, the widget's ID will be used as its display name.
     * @return          A string representing this widget's display name.
     */
    getDisplayName(): string;

    /**
     * Recursively retrieves the IDs of this widget and all of its child widgets.
     * @param IDs       An object that will hold the IDs of this widget and its child widgets when this method returns.
     *                  The IDs will represent this object's keys and their values will be set to `1`.
     */
    getWidgetIds(IDs: { [key: string]: number }): void;

    /**
     * Returns the data shape definition for the given property, if it is a bound infotable property.
     * @param propertyName The name of the property.
     */
    getInfotableMetadataForProperty(propertyName: string): Dictionary<TWFieldDefinition> | undefined;

}



/**
 * A class that represents a controller that manages the lifecycle and content of a Thingworx widget.
 * This is the Runtime variant of the widget type
 */
declare abstract class TWRuntimeWidget extends TWWidget {

    /**
     * A property that is initialized to the automatically generated ID
     * of the widget element.
     */
    idOfThisElement: string;

    /**
     * A property that is initialized to the automatically generated ID
     * of the widget element.
     */
    jqElementId: string;

    /**
     * Returns a string representing the HTML content managed by this widget.
     * This method is invoked early on in the initialization, before the `jqElement` and `boundingBox` properties have been initialized.
     * Must be overriden by subclasses to provide the appropriate HTML content that this widget will manage.
     * The HTML structure returned by this method must contain a node with the `widget-content` class.
     * That node will represent this widget's `jqElement` property and will be used by the platform to implement
     * bindings and event triggers.
     */
    abstract renderHtml(): string;

    /**
     * This method is invoked by the platform after `renderHtml`, after adding the HTML content to the document.
     * When this method is invoked, the `jqElement` and `boundingBox` property will have been initialized and may be used.
     * May be optionally overriden by classes to perform any additional work needed for initialization.
     */
    abstract afterRender?(): void;

    /**
     * A reference to the mashup that created this widget.
     */
    mashup: TWMashup;

    /**
     * Used internally to add a child widget to this widget.
     * @param widget    The widget to add.
     */
    addWidget(widget: TWRuntimeWidget): void;

    /**
     * Retrieves the current value of the given property.
     * If that property doesn't yet have any value, a default value may be optionally specified.
     * @param name              The name of the property.
     * @param defaultValue      Defaults to `undefined`. An optional default value to return if this property doesn't yet have a value.
     * @return                  The property's value, or the value specified in the `defaultValue` parameter if the property hasn't yet been set.
     */
    getProperty(name: string, defaultValue?: any | undefined): any | undefined;

    /**
     * Sets the value of the given property.
     * @param name          The name of the property.
     * @param value         The new value to assign to the property. This value's type should match the property's base type.
     */
    setProperty(name: string, value?: any): void | undefined;

    /**
     * Globally updates the selection of the given infotable property.
     * This will update the selection in all other widgets bound to the same data source
     * as the given property.
     * @param property                  The name of the property for which to update the selection.
     *                                  This should represent a bound infotable property.
     * @param selectedRowIndices        An array containing the indexes of the selected rows.
     * @param preventEventTrigger       Defaults to false. If set to true, this update will not trigger the
     *                                  `SelectedRowsChanged` event of the service whose selection will be updated.
     */
    updateSelection(property: string, selectedRowIndices: number[], preventEventTrigger?: boolean | undefined): void;

    /**
     * Invoked by the platform when the selection for one of this widget's bound infotable properties
     * has been updated by an external source.
     * @param property                  The name of the property whose selection was updated.
     * @param selectedRows              An array containing the selected objects.
     * @param selectedRowIndices        An array containing the indexes of the selected rows.
     *                                  The position of the indexes in this array will match the positions
     *                                  of the objects in the `selectedRows` argument.
     */
    handleSelectionUpdate?(property: string, selectedRows: any[], selectedRowIndices: number[]): void;

    /**
     * Invoked internally when a bound property is updated as a result of its binding.
     * This method handles the standard properties and should not be overriden by subclasses.
     * Instead, the `updateProperty` method serves as an extension point that should be
     * overriden by subclasses.
     * @param info 
     */
    standardUpdateProperty(info: TWUpdatePropertyInfo): void;

    /**
     * Should be overriden by subclasses to handle bound property updates.
     * Note that when properties are updated this way, the actual value of the property
     * isn't automatically updated. It is the developer's reponsability to update the
     * property's value in response to this update.
     * @param info      An object containing information about the updated property.
     */
    abstract updateProperty(info: TWUpdatePropertyInfo): void;

    /**
     * Invoked by the platform when any of this widget's services is invoked.
     * Subclasses should override this method to perform the necessary actions
     * to execute that service.
     * @param name      The name of the service that was invoked.
     */
    abstract serviceInvoked(name: string): void;

    /**
     * Invoked by the platform when this widget's DOM node is resized.
     * This computes the widget's new size and invokes the `resize` method after a delay, then recursively
     * invokes itself on all child widgets.
     * Subclasses are not expected to override this method, however if they do,
     * they must invoke the `handleResponsiveWidgets` on all subwidgets at some point in their implementation.
     * @param fast      Defaults to false. If set to true, the resize will happen after a shorter delay.
     */
    handleResponsiveWidgets(fast: boolean): void;

    /**
     * TBD
     */
    isPropertyBoundAsTarget(targetArea: string, targetId: string, propertyName: string): boolean;

    /**
     * Invoked by the platform to create this widget's DOM nodes and add them to the document.
     * Subclasses are not expected to override this method.
     * @param ui                A jQuery element to which this widget's bounding box will be added.
     * @param mashup            An object representing the mashup to which this widget belongs.
     */
    appendTo(ui: JQuery, mashup: Object): void;

    /**
     * An internal object describing the event triggers currently being invoked by this widget.
     */
    triggersBeingInvoked: Object;

    /**
     * Used internally to check the number of triggers currently being invoked by this widget.
     * Subclasses overriding this method should return the value of the superclass implementation.
     * @return      The number of triggers.
     */
    numberOfTriggersBeingInvoked(): number;

    /**
     * Used internally to verify if this widget is currently invoking the given trigger.
     * Subclasses overriding this method should return the value of the superclass implementation.
     * @param event         The name of the trigger.
     * @return              `true` if the trigger is currently being invoked, `false` otherwise.
     */
    isAlreadyInvoking(event: string): boolean;

    /**
     * Used internally to mark the given trigger as currently invoking.
     * Subclasses overriding this method should invoke the superclass implementation at some point in their implementation.
     * @param event         The name of the trigger.
     */
    markNowInvoking(event: string): void;

    /**
     * Used internally to mark the given trigger as finished invoking.
     * Subclasses overriding this method should invoke the superclass implementation at some point in their implementation.
     * @param event         The name of the trigger.
     */
    markDoneInvoking(event: string): void;

    /**
     * Recursively resets the inputs back to the default value of this widget and all of its child widgets.
     * Subclasses are not expected to override this method, instead they should override
     * `resetInputToDefault` to clear their own input elements.
     */
    ResetInputsToDefaultValue(): void;

    /**
     * Invoked by the platform to clear this widget's editable elements to their default values.
     * May optionally be overriden by subclasses that support clearing their inputs to the default values.
     */
    resetInputToDefault?(): void;

    /**
     * Invoked internally by the platform to set up the standard tooltip for this widget
     * if it supports one. Widgets that support tooltips should declare a property called
     * `__supportsTooltip` that has a value of `true`.
     * Subclasses that support tooltips and wish to customize its appearance should override
     * the `tooltipOptions` method and return their custom configuration settings from there.
     * Subclasses are not expected to override this method.
     */
    bindTooltop(): void;

    /**
     * May optionally be overriden by subclasses that support tooltips to customize the appearance of tooltips.
     * Subclasses overriding this method must return an object containing the custom tooltip configuration options.
     * @return          An object containing the tooltip options.
     */
    tooltipOptions?(): any;

    /**
     * Should be invoked to show this widget after it has been hidden.
     */
    show(): void;

    /**
     * Should be invoked to hide this widget from the document.
     */
    hide(): void;

    /**
     * Creates and displays a mashup popup.
     * @param mashupName            The name of the mashup that will be displayed in the popup.
     * @param parameters            An object containing the starting values of the parameters for the popup.
     *                              This object should have the parameter names as keys and their values as the values.
     * @param callback              A callback that will optionally be invoked when this popup is closed.
     * @param paramChangeCallback   A callback that is optionally invoked whenever any of the mashup's parameters is updated.
     *                              This callback will receive the name and value of the updated parameter.
     * @param modal                 Defaults to `false`. A boolean that controls whether this popup will be modal or not.
     * @param popupTitle            If specified, represents a title to display at the top of the popup mashup.
     * @param fixedPopupWidth       Defaults to the mashup's width. The width of the popup in pixels.
     * @param fixedPopupHeight      Defaults to the mashup's height. The height of the popup in pixels.
     * @param modalPopupOpacity     Defaults to `0.5`. Must be used with modal. If specified, must be a value between `0` and `1`.
     *                              Controls how much to darken the background behind the modal popup.
     * @param isFullScreen          Defaults to `false`. Controls whether the popup appears full-screen or not.
     * @param dialogId              Defaults to an auto-generated value. A unique identifier to use for this popup.
     * @param showClose             Defaults to `false`. If set to true, the popup will have a close button that dismisses it.
     * @param clickOutsideToClose   Defaults to `false`. Must be used with `modal`. If set to true, clicking outside the popup will dismiss it.
     * @param dialogClass           Defaults to `"undefined"`. A string containing custom classes to add to the popup.
     */
    showPopup(
        mashupName: string,
        parameters: Dictionary<any>,
        callback?: (() => void) | undefined,
        paramChangeCallback?: ((name: string, value: any) => void) | undefined,
        modal?: boolean | undefined,
        popupTitle?: string | undefined,
        fixedPopupWidth?: number | undefined,
        fixedPopupHeight?: number | undefined,
        modalPopupOpacity?: number | undefined,
        isFullScreen?: boolean | undefined,
        dialogId?: string | undefined,
        showClose?: boolean | undefined,
        clickOutsideToClose?: boolean | undefined,
        dialogClass?: string | undefined
    ): void;

    /**
     * Should be invoked to close the popup to which this widget belongs.
     * If this widget does not belong to a popup, invoking this method has no effect.
     */
    closeIfPopup(): void;

    /**
     * Should be invoked to set the value of one of the parameters of the popup which has been opened by this widget.
     * If this widget doesn't have a popup open, this method has no effect.
     * @param name 
     * @param value 
     */
    setPopupProperty(name: string, value: any): void;

    /**
     * Returns an array containing the child widgets of this widget.
     * The contents of the array returned by this method should not be modified.
     */
    getWidgets(): TWRuntimeWidget[];

    /**
     * Should be invoked to replace the current page mashup.
     * @param mashupName            The name of the new mashup.
     * @param parameters            An object containing the starting values of the parameters for the mashup.
     *                              This object should have the parameter names as keys and their values as the values.
     * @param thisPropertyId        A string that acts as the unique identifier prefix for the new mashup.
     * @param pushState             Defaults to `false`. If set to `true`, the platform will create a history state for this
     *                              new mashup.
     */
    replacePageMashup(mashupName: string, parameters: Dictionary<any>, thisPropertyId: string, pushState?: boolean | undefined);

    /**
     * Invoked by the platform to focus the first focusable element.
     * This method should not be overriden by subclasses.
     */
    setDefaultFocus(): void;

    /**
     * Invoked to destroy this widget and free up any resources used by it.
     * This will also remove the widget's DOM nodes and if it has one, the popup opened by it.
     * Subclasses that need to perform additional work during destruction should not override
     * this method, instead the `beforeDestroy` method is invoked early on in the destruction
     * phase and may optionally be overriden by classes to perform custom work necessary to free up resources.
     */
    destroy(): void;

    /**
     * This method may optionally be overriden by subclasses to free up any resources prior to destruction.
     */
    abstract beforeDestroy?(): void;

}

/**
 * Represents a type containing the properties shared by all Thingworx entities returned by HTTP requests.
 */
declare abstract class TWEntityDefinition {
    /**
     * A dictionary of entity-specific aspects.
     */
    aspects: Dictionary<any>;

    /**
     * The avatar image representing this entity.
     */
    avatar: string;

    columns: number;
    configurationTables: any;
    designTimePermissions: any;
    documentationContent: string;
    homeMashup: string;
    lastModifiedDate: number;
    name: string;
    owner: any;
    projectName: any;
    rows: number;
    runTimePermissions: any;
    tags: any[];
    thingShapes: any[];
    thingTemplates: any[];
    things: any[];
    visibilityPermissions: any[];
}

/**
 * Represents the definition of a mashup entity.
 * Contains the additional entity fields specific to mashups.
 */
declare abstract class TWMashupEntityDefinition extends TWEntityDefinition {

    /**
     * Contains the actual mashup content serialized to a string.
     * `JSON.parse` should be used on this property to obtain a usable version of the contents.
     */
    mashupContent: string;
}

/**
 * An object which represents the definition of a platform service that may be invoked
 * from the mashup data sources.
 */
declare interface TWMashupServiceDefinition {
    /**
     * A unique identifier for this service.
     * For custom services this will be a GUID string.
     */
    Id: string;

    /**
     * The API method to use when invoking the service.
     * This is typically set to 'POST'.
     */
    APIMethod: string;

    /**
     * Typically set to 'Services'.
     */
    Characteristic: string;

    /**
     * The name of the service as it appears in the composer.
     */
    Name: string;

    /**
     * The name of the service that is invoked in the platform.
     */
    Target: string;

    /**
     * Typically set to 0.
     */
    RefreshInterval: number;

    /**
     * Typically set to an empty object.
     */
    Parameters: any;
}

/**
 * An object which represents a data source for a mashup.
 */
declare interface TWMashupDataSource {
    /**
     * A unique identifier for this data source.
     * For custom data sources this will be a GUID string.
     */
    Id: string;

    /**
     * The name of this data source as it appears in the composer.
     */
    DataName: string;

    /**
     * The name of the entity representing this data source.
     * For built-in data sources such as the session object, this will be an empty string.
     */
    EntityName: string;

    /**
     * A string representing the entity collection type of this data source, such as 'Things'.
     */
    EntityType: string;

    /**
     * An array of services exposed by this data source.
     */
    Services: TWMashupServiceDefinition[];
}

/**
 * An object representing an event binding that occurs in a mashup.
 * This specifies what service to invoke in response to an event occurring.
 */
declare interface TWMashupEventTriggerDefinition {

    /**
     * A randomly generated GUID string uniquely identifying this binding.
     */
    Id: string;

    /**
     * Represents the area in which the triggering event is defined.
     * This will be either 'Mashup', 'UI' or 'Data'.
     */
    EventTriggerArea: string;

    /**
     * Represents the name of the occurring event.
     */
    EventTriggerEvent: string;

    /**
     * Represents the identifier of the object which will trigger the event.
     * For 'Mashup' areas this will be 'mashup-root'.
     * For 'UI' areas this will be the ID of the triggering widget.
     * For 'Data' areas this will be the name of the triggering service.
     */
    EventTriggerId: string;

    /**
     * Represents the container of the triggering object.
     * This will be an empty string for 'Mashup' and 'UI' areas and the name
     * of the entity for 'Data' areas.
     */
    EventTriggerSection: string;

    /**
     * Represents the area in which the triggered action is defined.
     * This will be either 'Mashup', 'UI' or 'Data'.
     */
    EventHandlerArea: string;

    /**
     * Represents the identifier of the object on which the action will be triggered.
     * For 'Mashup' areas this will be 'mashup-root'.
     * For 'UI' areas this will be the ID of the triggered widget.
     * For 'Data' areas this will be the name of the triggered service.
     */
    EventHandlerId: string;

    /**
     * Represents the name of the triggered action.
     * This will be the entity service name for the 'Data' area and the
     * name of the widget service for the 'UI' or 'Mashup' areas.
     */
    EventHandlerService: string;
}


/**
 * An object representing a data binding that occurs in a mashup.
 * This specifies the source and source property and the target and target property of a data binding.
 */
declare interface TWMashupDataBindingDefinition {

    /**
     * A randomly generated GUID string uniquely identifying this binding.
     */
    Id: string;

    /**
     * Represents the area in which the data source is defined.
     * This will be either 'Mashup', 'UI' or 'Data'.
     */
    SourceArea: string;

    /**
     * Defined when the source data is an infotable that can have selected rows.
     * In other cases this property will not exist.
     * If it exists its value will either be 'AllData' or 'SelectedRows'.
     */
    SourceDetails?: string;

    /**
     * The ID of the data source. This will be the service name for the 'Data' area and 
     * the widget ID for other areas.
     */
    SourceId: string;

    /**
     * Represents the container of the data source.
     * This will be an empty string for 'Mashup' and 'UI' areas and the name
     * of the entity for 'Data' areas.
     */
    SourceSection: string;

    /**
     * Represents the area in which the data target is defined.
     * This will be either 'Mashup', 'UI' or 'Data'.
     */
    TargetArea: string;

    /**
     * The ID of the data target. This will be the service name for the 'Data' area and 
     * the widget ID for other areas.
     */
    TargetId: string;

    /**
     * Represents the container of the data target.
     * This will be an empty string for 'Mashup' and 'UI' areas and the name
     * of the entity for 'Data' areas.
     */
    TargetSection: string;

    /**
     * Contains an array of properties affected by this binding.
     */
    PropertyMaps: TWMashupPropertyBindingDefinition[];
}

declare interface TWMashupPropertyBindingDefinition {
    
    /**
     * The name of the source property.
     */
    SourceProperty: string;

    /**
     * The baseType of the source property.
     */
    SourcePropertyBaseType: TWBaseType;

    /**
     * If defined, this represents the type of the source property. The value of this field will be (incomplete list):
     *  * 'Field' for fields of infotable properties.
     *  * 'Property' or 'property' for widget properties.
     *  * 'InfoTable' when the data source represents the entire infotable result of a service.
     */
    SourcePropertyType?: string;
    
    /**
     * The name of the target property.
     */
    TargetProperty: string;

    /**
     * The baseType of the target property.
     */
    TargetPropertyBaseType: TWBaseType;


    /**
     * If defined, this represents the type of the target property. The value of this field will be (incomplete list):
     *  * 'Field' for fields of infotable properties.
     *  * 'Property' or 'property' for widget properties.
     *  * 'Paremeter' for service parameters.
     */
    TargetPropertyType?: string;
}

/**
 * Represents an object containing the values of a widget's properties.
 * These are used to create an actual widget instance.
 * 
 * In addition to this interface's properties objects of this type will also include
 * all of the widget's custom properties.
 */
declare interface TWMashupWidgetPropertiesDefinition {

    /**
     * The widget's area. This will always be 'UI' except for the root widget whose
     * area is 'Mashup'.
     */
    Area: string;

    /**
     * The ID of this widget.
     */
    Id: string;

    /**
     * This widget's display name.
     */
    DisplayName: string;

    /**
     * The name of this widget's class. This is used when creating the widget - this name represents the name
     * of the constructor function that Thingworx will use to instantiate the widget.
     */
    Type: string;

    /**
     * The label of the widget's type.
     */
    __TypeDisplayName: string;

    [key: string]: any;
}

/**
 * An object containing the JSON representation of a widget instance.
 * Note that this class does not represent an actual widget, but rather the information required in order to create
 * the widget itself.
 */
declare interface TWMashupWidgetDefinition {

    /**
     * An object containing the values of this widget's properties.
     */
    Properties: TWMashupWidgetPropertiesDefinition;

    /**
     * An array containing this widget's sub-widgets.
     */
    Widgets: TWMashupWidgetDefinition[];
}

/**
 * An object containing the JSON representation of a mashup.
 * Note that this class does not represent an actual mashup, but rather the information required in order to create 
 * the mashup itself.
 */
declare abstract class TWMashupDefinition {

    /**
     * Only available in Thingworx 8.2 and newer.
     * A string containing the custom CSS written for this mashup in new composer.
     */
    CustomMashupCss?: string;

    /**
     * Represents the mashup type.
     * Typically, the value of this property is 'mashup'.
     */
    mashupType: string;

    /**
     * A dictionary of data sources used by this mashup.
     */
    Data: Dictionary<TWMashupDataSource>;

    /**
     * An arrat of data bindings within this mashup.
     */
    DataBindings: TWMashupDataBindingDefinition[];

    DesignTimePermissions: any;

    /**
     * An array of event bindings within this mashup.
     */
    Events: TWMashupEventTriggerDefinition[];

    RunTimePermissions: any;

    /**
     * The root widget of this mashup.
     */
    UI: TWMashupWidgetDefinition;
}

/**
 * The data manager is an object used by each mashup for invoking Thingworx services and dispatching
 * events and data updates between the various elements that make up a mashup.
 */
declare abstract class TWDataManager {
    addDataChangeSubscriber(dataBinding: TWMashupDataBindingDefinition, subscriberFunction: () => void): any;
    addSelcetedRowsChangedEventSubscription(dataBinding: TWMashupDataBindingDefinition, subscriberFunction: () => void): any;
    addSelectedRowsForWidgetHandleSelectionUpdateSubscription(dataBinding: TWMashupDataBindingDefinition, subscriberFunction: () => void): any;
    beforePublishDataChange(binding: any, value: any): any;
    beforePublishDataChangeFromServiceReturn(dataName: string, service: string, value: any): any;
    beforePublishDataChangeFromWidget(area: string, widgetId: string, propertyName: string, value: any): any;
    beforePublishDataChangeWithData(binding: any, value: any): any;
    destroy(): any;
    getPropertySubscriptions(): any;
    getUpdatePropertyInfoFromBindingSource(dataBinding: any): any;
    handleDataAdded(data: any): any;
    handleSubscriptionOnDynamicEntity(oldEntityType: any, oldEntityName: any, def: any): any;
    ignore_updateSelectionFromWidget: boolean;
    indentLevel: number;
    loadFromMashup(mashup: TWMashup): any;
    migrateAnyBindings(mashup: TWMashup): any;
    publishDataChange(binding: any, allDataOrSelectedRows: any): any;
    publishDataChangeFromPropertyEvent(dataName: any, service: any, property: any, value: any): any;
    publishDataChangeFromServiceReturn(dataName: any, service: any, value: any): any;
    publishDataChangeWithData(binding: any, value: any): any;
    publishSelectionChange(binding: any, widgetJqElementId: any, selectedRowsCacheInfo: any, selectedRowIndices: any, preventEventTrigger: any): any;
    resetServicesForMashupReuse(Data: any): any;
    sessionSubscriptions: any[];
    setupInitialSubscriptions(): any;
    subscribeToProperty(sourceSection: any, entityType: any, entityName: any, propName: any): any;
    subscribers: Dictionary<any>;
    unsubscribeFromEntity(def: any): any;
    updateSelectionFromWidget(widgetId: any, propertyName: any, mashupId: any, widgetJqElementId: any, selectedRowIndices: any, preventEventTrigger: any): any;

}

/**
 * An object type representing the definition for a mashup parameter.
 */
declare interface TWMashupParameterDefinition {

    /**
     * The parameter's base type.
     */
    BaseType: TWBaseType;

    /**
     * The parameter's name.
     */
    ParameterName: string;

    /**
     * The parameter's description.
     */
    Description: string;

    /**
     * Only set for infotable parameters.
     * Contains the name of the data shape and the type of the infotable.
     */
    Aspects?: {

        /**
         * The name of the data shape.
         */
        dataShape: string;

        /**
         * Should be set to true if the parameter represents a stream entry.
         * If set to true, the infotable will gain the typical stream entry fields in addition
         * to the ones defined in the data shape.
         */
        isStreamEntry?: boolean;

        /**
         * Should be set to true if the parameter represents a data table entry.
         * If set to true, the infotable will gain the typical data table entry fields in addition
         * to the ones defined in the data shape.
         */
        isDataTableEntry?: boolean;

    }

}

/**
 * A class that represents a controller that manages a page or section of a page.
 * The mashup is responsible for creating and managing widgets, invoking services and handling bindings.
 */
declare abstract class TWMashup extends TWMashupDefinition {

    /**
     * Invoked to add CSS styles to this mashup.
     * These will be added to the mashup's own style block.
     * Whenver styles are added in this way, the `updateStyles()` method must be invoked
     * to actually publish the udpated style to the document.
     * @param styles A string of CSS style rules that will be added to the page.
     */
    addStyles(styles: string): void;

    /**
     * The data manager managing service invocations and bindings for this mashup.
     */
    dataMgr: TWDataManager;

    /**
     * Should be invoked to destroy this mashup and all of its widgets and sub-components.
     * This will also remove this mashup's DOM element from the document.
     */
    destroyMashup(): void;

    /**
     * Returns an array of data binding definitions that have the given Id and areas as targets.
     * @param targetArea The target area.
     * @param targetId The target id.
     * @return An array of data bindings matching the given criteria.
     */
    findDataBindingsByTargetAreaAndId(targetArea: string, targetId: string): TWMashupDataBindingDefinition[];

    /**
     * Causes the 'MashupLoaded' event to trigger.
     */
    fireMashupLoadedEvent(): void;

    /**
     * Used to verify if the 'MashupLoaded' event has been triggered.
     */
    hasMashupLoadedBeenFired: boolean;

    /**
     * The CSS selector of this mashup's DOM element.
     */
    htmlIdOfMashup: string;

    /**
     * Set to `true` for dashboard mashups, `false` otherwise.
     */
    isDashboardMashup: string;

    /**
     * Initializes this mashup with the configuration of the specified JSON representation.
     * @param json The mashup content string. When parsed, the resulting object should conform to the `TWMashupDefinition` interface.
     * @param data The mashup entity.
     * @return This mashup.
     */
    loadFromJSON(json: string, data: TWMashupEntityDefinition): TWMashup;

    /**
     * The name of the mashup.
     */
    mashupName: string;

    /**
     * An object containing the parameters defined for this mashup.
     * This object's key names are typically the same as the parameter names.
     */
    mashupParameterDefinitions: Dictionary<TWMashupParameterDefinition>;

    /**
     * An array of triggers to invoke after this mashup loads. This only populated while triggers
     * are invoked while the mashup is loading. In that case, they are delayed until after the mashup
     * has finished loading.
     */
    mashupTriggersToFireAfterLoad: string[];

    /**
     * Should be invoked to reset all service results and widgets to their default values.
     * Service results will be set to blank and this will invoke the `ResetInputsToDefaultValue` method on
     * all contained widgets.
     */
    resetServicesAndInputsToDefaultValue(): void;

    /**
     * The name of the root widget.
     */
    rootName: string;

    /**
     * The root widget.
     */
    rootWidget: TWRuntimeWidget;

    /**
     * Updates the value of the given parameter to the given value.
     * @param parameterName The name of the parameter to update.
     * @param parameterValue The new value to assign to the parameter.
     */
    setParameter(parameterName: string, parameterValue: any);

    /**
     * Invoked internally by the platform whenever any property is updated as a result of a binding.
     * This updates standard properties and then hands off the update to the regular `updateProperty()` method.
     * @param updatePropertyInfo An object containing information about what was updated.
     */
    standardUpdateProperty(updatePropertyInfo: TWUpdatePropertyInfo);

    /**
     * A unique identifier string associated with this mashup.
     */
    uniqueMashupEventNamespace: string;

    /**
     * Handles updates to properties that are the result of a binding.
     * @param updatePropertyInfo An object containing information about what was updated.
     */
    updateProperty(updatePropertyInfo: TWUpdatePropertyInfo);

    /**
     * Updates this mashup's style block to include the latest styles that were added through
     * the `addStyles()` method.
     */
    updateStyles(): void;

}

declare interface X { 
    [prop: string]: any;
    Widget: typeof TWRuntimeWidget;
    IDE: {
        [prop: string]: any;
        Widget: typeof TWComposerWidget;
        Widgets: Dictionary<typeof TW.IDE.Widget>;
    };
    Runtime: {
        [prop: string]: any;
        Widget: typeof TWRuntimeWidget;
        Widgets: Dictionary<typeof TW.Runtime.Widget>;
    }
}
declare const TW: X;