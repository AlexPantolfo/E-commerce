import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { CardCategoriaComponent } from '../card-categoria/card-categoria.component';
import { CardProdutoComponent } from '../card-produto/card-produto.component';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, CardCategoriaComponent, CardProdutoComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
   /**
   * Lista original de itens (imagens, objetos, etc.).
   * Exemplo mínimo: { image: string, title: string }
   */
   @Input() items: any[] = [];

   /**
    * Quantos itens devem ser exibidos simultaneamente.
    */
   @Input() itemsPerView: number = 4;
 
   /**
    * Exibir (true) ou não (false) as setas de navegação.
    */
   @Input() showArrows: boolean = true;
 
   /**
    * Define se o carrossel é infinito (loop = true)
    * ou se chega ao fim e para (loop = false).
    */
   @Input() loop: boolean = false;
 
   /**
    * Array efetivo que o componente renderizará (pode ter duplicatas
    * se o array original for menor que itemsPerView).
    */
   public itemsToRender: any[] = [];
 
   /**
    * Índice do "primeiro item" atualmente visível.
    */
   public currentIndex: number = 0;
 
   /**
    * Referência ao track (faixa) que é deslocado via CSS transform.
    */
   @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef;
 
   // -------------- Variáveis para suporte a "arrastar/swipe" --------------
   private dragging = false;       // se está arrastando (mouse down / touch start)
   private startX = 0;            // posição X inicial do toque/arraste
   private currentTranslate = 0;   // deslocamento (transform) enquanto arrasta
   private prevTranslate = 0;      // deslocamento anterior (para calcular delta)
   private animationFrameId?: number;
 
   constructor(private renderer: Renderer2) {}
 
   ngOnInit(): void {
     // Se a lista de itens for menor que itemsPerView, replicar para preencher
     this.itemsToRender = this.replicateItemsIfNeeded(this.items, this.itemsPerView);
   }
 
   ngAfterViewInit(): void {
     // Ajusta a posição inicial (opcional).
     this.updateTrackPosition(0);
     // Assina eventos de pointer/touch no track para permitir arraste
     this.addDragListeners();
   }
 
   // ------------------- Navegação via botões -------------------
   /**
    * Avança 1 item no carrossel.
    */
   next(): void {
     if (!this.itemsToRender.length) return;
 
     if (this.loop) {
       this.currentIndex = (this.currentIndex + 1) % this.itemsToRender.length;
     } else {
       const maxIndex = this.itemsToRender.length - this.itemsPerView;
       if (this.currentIndex < maxIndex) {
         this.currentIndex++;
       }
     }
     this.updateTrackPosition(0);
   }
 
   /**
    * Volta 1 item no carrossel.
    */
   prev(): void {
     if (!this.itemsToRender.length) return;
 
     if (this.loop) {
       this.currentIndex =
         (this.currentIndex - 1 + this.itemsToRender.length) % this.itemsToRender.length;
     } else {
       if (this.currentIndex > 0) {
         this.currentIndex--;
       }
     }
     this.updateTrackPosition(0);
   }
 
   // ------------------- Suporte a arraste/swipe -------------------
   /**
    * Adiciona listeners de pointer/touch no track via Renderer2, 
    * para suportar drag no desktop e mobile.
    */
   private addDragListeners(): void {
     const trackEl = this.carouselTrack.nativeElement;
     // PointerDown (início do arraste)
     this.renderer.listen(trackEl, 'pointerdown', (event: PointerEvent) => {
       // Habilita “arraste”
       this.onDragStart(event);
     });
     // PointerUp/PointerCancel (fim do arraste)
     this.renderer.listen(trackEl, 'pointerup', (event: PointerEvent) => {
       this.onDragEnd(event);
     });
     this.renderer.listen(trackEl, 'pointercancel', (event: PointerEvent) => {
       this.onDragEnd(event);
     });
     // PointerMove (arrastando)
     this.renderer.listen(trackEl, 'pointermove', (event: PointerEvent) => {
       this.onDragMove(event);
     });
   }
 
   private onDragStart(event: PointerEvent) {
     // Evita “selecionar texto” ao arrastar
     event.preventDefault();
     this.dragging = true;
     this.startX = event.clientX;
     this.prevTranslate = this.getCurrentOffsetPercent();
   }
 
   private onDragMove(event: PointerEvent) {
     if (!this.dragging) return;
     // Calcula a distância arrastada
     const deltaX = event.clientX - this.startX;
     // Translacao em porcentagem, baseado na largura total do container
     // Precisamos saber quantos px correspondem a 100% do track. 
     // Uma forma simplificada: cada “card” = (100 / itemsPerView)%. 
     // Em vez de calcular px, faremos uma proporção relativa.
     const containerWidth = this.carouselTrack.nativeElement.offsetWidth;
     // deltaX/containerWidth -> fração do container
     // * 100 -> convertemos em %
     let movePercent = (deltaX / containerWidth) * 100;
     // soma ao offset anterior
     const nextTranslate = this.prevTranslate + movePercent;
     this.currentTranslate = nextTranslate;
     // Aplica o transform com base na currentTranslate
     this.applyTransform(this.currentTranslate);
   }
 
   private onDragEnd(event: PointerEvent) {
     if (!this.dragging) return;
     this.dragging = false;
 
     // Decidir se foi um swipe suficiente para avançar/voltar
     const movedBy = this.currentTranslate - this.getIndexOffsetPercent(this.currentIndex);
     // threshold - quão “arrastado” precisa ser para disparar a mudança
     const threshold = 10; // em %, ajuste como preferir
 
     if (movedBy < -threshold) {
       // arrastou para a esquerda -> next()
       this.next();
     } else if (movedBy > threshold) {
       // arrastou para a direita -> prev()
       this.prev();
     } else {
       // volta à posição atual
       this.updateTrackPosition(0);
     }
   }
 
   /**
    * Aplica `transform: translateX(...)` usando a porcentagem informada.
    */
   private applyTransform(percent: number) {
     if (!this.carouselTrack) return;
     this.carouselTrack.nativeElement.style.transform = `translateX(${percent}%)`;
   }
 
   /**
    * Retorna o deslocamento em % do carrossel,
    * baseado no currentIndex (quantos “cards” já andamos).
    */
   private getIndexOffsetPercent(index: number): number {
     // Cada card consome (100 / itemsPerView)% da largura
     return -(100 / this.itemsPerView) * index;
   }
 
   /**
    * Retorna o valor atual de transform (em %),
    * para sabermos onde está antes de arrastar.
    */
   private getCurrentOffsetPercent(): number {
     if (!this.carouselTrack) return 0;
     const style = window.getComputedStyle(this.carouselTrack.nativeElement);
     // matrix(a, b, c, d, tx, ty) -> precisamos converter 'tx' em px para % (relativo à width)
     const matrix = new WebKitCSSMatrix(style.transform);
     // tx em px
     const txPx = matrix.m41;
     const containerWidth = this.carouselTrack.nativeElement.offsetWidth;
     // converter px para %, txPx -> (txPx / containerWidth) * 100
     return (txPx / containerWidth) * 100;
   }
 
   // ------------------- Atualiza posição final no carrossel -------------------
   /**
    * Atualiza a posição (translateX) do track para mostrar
    * os itens a partir de currentIndex, somando um eventual “extraOffset” se quiser.
    */
   private updateTrackPosition(extraOffsetPercent: number = 0): void {
     const offsetPercent = this.getIndexOffsetPercent(this.currentIndex) + extraOffsetPercent;
     this.applyTransform(offsetPercent);
     this.currentTranslate = offsetPercent;
     this.prevTranslate = offsetPercent;
   }
 
   // ------------------- Replicação de itens (se houver poucos) -------------------
   /**
    * Duplica itens se houver menos do que `needed`.
    * Ex.: Se houver 1 item mas itemsPerView=4, cria 4 cópias do mesmo.
    */
   private replicateItemsIfNeeded(original: any[], needed: number): any[] {
     if (!original?.length) return [];
     if (original.length >= needed) {
       return [...original];
     }
     const result = [...original];
     while (result.length < needed) {
       for (const item of original) {
         if (result.length >= needed) break;
         result.push(item);
       }
     }
     return result;
   }
}
