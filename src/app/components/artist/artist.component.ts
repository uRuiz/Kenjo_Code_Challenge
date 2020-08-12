import { Component, OnInit } from '@angular/core';
import { ArtistModel } from '../../models/artist.model';
import { ArtistsService } from '../../services/artists.service';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [
  ]
})
export class ArtistComponent implements OnInit {

  artist: ArtistModel = new ArtistModel();

  artistsList: any[] = [];

  constructor(private ArtistsService: ArtistsService) {

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

    if (this.artist._id) {
      petition = this.ArtistsService.updateArtist(this.artist)


    } else {
      petition = this.ArtistsService.createArtist(this.artist)

    }
    petition.subscribe ( resp => {
      Swal.fire({
        title: this.artist.name,
        text: 'Updated successfully',
        icon: 'success'
      })
    })

  }

}
