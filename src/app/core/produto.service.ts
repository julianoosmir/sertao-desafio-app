import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProduto} from "../interfaces /IProduto";
import {URL_PRODUTO} from "../contants/api";
import {ProdutoModel} from "../model/ProdutoModel";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  listar(): Observable<IProduto[]>{
    return this.http.get<IProduto[]>(URL_PRODUTO);
  }
  getById(id: number): Observable<IProduto> {
    return this.http.get<IProduto>(URL_PRODUTO + '/' + id);
  }
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(URL_PRODUTO + '/' + id);
  }
  salvar(produto: ProdutoModel){
    return this.http.post(URL_PRODUTO,produto)
  }
  alterar(produto: ProdutoModel){
    return this.http.put(URL_PRODUTO,produto)
  }
}
