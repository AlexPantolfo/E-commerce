import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconModule } from '../../../../core/icon.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, IconModule, MatBadgeModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public badgeCount = 3; 
  public categories: any[] = [
    {
      name: 'Categoria 1',
      subcategories: ['Subcategoria 1.1', 'Subcategoria 1.2'],
      showSubmenu: false,
    },
    {
      name: 'Categoria 2',
      subcategories: ['Subcategoria 2.1', 'Subcategoria 2.2'],
      showSubmenu: false,
    },
    {
      name: 'Categoria 3',
      subcategories: ['Subcategoria 3.1', 'Subcategoria 3.2'],
      showSubmenu: false,
    },
  ];

  toggleSubmenu(category: any, show: boolean) {
    category.showSubmenu = show;
  }
}
