import { Component, OnInit } from '@angular/core';
import { FeedCard } from '../../../models/FeedCard';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FeedCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  feedCardList?: FeedCard[];

  constructor(/* private articleCardService: ArticleCardService */) { }

  ngOnInit() {
    this.retriveFeedCardsTest();
  }

  retriveFeedCardsTest(): void {
    this.feedCardList = []
  }
}
