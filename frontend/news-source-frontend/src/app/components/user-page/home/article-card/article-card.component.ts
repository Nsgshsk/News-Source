import { AfterViewInit, Component, Input } from '@angular/core';
import { ArticleCard } from '../../../../models/ArticleCard';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { resolve } from 'path';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [LazyLoadImageModule, CommonModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent implements AfterViewInit{
  @Input() articleCard!: ArticleCard;
  ready!: Promise<boolean>;

  ngAfterViewInit(): void {
      this.ready = Promise.resolve(true);
  }
}
