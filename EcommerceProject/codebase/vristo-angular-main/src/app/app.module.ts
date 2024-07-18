import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Routes
import { routes } from './app.route';

import { AppComponent } from './app.component';

// service
import { AppService } from './service/app.service';

// store
import { StoreModule } from '@ngrx/store';
import { indexReducer } from './store/index.reducer';
import { authReducer } from './store/Auth/auth.reducer';

// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// perfect-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// apexchart
import { NgApexchartsModule } from 'ng-apexcharts';

// highlightjs
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

// tippy
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// headlessui
import { MenuModule } from 'headlessui-angular';

// modal
import { ModalModule } from 'angular-custom-modal';

// sortable
import { SortablejsModule } from '@dustfoundation/ngx-sortablejs';

// quill editor
import { QuillModule } from 'ngx-quill';

// dashboard
import { IndexComponent } from './index';
import { AnalyticsComponent } from './analytics';
import { FinanceComponent } from './finance';
import { CryptoComponent } from './crypto';

// widgets
import { WidgetsComponent } from './widgets';

// tables
import { TablesComponent } from './tables';

// font-icons
import { FontIconsComponent } from './font-icons';

// charts
import { ChartsComponent } from './charts';

// dragndrop
import { DragndropComponent } from './dragndrop';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';

// Layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

import { HeaderComponent } from './layouts/header';
import { FooterComponent } from './layouts/footer';
import { SidebarComponent } from './layouts/sidebar';
import { ThemeCustomizerComponent } from './layouts/theme-customizer';
import { IconModule } from './shared/icon/icon.module';
import { CustomHeaderComponent } from './layouts/custom-header';
import { DefaultLandingPage } from './pages/default-landing-page/default-landing-page';
import { SellersLandingPage } from './pages/sellers/sellers-landing-page/sellers-landing-page';
import { AddProductComponent } from './pages/sellers/add-product/add-product';
import { BuyersLandingPage } from './pages/buyers/buyers-landing-page/buyers-landing-page';
import { BuyProductComponent } from './pages/buyers/buy-product/buy-product';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import { SellersProfileComponent } from './pages/sellers/sellers-profile/sellers-profile';
import { CustomFooterComponent } from './layouts/custom-footer';
import { SellerAccountSettingsComponent } from './pages/sellers/sellers-profile/seller-account-settings';
import { MyProductsPage } from './pages/sellers/my-products-seller/my-products-page';
import { OrderSummaryComponent } from './pages/buyers/order-summary/order-summary';
import { LightboxModule } from 'ngx-lightbox';
import { EditProductComponent } from './pages/sellers/edit-product/edit-product';
import { CartService } from './service/cart.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        BrowserModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
        MenuModule,
        StoreModule.forRoot({ index: indexReducer, auth: authReducer }),
        NgxTippyModule,
        NgbModule,
        NgApexchartsModule,
        NgScrollbarModule.withConfig({
            visibility: 'hover',
            appearance: 'standard'
        }),
        HighlightModule,
        SortablejsModule,
        ModalModule,
        QuillModule.forRoot(),
        IconModule,
        LightboxModule,
        NgxNumberSpinnerModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        CustomHeaderComponent,
        CustomFooterComponent,
        FooterComponent,
        SidebarComponent,
        ThemeCustomizerComponent,
        TablesComponent,
        FontIconsComponent,
        ChartsComponent,
        IndexComponent,
        AnalyticsComponent,
        FinanceComponent,
        CryptoComponent,
        WidgetsComponent,
        DragndropComponent,
        AppLayout,
        AuthLayout,
        KnowledgeBaseComponent,
        DefaultLandingPage,
        SellersLandingPage,
        BuyersLandingPage,
        AddProductComponent,
        EditProductComponent,
        BuyProductComponent,
        OrderSummaryComponent,
        SellersProfileComponent,
        SellerAccountSettingsComponent,
        FaqComponent,
        MyProductsPage,
        ConfirmDialogComponent
    ],

    providers: [
        AppService,
        CartService,
        Title,
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
    bootstrap: [AppComponent],
})
export class AppModule {}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
