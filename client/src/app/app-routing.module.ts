import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarsComponent } from './cars/cars.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {path:'', redirectTo:'homepage', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'navbar', component:NavbarComponent},
  {path:'about', component:AboutUsComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'cars', component:CarsComponent},
  {path:'homepage', component:HomepageComponent},
  {path:'location', component:LocationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
