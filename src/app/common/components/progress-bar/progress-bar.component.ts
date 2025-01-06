import { Component } from '@angular/core';
import { LoadingService } from '../../services/loadingService.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <mat-progress-bar
      *ngIf="isLoading | async"
      mode="indeterminate" color="accent"
    ></mat-progress-bar>
  `,
  styles: [
    `
      mat-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
      }
      .mat-mdc-progress-bar.mat-accent {
        --mdc-linear-progress-active-indicator-color: #80B6B5;
        border-radius: 5px;
      }
    `,
  ],
})
export class ProgressBarComponent {
  isLoading: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.isLoading = this.loadingService.loading$;
  }
}
