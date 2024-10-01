import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutComponent } from "./layout/layout.component";
import { HttpClientModule } from '@angular/common/http';
import { provideQuillConfig } from 'ngx-quill';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


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
    LayoutComponent,
    HttpClientModule,
    // CKEditorModule
  ],
  providers: [
    provideQuillConfig({
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          ['bold', 'italic', 'underline', 'strike'],
          ['code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],

          // [{ 'size': ['small', false, 'large', 'huge'] }],

          [{ 'align': [] }],
          ['link', 'image'],
        ]
      },
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
