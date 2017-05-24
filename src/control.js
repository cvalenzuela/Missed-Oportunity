//=====================
// Control for chapters
//====================

import {chapters} from './chapters';
import {changeScene} from './changeScene';
let scene = 1;

let previousScene = () => {
  if(scene <= 9 && scene > 1){
    scene -= 1;
    changeScene(scene);
  }
}

let nextScene = () => {
  if(scene <= 8 && scene >= 1){
    scene += 1;
    changeScene(scene);
  }
}

export {previousScene, nextScene}
