import { useEffect, useContext, useRef } from "react";
import context from "../context";
import { setNodeValues } from "../utils/audio";
import { COMPRESSOR_DEFAULTS } from "../consts/audio";

export default function useOscillator(range) {
  const merger = useRef();
  const gainNode = useRef();
  const { audioContext } = useContext(context);

  useEffect(() => {
    init();
    return dispose;
  }, []);

  function init() {
    const mainGainNode = audioContext.createGain();
    const channelMerger = audioContext.createChannelMerger(range.length);
    const compressor = audioContext.createDynamicsCompressor();
    setNodeValues(compressor, COMPRESSOR_DEFAULTS);
    channelMerger
      .connect(mainGainNode)
      .connect(compressor)
      .connect(audioContext.destination);

    gainNode.current = mainGainNode;
    merger.current = channelMerger;
  }

  function dispose() {
    gainNode.current.disconnect();
    merger.current.disconnect();
    audioContext.suspend();
  }

  // one-shot
  function playNote(index) {
    // create nodes (must be done for each invocation)
    const oscNode = audioContext.createOscillator();
    const gNode = audioContext.createGain();
    oscNode
      .connect(gNode)
      .connect(merger.current, 0, 1);

    // setup
    const rightNow = audioContext.currentTime;
    const duration = 2;  // seconds
    const end = rightNow + duration;
    const freq = range[index].hz;
    oscNode.frequency.value = freq;
    oscNode.frequency.setTargetAtTime(freq, rightNow, 0)
    gNode.gain.setValueAtTime(1, rightNow);
    gNode.gain.linearRampToValueAtTime(0, end);

    // now trigger the audio
    oscNode.start();
    oscNode.stop(end);
    setTimeout(() => {
      gNode.disconnect();
      oscNode.disconnect();
    }, end * 1000);
  }

  return { playNote };
}
