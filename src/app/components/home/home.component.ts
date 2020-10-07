import { Component } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { AlbumModel } from '../../models/album.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  albumsList: AlbumModel[] = [];
  loading = false;

  constructor(private albumService: AlbumsService) { }

  ngOnInit() {
    this.loading = true;
    this.albumService.getAllAlbums()
      .subscribe((resp: any) => {
        this.albumsList = resp
        this.loading = false;
      });
  }

  deleteAlbum( album: AlbumModel, i: number){

    Swal.fire({
      title:'Are you sure?',
      text:`Do you want to delete ${ album.title } ?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.albumsList.splice(i, 1);
        this.albumService.deleteAlbum( album._id ).subscribe();
      }
    })
  
  }
}
