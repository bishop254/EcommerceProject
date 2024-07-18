import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'custom-footer',
    templateUrl: './custom-footer.html',
})
export class CustomFooterComponent {
    currYear: number = new Date().getFullYear();
    constructor() {}
    ngOnInit() {}
}
