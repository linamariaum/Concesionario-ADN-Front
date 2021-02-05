import { Component, OnInit } from '@angular/core';
import { TRMService } from './shared/service/trm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  valorTRM: string = "$3,558.63";

  constructor(private trmService: TRMService) { }

  ngOnInit() {
    //this.obtenerTRM();
  }

  obtenerTRM() {
    return this.trmService.consultar().then(
      async (data) => {
        console.log(data)
        if (data) {
          console.log(data);
        }
      }, (error) => {
        console.error(error);
      }
    );

  }

}
