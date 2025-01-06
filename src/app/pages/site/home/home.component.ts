import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselComponent } from '../../../common/components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  listaTextos = [
    '⚡Spring Clearance Event: Save Up to 70%',
    '⚡Novidades em destaque: confira já!'
  ];

  carouselItems = [
    { image: 'assets/images/img-carrossel-1.webp', title: 'Tops' },
    { image: 'assets/images/img-carrossel-2.webp', title: 'Tops2' },
    { image: 'assets/images/img-carrossel-2.webp', title: 'Tops3' },
    { image: 'assets/images/img-carrossel-2.webp', title: 'Tops4' },
    { image: 'assets/images/img-carrossel-2.webp', title: 'Tops5' },
  ];
}
