import { Component, Input } from '@angular/core';
import { FeedCard } from '../../../../models/FeedCard';

@Component({
  selector: 'app-feed-card',
  standalone: true,
  imports: [],
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.css'
})
export class FeedCardComponent {
  @Input() feedCard!: FeedCard;
}
