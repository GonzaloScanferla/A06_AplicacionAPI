import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { NewUserComponent } from './pages/new-user/newuser.component';
import { Error404Component } from './pages/error404/error404.component';
import { UpdateUserComponent } from './pages/update-user/updateuser.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
    { path: 'newuser', component: NewUserComponent },
    { path: 'updateuser', component: UpdateUserComponent },
    { path: 'users/:url', component: UserComponent}, 
    { path: '**', component: Error404Component }

];
