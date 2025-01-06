import { Injectable, NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    console.log('IconService inicializado');
    this.registerIcons();
  }

  private registerIcons(): void {
    // Lista de ícones que você quer registrar
    const icons = [
        { name: 'lupa', path: 'assets/icons/lupa-icone.svg' },
        { name: 'favorite', path: 'assets/icons/favorite-icone.svg' },
        { name: 'person', path: 'assets/icons/person-icone.svg' },
        { name: 'shopping_bag', path: 'assets/icons/shopping_bag-icone.svg' },
      ];
      

    icons.forEach(icon => {
        console.log(`Registrando ícone: ${icon.name} - ${icon.path}`);
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }
}

@NgModule({
  imports: [MatIconModule],
  exports: [MatIconModule],
})
export class IconModule {}
