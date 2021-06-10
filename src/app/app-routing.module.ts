import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoadSampleComponent} from './components/load-sample/load-sample.component';
import {ClassifyImageComponent} from './components/classify-image/classify-image.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {StatisticsComponent} from './components/statistics/statistics.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'classify-image', component: ClassifyImageComponent},
  {path: 'load-sample', component: LoadSampleComponent},
  {path: 'classification-statistics', component: StatisticsComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
