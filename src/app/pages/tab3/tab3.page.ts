import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UIServiceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  user : Usuario = {};

  constructor(private userService: UsuarioService, private uiService: UIServiceService) {}

  ngOnInit(): void {
    this.user = this.userService.getUsuario();
    console.log(this.user);
  }

  async actualizar(updateForm: NgForm){
    if(updateForm.invalid) return;

    const isUpdated =  await this.userService.updateUser(this.user);
    console.log(isUpdated);
    
    if(isUpdated){
      this.uiService.presentToast('Registro Actualizado');
    } else {
      this.uiService.presentToast('No se pudo actualizar');
    }
  }

  logout(){

  }
}
