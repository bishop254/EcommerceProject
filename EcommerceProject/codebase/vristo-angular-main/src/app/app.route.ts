import { Routes } from '@angular/router';

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

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';
import { SellersLandingPage } from './pages/sellers/sellers-landing-page/sellers-landing-page';
import { DefaultLandingPage } from './pages/default-landing-page/default-landing-page';
import { AddProductComponent } from './pages/sellers/add-product/add-product';
import { EditProductComponent } from './pages/sellers/edit-product/edit-product';
import { BuyersLandingPage } from './pages/buyers/buyers-landing-page/buyers-landing-page';
import { BuyProductComponent } from './pages/buyers/buy-product/buy-product';
import { SellersProfileComponent } from './pages/sellers/sellers-profile/sellers-profile';
import { SellerAccountSettingsComponent } from './pages/sellers/sellers-profile/seller-account-settings';
import { OrderSummaryComponent } from './pages/buyers/order-summary/order-summary';
// import { SellerAccountSettingsComponent } from './pages/sellers/sellers-profile/user-account-settings';

export const routes: Routes = [
    {
        path: '',
        component: DefaultLandingPage,
    },

    { path: 'sellers-account-settings-page', component: SellerAccountSettingsComponent, title: 'Sellers Account Settings Page | HustleHub' },
    { path: 'sellers-profile-page', component: SellersProfileComponent, title: 'Sellers Profile Page | HustleHub' },
    { path: 'sellers-landing-page', component: SellersLandingPage, title: 'Sellers Landing Page | HustleHub' },
    { path: 'buyers-landing-page', component: BuyersLandingPage, title: 'Buyers Landing Page | HustleHub' },
    { path: 'add-product-page', component: AddProductComponent, title: 'Add Product Page | HustleHub' },
    { path: 'edit-product-page/:id', component: EditProductComponent, title: 'Add Product Page | HustleHub' },
    { path: 'buy-product-page/:id', component: BuyProductComponent, title: 'Buy Product Page | HustleHub' },
    { path: 'order-summary-page', component: OrderSummaryComponent, title: 'Order Summary Page | HustleHub' },


    {
        path: '',
        component: AppLayout,
        children: [
            // dashboard

            { path: '', component: IndexComponent, title: 'Sales Admin | HustleHub - Multipurpose Tailwind Dashboard Template' },
            { path: 'analytics', component: AnalyticsComponent, title: 'Analytics Admin | HustleHub - Multipurpose Tailwind Dashboard Template' },
            { path: 'finance', component: FinanceComponent, title: 'Finance Admin | HustleHub - Multipurpose Tailwind Dashboard Template' },
            { path: 'crypto', component: CryptoComponent, title: 'Crypto Admin | HustleHub - Multipurpose Tailwind Dashboard Template' },

            //apps
            { path: '', loadChildren: () => import('./apps/apps.module').then((d) => d.AppsModule) },

            // widgets
            { path: 'widgets', component: WidgetsComponent, title: 'Widgets | HustleHub - Multipurpose Tailwind Dashboard Template' },

            // components
            { path: '', loadChildren: () => import('./components/components.module').then((d) => d.ComponentsModule) },

            // elements
            { path: '', loadChildren: () => import('./elements/elements.module').then((d) => d.ElementsModule) },

            // forms
            { path: '', loadChildren: () => import('./forms/form.module').then((d) => d.FormModule) },

            // users
            { path: '', loadChildren: () => import('./users/user.module').then((d) => d.UsersModule) },

            // tables
            { path: 'tables', component: TablesComponent, title: 'Tables | HustleHub - Multipurpose Tailwind Dashboard Template' },
            { path: '', loadChildren: () => import('./datatables/datatables.module').then((d) => d.DatatablesModule) },

            // font-icons
            { path: 'font-icons', component: FontIconsComponent, title: 'Font Icons | HustleHub - Multipurpose Tailwind Dashboard Template' },

            // charts
            { path: 'charts', component: ChartsComponent, title: 'Charts | HustleHub - Multipurpose Tailwind Dashboard Template' },

            // dragndrop
            { path: 'dragndrop', component: DragndropComponent, title: 'Dragndrop | HustleHub - Multipurpose Tailwind Dashboard Template' },

            // pages
            { path: 'pages/knowledge-base', component: KnowledgeBaseComponent, title: 'Knowledge Base | HustleHub - Multipurpose Tailwind Dashboard Template' },
            { path: 'pages/default-landing-page', component: DefaultLandingPage, title: 'Default Landing Page | HustleHub' },
            { path: 'pages/faq', component: FaqComponent, title: 'FAQ | HustleHub - Multipurpose Tailwind Dashboard Template' },
        ],
    },

    {
        path: '',
        component: AuthLayout,
        children: [
            // pages
            { path: '', loadChildren: () => import('./pages/pages.module').then((d) => d.PagesModule) },

            // auth
            { path: '', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
        ],
    },
];
