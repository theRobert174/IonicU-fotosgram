import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UIServiceService } from '../../services/uiservice.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('SlidePrincipal',{static:true}) slides : IonSlides;

  loginUser = {
    email: 'rodrigo@test.com',
    password: '123456'
  }

  registerUser : Usuario = {
    email: 'tester@test.com',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  }

  constructor(private userService: UsuarioService, private navCtrl: NavController, private uiService: UIServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(login: NgForm){
    if(login.invalid) return;
    const valido = await this.userService.login(this.loginUser.email, this.loginUser.password);
    if(valido) this.navCtrl.navigateRoot('main/tabs/tab1', {animated:true});
    else this.uiService.alertaInformativa('Usuario y/o contraseña no son correctos');

  }

  async signin(signin: NgForm){
    if(signin.invalid) return;
    const valido = await this.userService.signIn(this.registerUser);
    if(valido) this.navCtrl.navigateRoot('main/tabs/tab1', {animated:true});
    else this.uiService.alertaInformativa('Correo electronico ya existe');
  }

  sLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  sSign(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
