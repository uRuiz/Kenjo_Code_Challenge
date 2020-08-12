import { Component, OnInit } from '@angular/core';
import { AlbumModel } from '../../models/album.model';
import { ArtistModel } from '../../models/artist.model';
import { ArtistsService } from '../../services/artists.service';
import { AlbumsService } from '../../services/albums.service';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styles: [
  ]
})
export class AlbumComponent implements OnInit {

  album: AlbumModel = new AlbumModel();

  artist: ArtistModel = new ArtistModel();

  artistsList: any[] = [];

  // constructor() { }
  constructor(private artists: ArtistsService, private AlbumsService: AlbumsService) {
    this.artists.getAllArtists()
      .subscribe((data: any) => {
        this.artistsList = data;
      });
  }

  ngOnInit(): void {
  }

  save(form: NgForm) {

    if (form.invalid) {
      console.log('Form is not valid');
      return;
    }

    Swal.fire({
      title: 'Wait',
      text: 'Saving data',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;

    if (this.album._id) {
      petition = this.AlbumsService.updateAlbum( this.album )
    } else {
      petition = this.AlbumsService.createAlbum( this.album )
    }

    petition.subscribe ( resp => {
      Swal.fire({
        title: this.album.title,
        text: 'Updated successfully',
        icon: 'success'
      })
    })

  }

}
