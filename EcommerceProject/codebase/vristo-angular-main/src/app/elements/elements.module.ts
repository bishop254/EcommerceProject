import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// highlightjs
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

// tippy
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// headlessui
import { MenuModule } from 'headlessui-angular';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';

import { AlertsComponent } from './alerts';
import { AvatarComponent } from './avatar';
import { BadgesComponent } from './badges';
import { BreadcrumbsComponent } from './breadcrumbs';
import { ButtonsComponent } from './buttons';
import { ButtonsGroupComponent } from './buttons-group';
import { ColorLibraryComponent } from './color-library';
import { DropdownComponent } from './dropdown';
import { InfoboxComponent } from './infobox';
import { JumbotronComponent } from './jumbotron';
import { LoaderComponent } from './loader';
import { PaginationComponent } from './pagination';
import { PopoversComponent } from './popovers';
import { ProgressBarComponent } from './progress-bar';
import { SearchComponent } from './search';
import { TooltipsComponent } from './tooltips';
import { TreeviewComponent } from './treeview';
import { TypographyComponent } from './typography';

const routes: Routes = [
    { path: 'elements/alerts', component: AlertsComponent, title: 'Alerts | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/avatar', component: AvatarComponent, title: 'Avatar | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/badges', component: BadgesComponent, title: 'Badges | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/breadcrumbs', component: BreadcrumbsComponent, title: 'Breadcrumbs | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/buttons', component: ButtonsComponent, title: 'Buttons | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/buttons-group', component: ButtonsGroupComponent, title: 'Buttons Group | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/color-library', component: ColorLibraryComponent, title: 'Color Library | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/dropdown', component: DropdownComponent, title: 'Dropdown | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/infobox', component: InfoboxComponent, title: 'Infobox | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/jumbotron', component: JumbotronComponent, title: 'Jumbotron | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/loader', component: LoaderComponent, title: 'Loader | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/pagination', component: PaginationComponent, title: 'Pagination | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/popovers', component: PopoversComponent, title: 'Popovers | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/progress-bar', component: ProgressBarComponent, title: 'Progress Bar | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/search', component: SearchComponent, title: 'Search | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/tooltips', component: TooltipsComponent, title: 'Tooltips | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/treeview', component: TreeviewComponent, title: 'Treeview | HustleHub - Multipurpose Tailwind Dashboard Template' },
    { path: 'elements/typography', component: TypographyComponent, title: 'Typography | HustleHub - Multipurpose Tailwind Dashboard Template' },
];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, NgxTippyModule, MenuModule, IconModule],
    declarations: [
        AlertsComponent,
        AvatarComponent,
        BadgesComponent,
        BreadcrumbsComponent,
        ButtonsComponent,
        ButtonsGroupComponent,
        ColorLibraryComponent,
        DropdownComponent,
        InfoboxComponent,
        JumbotronComponent,
        LoaderComponent,
        PaginationComponent,
        PopoversComponent,
        ProgressBarComponent,
        SearchComponent,
        TooltipsComponent,
        TreeviewComponent,
        TypographyComponent,
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                languages: {
                    json: () => import('highlight.js/lib/languages/json'),
                    typescript: () => import('highlight.js/lib/languages/typescript'),
                    xml: () => import('highlight.js/lib/languages/xml'),
                },
            },
        },
    ],
})
export class ElementsModule {}
