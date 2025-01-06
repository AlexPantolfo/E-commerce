import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  public imagemNotFound: any[] = [];
  public loading: boolean = false;


  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  redirectHome() {
    this.router.navigateByUrl('/home')
  }


}
