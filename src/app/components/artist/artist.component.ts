import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ArtistModel } from '../../models/artist.model';

import { ArtistsService } from '../../services/artists.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [
  ]
})
export class ArtistComponent implements OnInit {

  artist: ArtistModel = new ArtistModel();

  artistsList: ArtistModel[] = [];

  constructor(private ArtistsService: ArtistsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'new') {
      this.ArtistsService.getArtistById(id)
        .subscribe( (resp: ArtistModel) => {
          this.artist = resp;
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

    if (this.artist._id) {
      petition = this.ArtistsService.updateArtist( this.artist )


    } else {
      petition = this.ArtistsService.createArtist( this.artist )

    }
    petition.subscribe ( resp => {
      Swal.fire({
        title: this.artist.name,
        text: 'Updated successfully',
        icon: 'success'
      })
      this.router.navigate(['/artists']);
    })

  }

}
