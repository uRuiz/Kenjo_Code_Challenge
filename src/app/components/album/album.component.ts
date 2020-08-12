import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AlbumModel } from '../../models/album.model';
import { ArtistModel } from '../../models/artist.model';

import { ArtistsService } from '../../services/artists.service';
import { AlbumsService } from '../../services/albums.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styles: [
  ]
})
export class AlbumComponent implements OnInit {

  album: AlbumModel = new AlbumModel();

  artist: ArtistModel = new ArtistModel();

  artistsList: ArtistModel[] = [];

  constructor(private artists: ArtistsService, 
              private AlbumsService: AlbumsService,
              private route: ActivatedRoute) { }

  ngOnInit(){

    this.artists.getAllArtists()
    .subscribe((data: any) => {
      this.artistsList = data;
    });

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'new') {
      this.AlbumsService.getAlbumById(id)
        .subscribe( (resp: AlbumModel) => {
          this.album = resp;
        })
    }

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
