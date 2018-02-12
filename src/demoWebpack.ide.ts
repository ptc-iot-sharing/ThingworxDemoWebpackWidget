// automatically import the css file
import { ThingworxComposerWidget } from './support/widgetRuntimeSupport'

@ThingworxComposerWidget
class DemoWebpackWidget extends TWComposerWidget {

    widgetIconUrl(): string {
        return require('./images/icon.png');
    }

    widgetProperties(): TWWidgetProperties {
        require("./styles/ide.css");
        return {
            'name': 'TypescriptWebpackWidget',
            'description': 'An example widget showing how you can use modern web developent tech',
            'category': ['Common'],
            'supportsAutoResize': true,
            'properties': {
                'Width': {
                    'description': 'Total width of the widget',
                    'baseType': 'NUMBER',
                    'isVisible': true,
                    'defaultValue': 90,
                    'isBindingTarget': false
                },
                'Height': {
                    'description': 'Total height of the widget',
                    'baseType': 'NUMBER',
                    'isVisible': true,
                    'defaultValue': 30,
                    'isBindingTarget': false
                },
                'Value': {
                    'description': 'Test',
                    'baseType': 'STRING',
                    'isVisible': true,
                    'defaultValue': "test",
                    'isBindingTarget': true
                }
            }
        };
    };

    widgetServices(): Dictionary<TWWidgetService> {
        return {
            "TestService": {
                
            }
        };
    };

    widgetEvents(): Dictionary<TWWidgetEvent> {
        return {
            'CellLabelChanged': {
                'warnIfNotBound': false
            },
            'SelectedCellChanged': {
                'warnIfNotBound': false
            }
        };
    }

    renderHtml(): string {
        return '<div class="widget-content widget-demo-viewer">test</div>';
    };

    afterRender(): void {
    }

    beforeDestroy(): void {
    }

}