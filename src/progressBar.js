//=====================
// Progress Bar
//====================

let ProgressBar = require('./../bower_components/progressbar.js/dist/progressbar.min.js')

let bar = new ProgressBar.Line(progressBar, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'},
  from: {color: '#293896'},
  to: {color: '#ff4e47'},
  step: (state, bar) => {
    bar.path.setAttribute('stroke', state.color);
  }
});

// Start with a little animation
bar.animate(0.01);

export {bar};
