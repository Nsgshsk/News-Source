import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FeedCard } from '../../../../models/FeedCard';
import { FeedCardService } from '../../../../services/feed-card/feed-card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.css'
})
export class FeedCardComponent implements AfterViewInit {
  @Input() feedCard!: FeedCard;
  ready!: Promise<boolean>;
  @Output() reload = new EventEmitter();

  constructor(private feedCardService: FeedCardService) {}

  ngAfterViewInit(): void {
      this.ready = Promise.resolve(true);
  }

  addFeed(id: number) {
    this.feedCardService.addUserFeed(id);
    this.reload.emit();
  }
}
