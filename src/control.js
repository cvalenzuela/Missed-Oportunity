//=====================
// Control for chapters
//====================

import { changeScene } from './changeScene';

let scene = 1;

let previousScene = () => {
  if (scene <= 8 && scene > 1) {
    scene -= 1;
    changeScene(scene);
  }
};

let nextScene = () => {
  if (scene <= 6 && scene >= 1) {
    scene += 1;
    changeScene(scene);
  }
};

export { previousScene, nextScene };
