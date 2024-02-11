import { Component, Input } from '@angular/core';
import { ArticleCard } from '../../../../models/ArticleCard';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input() articleCard!: ArticleCard;
}
