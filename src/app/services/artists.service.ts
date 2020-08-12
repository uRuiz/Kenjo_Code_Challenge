import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArtistModel } from '../models/artist.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllArtists(){
    return this.http.get(`${this.url}/artists/all`);
  }

  createArtist(artist: ArtistModel) {

    return this.http.post(`${this.url}/artist`, artist)
      .pipe(
        map((resp: any) => {
          artist._id = resp._id;
          return artist;
        })
      )

  }

  updateArtist(artist: ArtistModel) {

    const artistTemp = {
      ...artist
    };

    delete artistTemp._id;

    return this.http.put(`${this.url}/artist/${artist._id}`, artistTemp);

  }

}
