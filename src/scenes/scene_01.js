//=====================
// Scene 01: Intro with no animation
//====================

import * as d3 from 'd3';
import { cleanScene02 } from './scene_02';
import { hideNext, showNext } from './../buttons';
let text = d3.select('#textScene');

let Scene01 = () => {
  showNext();
  cleanScene02();
  text.style('top', '100px')
};

export { Scene01 };
