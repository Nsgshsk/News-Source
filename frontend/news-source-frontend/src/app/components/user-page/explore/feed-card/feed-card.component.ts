import { Component, Input, OnInit } from '@angular/core';
import { FeedCard } from '../../../../models/FeedCard';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.css'
})
export class FeedCardComponent implements OnInit {
  @Input() feedCard!: FeedCard;
  @Input() form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
  }
}
