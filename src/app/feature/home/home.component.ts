import { Component, OnInit } from '@angular/core';
import { TRMService } from './shared/service/trm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  valorTRM: string = "$3,534.99";

  constructor(private trmService: TRMService) { }

  ngOnInit() {
    console.log('aqui')
    this.obtenerTRM();
  }

  obtenerTRM() {
    console.log('hoe')
    this.trmService.consultar().subscribe((res) => {
      console.log('holi');
      console.log(res);
    })

    // return this.trmService.consultar().then(
    //   async (data) => {
    //     console.log(data)
    //     if (data) {
    //       console.log(data);
    //     }
    //   }, (error) => {
    //     console.error(error);
    //   }
    // );

  }

}
