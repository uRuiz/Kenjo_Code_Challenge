import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlbumModel } from '../models/album.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient) { }

  getAllAlbums(){

    return this.http.get(`${ this.url }/albums/all`);

  }

  getAlbumById( id: string){

    return this.http.get(`${ this.url }/album/${ id }`);

  }

  deleteAlbum( id: string) {

    return this.http.delete(`${ this.url }/album/${ id }`);

  }

  createAlbum( album: AlbumModel ){

    return this.http.post(`${ this.url }/album`, album)
            .pipe(
              map( (resp: any) => {
                album._id =resp._id;
                return album;
              })
            )
  }

  updateAlbum( album: AlbumModel ){

    const albumTemp = {
      ...album
    };

    delete albumTemp._id;

    return this.http.put(`${ this.url }/album/${ album._id }`, albumTemp);

  }
}
