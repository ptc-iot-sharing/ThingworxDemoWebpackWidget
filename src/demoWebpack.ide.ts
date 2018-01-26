declare const TW: any;
// automatically import the css file
require("./styles/ide.css");

TW.IDE.Widgets.demoWebpack = function() {

    this.widgetIconUrl = function() {
        return require('./images/icon.png');
    };
    this.widgetProperties = function() {
        return {
            'name': 'TypescriptWebpackWidget',
            'description': 'An example widget showing how you can use modern web developent tech',
            'category': ['Common'],
            'iconImage': 'icon.png',
            'isExtension': true,
            'supportsAutoResize': true,
            'isResizable': true,
            'properties': {
                'Width': {
                    'description': 'Total width of the widget',
                    'baseType': 'NUMBER',
                    'isVisible': true,
                    'defaultValue': 640,
                    'isBindingTarget': false
                },
                'Height': {
                    'description': 'Total height of the widget',
                    'baseType': 'NUMBER',
                    'isVisible': true,
                    'defaultValue': 800,
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

    this.widgetEvents = function () {
        return {
            'CellLabelChanged': {
                'warnIfNotBound': false
            },
            'SelectedCellChanged': {
                'warnIfNotBound': false
            }
        };
    };

    this.renderHtml = function() {
        return '<div class="widget-content widget-mxdiagram-viewer"></div>';
    };

}