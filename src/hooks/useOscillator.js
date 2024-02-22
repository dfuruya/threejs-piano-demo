import { useEffect, useContext, useState, useRef } from "react";
import context from "../context";
import { getFreq, makeChromatic } from "../utils/audio";

const ALL_NOTES = makeChromatic();

export default ({ frequency = 440, type = "sine" } = {}) => {
  // const [oscillator, setOscillator] = useState(undefined);
  // const [nodeGain, setNodeGain] = useState(undefined);
  const oscillator = useRef();
  const nodeGain = useRef();
  const [playing, setPlaying] = useState(false);

  const { audioContext } = useContext(context);

  useEffect(() => {
    init();
    return dispose;
  }, []);

  useEffect(
    () => {
      if (oscillator.current) {
        oscillator.current.frequency.value = frequency;
      }
    },
    [frequency],
  ); // only trigger this effect when frequency changes

  useEffect(() => {
    if (!playing) return;
    playNote();
    togglePlaying();
  }, [playing]);

  function init() {
    const osc = audioContext.createOscillator();
    const nGain = audioContext.createGain();

    osc.frequency.value = frequency;
    osc.type = type;
    osc.connect(nGain)
      .connect(audioContext.destination);

    oscillator.current = osc;
    nodeGain.current = nGain;

    audioContext.suspend();
  }

  function dispose() {
    oscillator.current.disconnect();
    audioContext.suspend();
  }

  function togglePlaying() {
    setPlaying(pl => !pl);
  }

  function playNote(index) {
    if (audioContext.state === 'running') {
      dispose();
      init();
    }
    audioContext.resume();
    oscillator.current.start();
    const rightNow = audioContext.currentTime;
    const end = 2;
    const freq = getFreq(ALL_NOTES, index);
    oscillator.current.frequency.setTargetAtTime(freq, rightNow, 0)
    nodeGain.current.gain.setValueAtTime(1, rightNow);
    nodeGain.current.gain.linearRampToValueAtTime(0, rightNow + end);
    oscillator.current.stop(rightNow + end);
  }

  return { playNote };
};
