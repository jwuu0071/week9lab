import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private dbService:DatabaseService) { }

  ngOnInit(): void {
    this.onGetMovies;
  }
  moviesDB: any[] = [];
  actorsDB: any[] = [];
  fullName: string = '';
  section = 1;
  title:string=""
  year:number=0
  actors: any[] = [];
  movies: any[] = [];
  bYear: number = 0;
  movieId: string = '';
  actorId: string='';
  year1 = 0;
  year2 = 0;

  changeSection(sectionId:number) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });
  }
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  onDeleteMovieByTitle(){
    this.dbService.deleteMovieByTitle(this.title).subscribe(result =>{
      this.onGetMovies();
      this.resetValues();
    })
  }
  onDeleteMovieBetweenYear(){
    this.dbService.deleteMovieBetweenYear(this.year1,this.year2).subscribe(res=>{
      this.onGetMovies()
    })
  }
  onAddActorToMovie() {
    this.dbService.addActorToMovie(this.actorId, this.movieId).subscribe((result) => {
        this.onGetMovies();
      });
  }
  onSelectMovie(item:any){
    this.title = item.title
    this.year = item.year
    this.actors = item.actors
    this.movieId = item._id

    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }
  onSelectActor(item:any) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.movies = item.movies
    this.actorId = item._id;

    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });
  }
}
