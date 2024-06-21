import {Component, OnInit} from '@angular/core';
import {ProdutoService} from "../core/produto.service";
import {IProduto} from "../interfaces /IProduto";
import {AuthService} from "../core/auth.service";
import {AlertService} from "../core/alert.service";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {

  produtos: IProduto[] = [];

  constructor(private produtoService: ProdutoService, private authservice: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getProdutos();
  }

  private getProdutos() {
    this.produtoService.listar().subscribe({
      next: (produtos: IProduto[]) => {
        this.produtos = produtos;
      }, error: () => {
        this.alertService.showAlertDanger("erro ao listar produtos");
      }
    })
  }

  getRole() {
    return this.authservice.getRole();
  }

  deletar(id: number) {
    this.produtoService.deletar(id).subscribe({
      next: () => {
        this.getProdutos();
        this.alertService.showAlertSuccess("produto deletado com sucesso");

      },error:()=>{
        this.alertService.showAlertDanger("erro ao deletar produto");
      }
    })
  }
}
