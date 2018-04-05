import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component, Inject } from '@angular/core';

import { ApiService } from './services/ApiService';

@Component({
  selector: 'app-root',
  template: `root`,
})
export class AppComponent {
  constructor(
    private apiService: ApiService,  // 在部件的构造函数中声明可注入对象
  ) {
    this.apiService.get();
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
