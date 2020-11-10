/**
 * A typescript transformer that automatically generates description decorators from JSDoc tags.
 * 
 * When used, a description decorator will be generated for a property or method that:
 *  - has either the `@property`, `@event` or `@service` decorator applied to it
 *  - is declared in a class that has the `@TWWidgetDefinition` decorator applied to it
 * 
 * It will also generate a description decorator for any class that has the `@TWWidgetDefinition` decorator applied to it.
 * 
 * The transformer will take the text of the first JSDoc tag that refers to each matching element and 
 * supply it as the argument for the description decorator.
 */
class DescriptionTransformer {

}