import { Component, OnInit } from '@angular/core';
import { ArtistModel } from '../../models/artist.model';
import { DockerService } from '../../services/docker.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [
  ]
})
export class ArtistComponent implements OnInit {

  artist: ArtistModel = new ArtistModel();

  artistsList: any[] = [];

  constructor( private docker: DockerService ) { 
    this.docker.getAllArtists()
    .subscribe( (data: any) => {
      this.artistsList = data;
    });
  }

  ngOnInit(): void {
  }

  save ( form: NgForm) {
    console.log(form);
    console.log(this.artist);
  }

}
