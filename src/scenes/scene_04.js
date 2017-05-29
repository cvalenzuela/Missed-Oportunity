//=====================
// Scene 04: US budget
//====================

import { cleanScene03 } from './scene_03';
import mapboxgl from 'mapbox-gl';
import { map } from './../map';
import { usa } from './../texts';
import * as d3 from 'd3';
import { colors } from './../colors';

let animations = [];
let text = document.getElementById('textScene');
let tips = document.getElementsByClassName('tip');

let Scene04 = () => {
  cleanScene03();

  animations[0] = new Animate('totalAmount', 0.8, 1000000, 0 , 2000);
  animations[1] = new Animate('topHundred', 0.8, 500000, 1, 11500);
  animations[2] = new Animate('defense', 0.8, 250000, 2, 22000);
};

class Animate {
  constructor(name, opacity, targetHeight, msgNumber, time) {
    this.name = name;
    this.opacity = opacity;
    this.targetHeight = targetHeight;
    this.msg = usa[msgNumber][0];
    this.msgNumber = msgNumber;
    this.time = time;
    this.height = 0;
    this.animation = null;
    this.init();
  }

  init() {
    this.animation = setTimeout(() => {
      text.style.background = 'rgba(0, 0, 0, 0.4)';
      text.style.padding = '8px';

      tips[this.msgNumber].style.background = colors.c[this.msgNumber];

      text.childNodes[0].nodeValue = this.msg;
      document.getElementById('usaTip').children[this.msgNumber].childNodes[1].firstChild.nodeValue = usa[this.msgNumber][1];
      map.setPaintProperty(this.name, 'fill-extrusion-opacity', this.opacity);

      while (this.height < this.targetHeight) {
        map.setPaintProperty(this.name, 'fill-extrusion-height', this.height);
        this.height += 5000;
      }
    }, this.time);
  }

  clean() {
    clearTimeout(this.animation);
    tips[this.msgNumber].style.background = 'none'
    document.getElementById('usaTip').children[this.msgNumber].childNodes[1].firstChild.nodeValue = ' '
    map.setPaintProperty(this.name, 'fill-extrusion-opacity', 0);
    map.setPaintProperty(this.name, 'fill-extrusion-height', 0);
  }
};


let cleanScene04 = () => {
  text.childNodes[0].nodeValue = ' ';
  text.style.background = 'none';
  text.style.padding = 'none';

  animations.forEach((a) => {
    a.clean();
  });
  animations = [];
};

export { Scene04, cleanScene04 };
