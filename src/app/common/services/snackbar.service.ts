import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private durationInSeconds: number = 3;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  openSnackBarSuccess(msg: string): MatSnackBarRef<any> {
    const _snackType = 'success';
    return this.snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { message: msg, snackType: _snackType, snackBar: this.snackBar }
    });
  }

  openSnackBarWarning(msg: string): MatSnackBarRef<any> {
    const _snackType = 'warning';
    return this.snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { message: msg, snackType: _snackType, snackBar: this.snackBar }
    });
  }

  openSnackBarError(msg: string): MatSnackBarRef<any> {
    const _snackType = 'error';
    return this.snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { message: msg, snackType: _snackType, snackBar: this.snackBar }
    });
  }
}
