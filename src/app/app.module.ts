import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  Component,
  Inject,
  ReflectiveInjector
} from '@angular/core';

import { ApiService } from './services/ApiService';
import { ViewPortService } from './services/ViewPortService';


@Component({
  selector: 'app-root',
  template: `
  <button (click)="invokeApi()">Invoke API</button>
  <button (click)="useInjectors()">Use Injectors</button>
  `,
})
// export class AppComponent {
//   constructor(
//     private apiService: ApiService,  // 1）在部件的构造函数中声明可注入对象
//   ) {
//     this.apiService.get();
//   }
// }
// export class AppComponent {
//   private apiService: ApiService;
//   constructor(
//     @Inject(ApiService) apiService: ApiService // 2）@Inject注解，注入
//   ) {
//     this.apiService = apiService;
//     this.apiService.get();
//   }
// }
export class AppComponent {
  constructor(
    private apiService: ApiService,
    @Inject('ApiServiceAlias') private aliasService: ApiService,  // 通过另一个令牌ApiServiceAlias，来使用既有服务ApiService
    @Inject('SizeService') private sizeService: any,
  ) { }
  invokeApi(): void {
    this.apiService.get();
    this.aliasService.get();
    this.sizeService.run();
  }
  useInjectors(): void {  // 随需创建注入器
    const injector: any = ReflectiveInjector.resolveAndCreate([
      ViewPortService,
      {
        provide: 'OtherSizeService',
        useFactory: (viewport: any) => {
          return viewport.determineService();
        },
        deps: [ViewPortService]
      }
    ]);
    const sizeService: any = injector.get('OtherSizeService');
    sizeService.run();
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
    ApiService,
    { provide: 'ApiServiceAlias', useExisting: ApiService }, // 通过另一个令牌ApiServiceAlias，来使用既有服务ApiService
    ViewPortService,
    {
      provide: 'SizeService',
      useFactory: (viewport: any) => {
        return viewport.determineService();
      },
      deps: [ViewPortService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
