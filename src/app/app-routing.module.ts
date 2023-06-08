import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {MainComponent} from "./main/main.component";
import {LoginPageComponent} from "./login-page/login-page.component";

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'main', component: MainComponent},
  {path: '**', pathMatch: 'full', redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
