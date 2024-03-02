import { Component, OnInit } from '@angular/core';
import { FeedCard } from '../../../models/FeedCard';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { CommonModule } from '@angular/common';
import { FeedCardService } from '../../../services/feed-card/feed-card.service';
import { UserFeedCardComponent } from './user-feed-card/user-feed-card.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FeedCardComponent, UserFeedCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  feedsLoaded!: Promise<boolean>;
  feedCardList: FeedCard[] = [];
  userFeedsLoaded!: Promise<boolean>;
  userFeedCardList: FeedCard[] = [];

  constructor(private feedCardService: FeedCardService) {
  }

  ngOnInit() {
    this.retriveAllFeedCards();
    this.retriveUserFeedCards();
  }

  retriveAllFeedCards(): void {
    this.feedCardService.getAllFeeds().subscribe({
      next: data => {
        this.feedCardList = data;
        this.feedsLoaded = Promise.resolve(true);
      },
      error: error => {
        console.log(error);
        this.feedCardList = [];
        this.feedsLoaded = Promise.resolve(true);
      }
    })
  }

  retriveUserFeedCards(): void {
    this.feedCardService.getUserFeeds().subscribe({
      next: data => {
        this.userFeedCardList = data;
        this.userFeedsLoaded = Promise.resolve(true);
      },
      error: error => {
        console.log(error);
        this.userFeedCardList = [];
        this.userFeedsLoaded = Promise.resolve(true);
      }
    })
  }

  reload() {
    this.ngOnInit();
  }
}
