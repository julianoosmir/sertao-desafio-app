import {Component, OnInit} from '@angular/core';
import {ProdutoService} from "../core/produto.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProdutoModel} from "../model/ProdutoModel";
import {AlertService} from "../core/alert.service";

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})
export class CadastroProdutoComponent implements OnInit {
  produtoForm: any;
  id: number;

  constructor(private produtoService: ProdutoService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.produtoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null, Validators.required],
      quantidade: ['', Validators.required],
      imagem: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.setFormProduto(this.id);
  }

  salvar() {
    if (this.produtoForm?.valid) {
      const produto = new ProdutoModel();
      produto.preco = this.produtoForm.controls['preco'].value;
      produto.descricao = this.produtoForm.controls['descricao'].value;
      produto.nome = this.produtoForm.controls['nome'].value;
      produto.quantidade = this.produtoForm.controls['quantidade'].value;
      produto.imagem = this.produtoForm.controls['imagem'].value;
      if (this.id && this.id !== 0) {
        produto.id = this.id
        this.produtoService.alterar(produto).subscribe({
          next: () => {
            this.alertService.showAlertSuccess("produto alterado com sucesso");
            this.router.navigate(['/produtos']);
          }, error: () => {
            this.alertService.showAlertDanger("erro ao alterar produto");
          }
        })
      } else {
        this.produtoService.salvar(produto).subscribe({
          next: () => {
            this.alertService.showAlertSuccess("produto salvo com sucesso");
            this.router.navigate(['/produtos']);

          }, error: () => {
            this.alertService.showAlertDanger("erro ao alterar produto");
          }
        })
      }

    }


  }

  private setFormProduto(id: number) {
    if (id && id !== 0) {
      this.produtoService.getById(id).subscribe(produto => {
        this.produtoForm.controls['nome'].setValue(produto.nome);
        this.produtoForm.controls['preco'].setValue(produto.preco);
        this.produtoForm.controls['imagem'].setValue(produto.imagem);
        this.produtoForm.controls['descricao'].setValue(produto.descricao);
        this.produtoForm.controls['quantidade'].setValue(produto.quantidade);
      })
    }
  }
}
