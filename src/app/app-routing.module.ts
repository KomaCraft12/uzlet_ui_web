import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CassaComponent } from './cassa/cassa.component';

const routes: Routes = [
  { path: 'cassa', component: CassaComponent },
  { path: "admin", loadChildren: () => import('./ADMIN/admin.module').then(m => m.AdminModule) },
  { path: '', redirectTo: '/cassa', pathMatch: 'full' },
  { path: '**', redirectTo: '/cassa' } // Minden más útvonal átirányítása
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }