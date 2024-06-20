import {Component, OnInit} from '@angular/core';
import {ProdutoService} from "../core/produto.service";
import {IProduto} from "../interfaces /IProduto";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {

  produtos: IProduto[] = [];

  constructor(private produtoService:ProdutoService) {
  }

  ngOnInit(){
    this.getProdutos();
  }

  private getProdutos() {
      this.produtoService.listar().subscribe((produtos:IProduto[])=>{
        console.log(produtos);
        this.produtos = produtos;

      })
  }
}
