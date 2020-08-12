import { Component } from '@angular/core';
import { DockerService } from '../../services/docker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  albumsList: any[] = [];
  artistsList: any[] = [];

  constructor( private docker: DockerService) { 

    this.docker.getAllAlbums()
      .subscribe( (data: any) => {
        this.albumsList = data;
      });

  }
}
