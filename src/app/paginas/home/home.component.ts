import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DietaService } from '../../servicos/dietaService/dieta.service';
import { HistoricoService } from '../../servicos/historicoService/historico.service';
import { HistoricoItem } from '../../modelos/historicoItem ';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dieta: any;
  nome: string = '';
  cpf: string = '';
  historico: HistoricoItem[] = [];
  dietaDisponivel: boolean = false;
  historicoDisponivel: boolean = false;

  constructor(
    private rota: Router,
    private dietaService: DietaService,
    private historicoService: HistoricoService
  ) {}

  formularioDieta = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[a-zA-Z ]+$/),
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/),
    ]),
  });

  criarPrompt(): void {
    if (this.formularioDieta.valid) {
      const nome = this.formularioDieta.get('nome')?.value;
      const cpf = this.formularioDieta.get('cpf')?.value;

      if (nome && cpf) {
        this.nome = nome;
        this.cpf = cpf;
        this.dietaService
          .criarPrompt({
            Nome: nome,
            Cpf: cpf,
          })
          .subscribe((dieta) => {
            this.dieta = dieta.resposta;
            this.dietaDisponivel = true;
            this.formularioDieta.reset();

            setTimeout(() => {
              const dietaSection = document.getElementById('dietaSection');
              if (dietaSection) {
                dietaSection.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          });
      }
    } else {
      this.formularioDieta.markAllAsTouched();
    }
  }

  openHistorico(cpf: any): void {
    this.historicoDisponivel = true;
    this.historicoService.getUserHistorico(cpf).subscribe((historicoData) => {
      this.historico = historicoData.map((item: any) => ({
        criadoEm: item.criadoEm,
        text: item.responseApiDTO.choice.text,
      })) as HistoricoItem[];
    });
  }

  closeHistorico(): void {
    this.historicoDisponivel = false;
    this.dietaDisponivel = false;
  }
}
