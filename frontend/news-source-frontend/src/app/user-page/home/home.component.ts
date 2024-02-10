import { Component } from '@angular/core';
import { ArticleCardComponent } from "./article-card/article-card.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ArticleCardComponent]
})
export class HomeComponent {

}
