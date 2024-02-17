import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeTogglerComponent } from "./components/theme-toggler/theme-toggler.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, 
      RouterOutlet, 
      ThemeTogglerComponent,
      HttpClientModule]
})
export class AppComponent {
  title = 'news-source-frontend';
}
