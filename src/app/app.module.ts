import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutComponent } from "./layout/layout.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LayoutComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    LayoutComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
