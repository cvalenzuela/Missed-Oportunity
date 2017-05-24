//=====================
// Main File
//====================

import {map} from './map';
import {bar} from './progressBar'
import {previousScene, nextScene} from './control'

let loaded = () =>  {
  // Get the buttons
  let previous = document.getElementById('previous');
  let next = document.getElementById('next');

  // Listen for the elements
  previous.addEventListener('click', previousScene);
  next.addEventListener('click', nextScene);
}

// On window loaded
window.addEventListener('load',loaded);
