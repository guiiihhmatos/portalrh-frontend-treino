import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { ServidorService } from 'src/app/services/declaracao/servidor/servidor.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent {

  servidorPassed : any
  servidor : FormGroup

  nomeServidor = ''

  objServidor : any

  constructor
  (
    private formBuilder : FormBuilder,
    private location : Location,
    private declaracaoService : ServidorService
  )
  {
    this.servidorPassed = history.state.data;

    this.servidor = this.formBuilder.group({

      id: [null, [Validators.required]],
      matricula: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      secretaria: [null, [Validators.required]],
      localTrabalho: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      exercicio: [null, [Validators.required]],
      dtAtualizacao: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      retificacoes: [null, [Validators.required]],

    })

  }

  ngOnInit(): void {

    this.declaracaoService.getAllServidoresByID(this.servidorPassed.id).subscribe(res => {

      this.objServidor = res
      this.nomeServidor = res.nome
      this.onSetValue()

    })

  }

  onSetValue()
  {

    let date = new DatePipe('en-US')

    this.servidor.patchValue({

      id: this.objServidor.id,
      matricula: this.objServidor.matricula,
      cpf: this.objServidor.cpf,
      nome: this.objServidor.nome,
      email: this.objServidor.email,
      secretaria: this.objServidor.secretaria,
      localTrabalho: this.objServidor.localTrabalho,
      cargo: this.objServidor.carro,
      exercicio: this.objServidor.exercicio,
      dtAtualizacao: date.transform(this.objServidor.dtAtualizacao, 'dd/MM/yyyy'),
      tipo: this.objServidor.tipo,
      retificacoes: this.objServidor.retificacoes > 0? this.objServidor.retificacoes : "Nenhuma Retificação",

    })

  }

  backUrl()
  {
    this.location.back()
  }
}
