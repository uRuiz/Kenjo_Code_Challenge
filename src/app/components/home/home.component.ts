import { Component } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  albumsList: any[] = [];

  constructor(private album: AlbumsService) {

    this.album.getAllAlbums()
      .subscribe((data: any) => {
        this.albumsList = data;
      });

  }
}
