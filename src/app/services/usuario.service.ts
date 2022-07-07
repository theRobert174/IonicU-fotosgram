import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string = null;
  usuario: Usuario = {};

  constructor(private storage: Storage, private http:HttpClient, private navCtrl: NavController) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  login(email:string, password:string){
    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${url}/user/login`,data).subscribe(async resp => {
        //console.log(resp);
        if(resp['ok']){
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  signIn(user: Usuario){
    return new Promise(resolve => {
      this.http.post(`${url}/user/create`, user).subscribe(async resp => {
        console.log(resp);
        if(resp['ok']){
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  logOut(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('login', {animated: true});
  }

  async guardarToken(token:string){
    this.token = token;
    await this.storage.set('token',token);

    await this.validaToken();
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean>{
    await this.cargarToken();

    if(!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    
    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${url}/user/`,{headers}).subscribe(resp => {
        if(resp['ok']) {
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });

    });

  }

  getUsuario(){
    if(!this.usuario._id) this.validaToken();
    return {...this.usuario};
  }

  updateUser(user : Usuario){
    const headers = new HttpHeaders({
      'x-token' : this.token
    })

    return new Promise (resolve => {
      this.http.post(`${url}/user/update`,user,{headers}).subscribe(resp => {
        if(resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          resolve(false);
        } 
      });

    });

  }
}
