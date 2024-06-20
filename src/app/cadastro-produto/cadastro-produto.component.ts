import { Component } from '@angular/core';
import {ProdutoService} from "../core/produto.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DecimalPipe} from "@angular/common";
import {ProdutoModel} from "../model/ProdutoModel";

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})
export class CadastroProdutoComponent {
  produtoForm: any;

  constructor(private produtoService: ProdutoService,
              // private alertService: AlertService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private decimal :DecimalPipe) {
    this.produtoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null, Validators.required],
      quantidade: ['', Validators.required],
      imagem: ['', Validators.required],
    });

    console.log(decimal.transform('10.00','1.2-2'))
  }

  salvar() {
    if (this.produtoForm?.valid){
      const produto = new ProdutoModel();
      produto.preco = this.produtoForm.controls['preco'].value;
      produto.descricao =  this.produtoForm.controls['descricao'].value;
      produto.nome = this.produtoForm.controls['nome'].value;
      produto.quantidade = this.produtoForm.controls['quantidade'].value;
      produto.imagem = this.produtoForm.controls['imagem'].value;
      this.produtoService.salvar(produto).subscribe(()=>{
        this.router.navigate(['/produtos']);
      })
    }


  }
}
