import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProdutosComponent} from "./produtos/produtos.component";
import {CadastroProdutoComponent} from "./cadastro-produto/cadastro-produto.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path:'cadastro-produto',component:CadastroProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
