import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSelected = new EventEmitter<string>();
  @Input() currentAvatar:string = 'av-1.png';

  avatarSlide = {
    slidesPerView: 3.5
  }

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  constructor() { }

  ngOnInit() {
    this.avatars.forEach(av => av.seleccionado = false);
    this.avatars.map(av => {av.img === this.currentAvatar ? av.seleccionado=true : av.seleccionado=false})
  }

  selectAvatar(avatar){
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
    console.log(avatar.img);
    
    this.avatarSelected.emit(avatar.img);
  }

}
