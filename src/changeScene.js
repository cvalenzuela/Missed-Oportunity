//=====================
// Logic for scenes and chapters
//====================

import { chapters } from './texts';
import { bar } from './progressBar';
import { map } from './map';
import { locations } from './locations';
import { Scene01, Scene02, Scene03, Scene04, Scene05, Scene06, Scene07, Scene08, Scene09 } from './scenes/scenes';

let chapter = 1;

let title = document.getElementById('chapterName').childNodes[0];
let content = {
  1: document.getElementById('chapterDescription').childNodes[0],
  2: document.getElementById('chapterDescription').childNodes[3],
  3: document.getElementById('chapterDescription').childNodes[6],
};

let changeScene = (scene) => {

  // Chapter 1: D3 Animation; Forced Labor Intro
  if (scene == 1 || scene == 2) {
    map.flyTo({
      center: locations.waterZoom,
      zoom: 7.58,
      speed: 0.5,
      curve: 1,
    });

    chapter = 1;
    scene == 1 ? Scene01() : Scene02();
  }

  // Chapter 2: Slavery in the World
  else if (scene == 3) {
    map.flyTo({
      center: locations.worldTiltRight,
      zoom: 1.2,
      speed: 0.1,
      curve: 2,
      bearing: 0,
      pitch: 0,
    });

    chapter = 2;
    Scene03();
  }

  // Chapter 3: The US
  else if (scene == 4) {
    map.flyTo({
      center: locations.us,
      zoom: 2.29,
      speed: 0.1,
      curve: 1,
      bearing: 1,
      pitch: 80,
    });

    chapter = 3;
    Scene04()
  }

  // Chapter 4: Military Bases in the World
  else if (scene == 5) {
    map.flyTo({
      center: locations.worldTiltRight,
      zoom: 1.2,
      speed: 0.1,
      curve: 1,
      bearing: 0,
      pitch: 0,
    });

    chapter = 4;
    Scene05();
  }

  // Chapter 5: The FAR
  else if (scene == 6) {
    chapter = 5;
    Scene06();
  }

  // Chapter 6: What can Goverments Do? and End
  else if (scene == 7) {
    chapter = 6;
    Scene07();
  }

  // Change chapters text
  title.nodeValue = chapters[chapter].title;
  content[1].nodeValue = chapters[chapter].content[1];
  content[2].nodeValue = chapters[chapter].content[2];
  content[3].nodeValue = chapters[chapter].content[3];
  bar.animate(scene / 7);
};

export { changeScene };
