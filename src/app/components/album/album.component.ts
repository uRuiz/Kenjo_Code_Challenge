import { Component, OnInit } from '@angular/core';
import { AlbumModel } from '../../models/album.model';
import { ArtistModel } from '../../models/artist.model';
import { DockerService } from '../../services/docker.service';
import { NgForm } from '@angular/forms';

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
    console.log(this.album);
    console.log(this.artist);
  }

}
