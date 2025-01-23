import { Routes } from '@angular/router';
import { MonsterListComponent } from './pages/monster-list/monster-list.component';
import { MonsterComponent } from './pages/monster/monster.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';

export const routes: Routes = [
    // redridige la page de base vers home
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },{
        path:'login',
        component:LoginComponent
    },
    {
        path:'home',
        component:MonsterListComponent,
        canActivate: [isLoggedInGuard]
    },{
        path: 'monster',
        children: [{
            path: '',
            component: MonsterComponent,
            canActivate: [isLoggedInGuard]
        }, {
            path: ':id',
            component: MonsterComponent,
            canActivate: [isLoggedInGuard]
        }]
    },
    //redirige toutes les pages non routés vers not found
    {
        path:'**',
        component:NotFoundComponent
    }
];
