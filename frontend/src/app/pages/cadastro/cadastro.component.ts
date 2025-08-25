// src/app/pages/cadastro/cadastro.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoliciaisService } from '../../services/policiais.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  policial = {
    rg_civil: '',
    rg_militar: '',
    cpf: '',
    data_nascimento: '',
    matricula: '',
  };
  feedback: string = '';
  feedbackClass: string = '';

  constructor(private policiaisService: PoliciaisService) {}

  onSubmit() {
    this.policiaisService.cadastrarPolicial(this.policial).subscribe({
      next: (res) => {
        this.feedback = 'Policial cadastrado com sucesso!';
        this.feedbackClass = 'success';
        this.policial = {
          rg_civil: '',
          rg_militar: '',
          cpf: '',
          data_nascimento: '',
          matricula: '',
        };
        setTimeout(() => {
          this.feedback = '';
          this.feedbackClass = '';
        }, 3000);
      },
      error: (err) => {
        this.feedback =
          err?.error?.error ||
          'Erro ao cadastrar policial. Verifique a conexão com o servidor.';
        this.feedbackClass = 'error';
        setTimeout(() => {
          this.feedback = '';
          this.feedbackClass = '';
        }, 4000);
      },
    });
  }
}
