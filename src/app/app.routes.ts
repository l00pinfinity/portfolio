import { Routes } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

export const routes: Routes = [
    { path: '', component: PortfolioComponent, pathMatch: 'full'},
    { path: 'terms', component: TermsComponent, pathMatch: 'full' },
    { path: 'privacy', component: PrivacyComponent, pathMatch: 'full' }
];
