import { Component, ElementRef, QueryList, ViewChildren, OnInit } from '@angular/core';
import type {Animation} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChildren(IonCard, {read:ElementRef})
  cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;
  private animation!: Animation;
  

  data: any;


  swiperModules = [IonicSlides];
  slides: any[] = [];


  constructor(private activateRoute: ActivatedRoute, private router: Router, private animationController: AnimationController) { 
    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log(this.data);
      }else{
        this.router.navigate(["/inicio"]);
      }
    });
  }

  ngOnInit(): void{
    this.slides = [
      {banner: '../../../assets/img/zoo1.png'},
      {banner: '../../../assets/img/zoo2.png'},
      {banner: '../../../assets/img/zoo3.png'},
    ]
  }



  ngAfterViewInit(){

    const cardA = this.animationController
      .create()
      .addElement(this.cardElements.get(0)!.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('background', 'green', 'orange');

    this.animation=this.animationController
    .create()
    .duration(3000)
    .iterations(Infinity)
    .addAnimation([cardA]);

    this.animation.play();
  }  
}
