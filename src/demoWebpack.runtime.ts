import { ThingworxRuntimeWidget } from './support/widgetRuntimeSupport'

@ThingworxRuntimeWidget
class DemoWebpackWidget extends TWRuntimeWidget {
    serviceInvoked(name: string): void {
        throw new Error("Method not implemented.");
    }
    internalLogic;

    renderHtml(): string {
        return '<div class="widget-content widget-demo"></div>';
    };

    async afterRender(): Promise<void> {
        this.internalLogic = await import("./internalLogic/internalLogic");
    }

    async updateProperty(info: TWUpdatePropertyInfo): Promise<void> {
        this.setProperty(info.TargetProperty, info.RawDataFromInvoke);
        switch (info.TargetProperty) {
            case 'Value':
                if (!this.internalLogic) {
                    this.internalLogic = await import("./internalLogic/internalLogic");
                }
                this.internalLogic.createDataElement(this.jqElement[0], info.SinglePropertyValue)
                break;
        }
    }

    beforeDestroy?(): void {
        // resetting current widget
    }
}