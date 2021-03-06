import d3 from 'd3';
import notes from './note-keys';
import Synthesizer from './synthesizer';

const activeKeys = {};

export default function (selector) {
  d3.selectAll(selector)[0].forEach(function (element) {
    activeKeys[element.attributes['data-key-code'].value] = element;
  });

  document.addEventListener('keydown', function (event) {
    d3.select(activeKeys[event.keyCode]).classed('active', true);

    const note = notes[event.keyCode];
    if (note) { Synthesizer.oscillatorFor(note).start(); }
  });

  document.addEventListener('keyup', function (event) {
    d3.select(activeKeys[event.keyCode]).classed('active', false);

    const note = notes[event.keyCode];
    if (note) { Synthesizer.oscillatorFor(note).stop(); }
  });
}
