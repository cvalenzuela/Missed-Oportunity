//=====================
// Scene 07
//====================

import { cleanScene06 } from './scene_06';
import * as d3 from 'd3';
import { credits } from './../texts';

let text;

let Scene07 = (scene) => {
  cleanScene06();
  d3.select('#textScene').style('top', '200px')

  text = d3.select('#textScene')
  .html(
    '<div id="credits"><a href="' + credits.centerLink + '"><h4>' + credits.center + '</h4></a>' +
    '<h6 class="creditsSubTitle">Data and resources used</h6>' +
    '<a href="' + credits.icarLink + '"><p>' + credits.icar + '</p></a>' +
    '<a href="' + credits.nyTimesLink + '"><p>' + credits.nyTimes + '</p></a>' +
    '<a href="' + credits.fedaralLink + '"><p>' + credits.fedaral + '</p></a>' +
    '<a href="' + credits.exclusionLink + '"><p>' + credits.exclusion + '</p></a>' +
    '<a href="' + credits.slaveryIndexLink + '"><p>' + credits.slaveryIndex + '</p></a>' +
    '<a href="' + credits.forceLaborLink + '"><p>' + credits.forceLabor + '</p></a>' +
    '<a href="' + credits.articleLink + '"><p>' + credits.article + '</p></a>' +
    '<a href="' + credits.militaryBasesLink + '"><p>' + credits.militaryBases + '</p></a>' +
    '<h6 class="creditsSubTitle">Homepage image Credits</h6>' +
    '<a href="' + credits.imageLink + '"><p>' + credits.imageCredits + '</p></a></div>'
  )

}

let cleanScene07 = () => {
  text.html(' ')
}

export { Scene07, cleanScene07 };
