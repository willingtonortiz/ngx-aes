import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'first',
    loadChildren: () =>
      import('./modules/first/first.module').then((m) => m.FirstModule),
  },
  {
    path: 'second',
    loadChildren: () =>
      import('./modules/second/second.module').then((m) => m.SecondModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
