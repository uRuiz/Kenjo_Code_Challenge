import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DockerService {

  constructor(private http: HttpClient ) { }

  getAllAlbums(){
    return this.http.get('http://localhost:3000/albums/all');
  }

  getAllArtists(){
    const pepito = this.http.get('http://localhost:3000/artists/all');
    console.log(pepito)
    return this.http.get('http://localhost:3000/artists/all');
  }
}
