import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProdutosComponent} from "./produtos/produtos.component";
import {CadastroProdutoComponent} from "./cadastro-produto/cadastro-produto.component";
import {canActivate} from "./core/authGuard";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'produtos', component: ProdutosComponent},
  {
    path: 'cadastro-produto', component: CadastroProdutoComponent,
    canActivate: [canActivate], data: {
      role: ['admin']
    }
  },
  {
    path: 'cadastro-produto/:id', component: CadastroProdutoComponent,
    canActivate: [canActivate], data: {
      role: ['admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
