import { Component, OnInit } from '@angular/core';
import { ArticleCardComponent } from "./article-card/article-card.component";
import { ArticleCard } from '../../../models/ArticleCard';
import { CommonModule } from '@angular/common';
import { ArticleCardService } from '../../../services/article-card/article-card.service';
import { resolve } from 'path';
import { error } from 'console';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ArticleCardComponent, CommonModule],
})
export class HomeComponent implements OnInit {
    articlesLoaded!: Promise<boolean>;
    articleCardList: ArticleCard[] = [];

    constructor(private articleCardService: ArticleCardService) {
        this.retriveArticleCards();
    }

    ngOnInit() {

    }

    retriveArticleCards(): void {
        this.articleCardService.getAll().subscribe({
            next: data => {
                this.articleCardList = data;
                this.articlesLoaded = Promise.resolve(true);
            },
            error: error => {
                console.log(error);
                this.articleCardList = [];
                this.articlesLoaded = Promise.resolve(true);
            }
        });
    }
}
