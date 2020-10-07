import { Component, OnInit } from '@angular/core';
import { ArtistModel } from '../../models/artist.model';
import { ArtistsService } from '../../services/artists.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styles: [
  ]
})
export class ArtistsListComponent implements OnInit {

  artistsList: ArtistModel[] = [];
  loading = false;

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
    this.loading = true;
    this.artistsService.getAllArtists()
      .subscribe((resp: any) => {
        this.artistsList = resp
        this.loading = false;
      });
  }

  deleteArtist( artist: ArtistModel, i: number){

    Swal.fire({
      title:'Are you sure?',
      text:`Do you want to delete ${ artist.name } ?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.artistsList.splice(i, 1);
        this.artistsService.deleteArtist( artist._id ).subscribe();
      }
    })
  
  }

}
