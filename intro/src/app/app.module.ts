import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { NavComponent } from './nav/nav.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'matches', component: UserComponent },
  { path: '', redirectTo: 'matches', pathMatch: 'full' },
  { path: 'match/:matchID', component: UserComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    NavComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
