import context from './audio-context';

export default class Oscillator {
  constructor(frequency, destination = context.destination) {
    const oscillator = this.oscillator = context.createOscillator();
    const gain = context.createGain();
    const volume = this.volume = gain.gain;

    oscillator.frequency.value = frequency;
    volume.value = 0;

    oscillator.connect(gain);
    gain.connect(destination);

    oscillator.start(0);
  }

  start() {
    this.volume.value = 1;
  }

  stop() {
    // Important! Setting a scheduled parameter value
    this.volume.setTargetAtTime(0, context.currentTime, 0.015);
  }
}
