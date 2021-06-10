import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgpImagePickerModule} from 'ngp-image-picker';
import {AppComponent} from './app.component';
import {ArraySortPipe} from './pipes/array-sort.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ClassifyImageComponent} from './components/classify-image/classify-image.component';
import {LoadSampleComponent} from './components/load-sample/load-sample.component';
import {ProfileComponent} from './components/profile/profile.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    ArraySortPipe,
    HeaderComponent,
    FooterComponent,
    ClassifyImageComponent,
    LoadSampleComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgpImagePickerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
