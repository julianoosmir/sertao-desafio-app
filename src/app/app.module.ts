import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProdutosComponent } from './produtos/produtos.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./core/token.interceptor";
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {DecimalPipe} from "@angular/common";
import {NgxCurrencyDirective} from "ngx-currency";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdutosComponent,
    CadastroProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxCurrencyDirective
  ],
  providers: [
    provideClientHydration(),
    provideNgxMask({ /* opções de cfg */ }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
