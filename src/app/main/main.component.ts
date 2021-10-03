import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from '../models';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public sort: string ='';
  public games: Array<Game> = [];
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService.getGameList(sort, search).subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
    });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details',id]);
  }

  ngOnDestroy(): void {
    if(this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if(this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
