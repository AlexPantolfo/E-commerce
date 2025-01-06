import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEscolhaComponent } from '../components/modal-escolha/modal-escolha.component';
import { ModalComentarioComponent } from '../components/modal-comentario/modal-comentario.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ModalReviewsComponent } from '../components/modal-reviews/modal-reviews.component';
import { ModalTelComponent } from '../components/modal-tel/modal-tel.component';
import { ModalReportComponent } from '../components/modal-report/modal-report.component';
import { ModalServicosComponent } from '../components/modal-servicos/modal-servicos.component';
import { ModalVagaComponent } from '../components/modal-vaga/modal-vaga.component';
import { ModalCancelamentoComponent } from '../components/modal-cancelamento/modal-cancelamento.component';
import { ModalDeleteComponent } from '../components/modal-delete/modal-delete.component';
import { ModalPropostaComponent } from '../components/modal-proposta/modal-proposta.component';
import { ModalSuspensaoComponent } from 'src/app/pages/admin/components/modal-suspensao/modal-suspensao.component';
import { ModalExclusaoAdminComponent } from 'src/app/pages/admin/components/modal-exclusao-admin/modal-exclusao-admin.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public dialog: MatDialog,
  ) { }

  public openDialog() {
    return this.dialog.open(ModalEscolhaComponent);
  }

  public openComentario(baba) {
    return this.dialog.open(ModalComentarioComponent, {
      data: {
        baba
      }
    });
  }

  public openSuspensao(user) {
    return this.dialog.open(ModalSuspensaoComponent, {
      data: {
        user
      }
    });
  }

  public openExclusaoAdmin(UserID, Nome, Sobrenome) {
    return this.dialog.open(ModalExclusaoAdminComponent, {
      data: {
        UserID,
        Nome,
        Sobrenome,
      }
    });
  }

  public openTel(user) {
    return this.dialog.open(ModalTelComponent, {
      data: {
        Telefone: user.tb_user[0].Telefone,
        Email: user.tb_user[0].Email,
        whatsapp: user.whatsapp,
      }
    });
  }

  public openDelete(UserID) {
    return this.dialog.open(ModalDeleteComponent)
  }

  public openReview(baba) {
    return this.dialog.open(ModalReviewsComponent, {
      data: {
        baba
      }
    });
  }

  public openReport(UserID) {
    return this.dialog.open(ModalReportComponent, {
      data: {
        UserID: UserID,
      }
    })
  }

  public openServicos(vaga) {
    return this.dialog.open(ModalServicosComponent, {
      data: {
        VagaID: vaga,
      }
    })
  }

  public openCancel(vaga) {
    return this.dialog.open(ModalCancelamentoComponent, {
      data: {
        VagaID: vaga,
      }
    })
  }

  public openDialogGenerico(component: any, dados: any = undefined) {
    return this.dialog.open(component, {
      data: dados
    });
  }

  public openVaga() {
    return this.dialog.open(ModalVagaComponent)
  }

  public openProposta(baba) {
    return this.dialog.open(ModalPropostaComponent, {
      data: {
        baba
      }
    });
  }
}
