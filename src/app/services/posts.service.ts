import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  pagePosts = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private userService: UsuarioService, private fileTransfer: FileTransfer) { }

  getPosts(pull:boolean = false){
    if(pull) this.pagePosts = 0;
    
    this.pagePosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.pagePosts}`);
  }

  crearPost(post){
    const headers = new HttpHeaders({'x-token': this.userService.token});

    return new Promise(resolve => {
      this.http.post(`${URL}/posts`, post, {headers}).subscribe(resp => {
        console.log(resp);
        this.nuevoPost.emit(resp['post']);
        resolve(true);
      });
      
    });

  }

  subirImagen(img : string){
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {'x-token': this.userService.token}
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img,`${URL}/posts/upload`, options).then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    })
  }
}
