TW.Runtime.Widgets.demoWebpack = function () {
    let internalLogic;

    this.renderHtml = function () {
        return '<div class="widget-content widget-demo"></div>';
    };

    this.runtimeProperties = function () {
        return {
            needsDataLoadingAndError: true,
        };
    }

    this.afterRender = async function () {
        internalLogic = await import("./internalLogic/internalLogic");
    }

    this.updateProperty = async function (updatePropertyInfo) {
        this.setProperty(updatePropertyInfo.TargetProperty, updatePropertyInfo.RawDataFromInvoke);
        switch (updatePropertyInfo.TargetProperty) {
            case 'Value':
                if (!internalLogic) {
                    internalLogic = await import("./internalLogic/internalLogic");
                }
                internalLogic.createDataElement(this.jqElement[0], updatePropertyInfo.SinglePropertyValue)
                break;
        }
    }

    this.beforeDestroy = function () {
        this.resetCurrentGraph();
    }
}