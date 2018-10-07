import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const authRoutes: Routes = [
    { path: 'creation-compte', component: SignupComponent},
    { path: 'connexion', component: SigninComponent},
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [ RouterModule ]
})
export class AuthRoutingModule {

}
