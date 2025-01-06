import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-site-layout',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.scss'
})
export class SiteLayoutComponent {

}
