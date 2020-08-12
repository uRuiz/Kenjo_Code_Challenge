import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArtistModel } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient) { }

  createArtist(artist: ArtistModel ) {

    return this.http.post(`${this.url}/artist`, artist);

  }

  updateArtist( artist: ArtistModel ) {

    const artistTemp = {
      ...artist
    };

    delete artistTemp._id;

    return this.http.put(`${ this.url }/artist/${ artist._id }`, artistTemp);

  }

}
