import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  user={
    usuario: "",
    password: ""
  }


  constructor(public fb: FormBuilder, public navCtrl: NavController, public alertController: AlertController, private router: Router) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar(){
    let formulario = this.formularioLogin.value;

    if (formulario.nombre == "" || formulario.password == "") {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Completa los campos',
        buttons: ['Reintentar'],
        
      });

      await alert.present();  
      return;      
    }

    let navigationExtras : NavigationExtras={
      state:{
        user: this.user
      }
    }

    this.router.navigate(['/home'],navigationExtras)

  }

}
