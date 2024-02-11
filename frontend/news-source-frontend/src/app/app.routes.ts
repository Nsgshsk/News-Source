import { Routes } from '@angular/router';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { HomeComponent } from './components/user-page/home/home.component';
import { ExploreComponent } from './components/user-page/explore/explore.component';
import { ProfileComponent } from './components/user-page/profile/profile.component';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';

export const routes: Routes = [
    {path: 'personal', redirectTo: 'personal/home', pathMatch: 'full'},
    { path: 'personal', 
    component: UserPageComponent,
    children: [
        { path: 'home', component: HomeComponent },
        { path: 'explore', component: ExploreComponent },
        { path: 'profile', component: ProfileComponent }
    ] },
    { path: 'login', component: LogInPageComponent },
    { path: '', component: ProductPageComponent , pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
