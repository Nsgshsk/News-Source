import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FeedCard } from '../../../models/FeedCard';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { CommonModule } from '@angular/common';
import { FeedCardService } from '../../../services/feed-card/feed-card.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FeedCardComponent, ReactiveFormsModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  addFeedFormGroup = new FormGroup({
    id: new FormControl(-1)
  });
  removeFeedFormGroup = new FormGroup({
    id: new FormControl(-1)
  });

    feedsLoaded!: Promise<boolean>;
    feedCardList: FeedCard[] = [];
    userFeedsLoaded!: Promise<boolean>;
    userFeedCardList: FeedCard[] = [];

    constructor(private feedCardService: FeedCardService) { }

    ngOnInit() {
        this.retriveAllFeedCards();
        this.retriveUserFeedCards();
    }

    retriveAllFeedCards(): void {
        this.feedCardService.getAllFeeds().subscribe(data => {
            this.feedCardList = data;
            this.feedsLoaded = Promise.resolve(true);
        })
    }

    retriveUserFeedCards(): void {
      this.feedCardService.getUserFeeds().subscribe(data => {
          this.userFeedCardList = data;
          this.userFeedsLoaded = Promise.resolve(true);
      })
  }

  removeFeed(){
    var id: number = this.removeFeedFormGroup.get('id')?.value || -1;
    this.feedCardService.removeUserFeed(id)
  }

  addFeed() {
    var id: number = this.removeFeedFormGroup.get('id')?.value || -1;
    this.feedCardService.addUserFeed(id)
  }
}
