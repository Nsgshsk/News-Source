import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FeedCard } from '../../../../models/FeedCard';
import { FeedCardService } from '../../../../services/feed-card/feed-card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-feed-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-feed-card.component.html',
  styleUrl: './user-feed-card.component.css'
})
export class UserFeedCardComponent implements AfterViewInit {
  @Input() userFeedCard!: FeedCard;
  ready!: Promise<boolean>;
  @Output() reload = new EventEmitter();

  constructor(private feedCardService: FeedCardService) {}

  ngAfterViewInit(): void {
      this.ready = Promise.resolve(true);
  }

  removeFeed(id: number){
    this.feedCardService.removeUserFeed(id);
    this.reload.emit();
  }
}
