import {
    Component,
        View,
        bootstrap,
        DynamicComponentLoader,
        ElementRef,
        ViewRef,
        NgFor,
        NgIf,
        Injector
} from 'angular2/angular2';

@Component({
    selector: 'hello'
})
@View({
    template: `
        <ul>
            <li *ng-for="#tab of tabs" (click)="selectTab(tab)">ここをクリック{{tab.tabTitle}}</li>
        </ul>
        <content></content>
        `,
        directives: [NgFor]
})
export class Hello {
    constructor() {
        this.tabs = [1,2,3,4];
    }
    selectTab(tab) {
        alert("kita");
        //tab = 2;
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
        tab.active = true;
    }
}

bootstrap(Hello);
