import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  styleChange(){
    if(this.data.snackType == 'success') {
      return 'successStyle';
    }
    else if (this.data.snackType == 'warning') {
      return 'warningStyle';
    } else {
      return 'erroStyle';
    }
  }

  get getIcon() {
    switch (this.data.snackType) {
      case 'success':
        return { type: this.data.snackType };
      case 'error':
        return { type: this.data.snackType };
      case 'warning':
        return { type: this.data.snackType };

      default:
        return { type: this.data.snackType };
    }
  }

  closeSnackbar() {
    return this.data.snackBar.dismiss();
  }
}
