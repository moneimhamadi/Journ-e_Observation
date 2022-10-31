import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfaceDeuxComponent } from './interface-deux/interface-deux.component';
import { InterfaceOneComponent } from './interface-one/interface-one.component';

const routes: Routes = [
  { path: 'modifier-profil', component: InterfaceOneComponent },
  { path: 'mes-enfants', component: InterfaceDeuxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
