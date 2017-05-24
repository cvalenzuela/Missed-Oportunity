//=====================
// Logic for scenes and chapters
//====================

import {chapters} from './chapters'
import {bar} from './progressBar'
import {map} from './map'
import {locations} from './locations'
import {Scene01, Scene02, Scene03, Scene04, Scene05, Scene06, Scene07, Scene08, Scene09} from './scenes/scenes'

let chapter = 1;

let title = document.getElementById('chapterName').childNodes[0];
let content = {
  1: document.getElementById('chapterDescription').childNodes[0],
  2: document.getElementById('chapterDescription').childNodes[3],
  3: document.getElementById('chapterDescription').childNodes[6],
}

let changeScene = (scene) => {

  // Chapter 1: Forced Labor
  if(scene == 1 || scene == 2){
    map.flyTo({
      center: locations.waterZoom,
      zoom : 7.58,
      speed: 0.5,
      curve: 1
    });

    chapter = 1;
    scene == 1 ? Scene01() : Scene02();
  }

  // Chapter 2: Slavery in the World
  else if(scene == 3){
    map.flyTo({
      center: locations.worldTiltRight,
      zoom : 2.1,
      speed: 0.1,
      curve: 2,
      bearing: 0,
      pitch: 0
    });

    chapter = 2;
    Scene03();
  }

  // Chapter 3: The US
  else if(scene == 4 || scene == 5){
    map.flyTo({
      center: locations.us,
      zoom : 2.79,
      speed: 0.06,
      curve: 1,
      bearing: 1,
      pitch: 80
    });

    chapter = 3;
    scene == 4 ? Scene04() : Scene05();
  }

  // Chapter 4: Military Bases in the World
  else if(scene == 6){
    map.flyTo({
        center: locations.worldTiltRight,
        zoom : 2.09,
        speed: 0.06,
        curve: 1,
        bearing: 0,
        pitch: 0
    });

    chapter = 4;
    Scene06();
  }

  // Chapter 5: The FAR
  else if(scene == 7){
    chapter = 5;
    Scene07();
  }

  // Chapter 6: What can Goverments Do?
  else if(scene == 8){
    chapter = 6;
    Scene08();

  }

  // Chapter 7: The END
  else if(scene == 9){
    chapter = 6;
    Scene09();
  }

  // Change chapters text
  title.nodeValue = chapters[chapter].title;
  content[1].nodeValue = chapters[chapter].content[1];
  content[2].nodeValue = chapters[chapter].content[2];
  content[3].nodeValue = chapters[chapter].content[3];
  bar.animate(chapters[chapter].bar);
}

export {changeScene}
