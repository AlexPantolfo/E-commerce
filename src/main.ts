import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { IconService } from './app/core/icon.module'; // Ajuste o caminho conforme necessário
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).then(appRef => {
  // Inicializa o IconService manualmente
  const injector = appRef.injector;
  injector.get(IconService);
});
