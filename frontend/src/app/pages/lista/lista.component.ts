// src/app/pages/lista/lista.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciaisService } from '../../services/policiais.service'; // Corrigido o caminho

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  policiais: any[] = [];
  feedback: string = '';

  constructor(private policiaisService: PoliciaisService) {}

  ngOnInit(): void {
    this.listarPoliciais();
  }

  listarPoliciais(): void {
    this.policiaisService.listarPoliciais().subscribe({
      next: (data) => {
        this.policiais = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        this.feedback = 'Erro ao carregar a lista de policiais.';
        setTimeout(() => (this.feedback = ''), 4000);
      },
    });
  }
}
