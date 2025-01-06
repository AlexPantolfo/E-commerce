import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public getUser() {
    return JSON.parse(sessionStorage.getItem('userInfo'))
  }

  public setUser(userInfo) {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
  }

  public getPlano() {
    const user = this.getUser();
    const plano = !!user.tb_user_subscription ? user.tb_user_subscription : undefined;
    return plano
  }

  public setPlano(planoNovo) {
    let plano = JSON.parse(sessionStorage.getItem('userInfo'))
    plano.tb_user_subscription = planoNovo
    sessionStorage.setItem('userInfo', JSON.stringify(plano))
  }

  public setEnderecoUser(enderecoNovo) {
    let endereco = JSON.parse(sessionStorage.getItem('userInfo'))
    endereco.Endereco = enderecoNovo;
    sessionStorage.setItem('userInfo', JSON.stringify(endereco))
  }


  public getTokenJwt() {
    return sessionStorage.getItem('tokenJwt')
  }

  public setTokenJwt(novoToken) {
    sessionStorage.setItem('tokenJwt', novoToken)
  }


  clickImprime(file: any) {

    if (!!file.type) {
      let blob = new Blob([file], { type: file.type });
      let url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      // this.consultaSolicitacaoService.downloadAnexo(file.lastModified).subscribe({
      //   error: (err) => { console.log('Erro: ', err) },
      //   next: (rs: any) => {
      //     let url = URL.createObjectURL(this.b64toBlob(rs.objeto.arquivo, rs.objeto.typeAnexo));
      //     const link = document.createElement('a');
      //     link.href = url;
      //     link.setAttribute('download', file.name);
      //     document.body.appendChild(link);
      //     link.click();
      //     link.remove();
      //   },
      // })
    }

  }

  public isTelefone(numeroTelefone: string): boolean {
    return !!numeroTelefone &&
      numeroTelefone?.length >= 12 &&
      (numeroTelefone.match(".((10)|([1-9][1-9]).)[2-5][0-9]{3}-[0-9]{4}"))
      ? true
      : false;
  }

  public isCelular(numeroTelefone: string): boolean {
    return !!numeroTelefone &&
      numeroTelefone?.length >= 13 &&
      (numeroTelefone.match(".((10)|([1-9][1-9]).)9[1-9][0-9]{3}-[0-9]{4}"))
      ? true
      : false;
  }

  /**
   * Preenche um número com zeros até possuir N dígitos.
   *
   * @param num número pra ser preenchido com zeros
   * @param digits dígitos que o número será preenchido até ter
   * @returns o número preenchido
   */
  public padNDigits(num: number, digits: number): string {
    return num.toString().padStart(digits, '0');
  }


  /**
   * Formata data para exibição
   *
   * @param data Data no formato date vindo do banco
   * @returns objeto de data formatado em string
   */
  formataData(param: Date): String {
    return formatDate(param, 'dd/MM/yyyy', 'en_US.UTF-8', 'GMT-0300');
  }


  /**
   * Formata a moeda para exibição
   *
   * @param valor Valor no formato decimal vindo do banco
   * @returns objeto de valor formatado em string
   */
  formataMoeda(valor: any): string {
    let valorFloat = Number.parseFloat(valor);
    let valorFormatado = valorFloat.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    return `R$ ` + valorFormatado;
  }

  /**
   * Transforma BLOB em FILE
   * @param File arquivo
   *
   * @return FILE
   */
  blobToFile(file: any) {
    let arrayOfBlob = new Array<Blob>();
    let arquivo: File;

    arrayOfBlob = [];
    arrayOfBlob.push(this.transformaEmBlob(file));
    arquivo = new File(arrayOfBlob, 'arquivo.csv', { type: 'text/plain' });

    return arquivo;
  }

  /**
   * Transforma em BLOB
   * @param File arquivo
   *
   * @return BLOB
   */
  transformaEmBlob(file: any) {
    const contentType = 'text/plain';
    const b64Data = file;
    const blob = this.b64toBlob(b64Data, contentType);

    return blob;
  }

  /**
   * Transforma Base64 em BLOB
   * @param Base64 dados base 64
   * @param contentType tipagem do conteúdo
   *
   * @return BLOB
   */
  b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
