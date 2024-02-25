import { useEffect, useContext, useRef } from "react";
import context from "../context";

export default function useOscillator(range) {
  const merger = useRef();
  const nodeGain = useRef();
  const { audioContext } = useContext(context);

  useEffect(() => {
    init();
    return dispose;
  }, []);

  function init() {
    const nGain = audioContext.createGain();
    const channelMerger = audioContext.createChannelMerger(range.length);
    channelMerger
      .connect(nGain)
      .connect(audioContext.destination);

    nodeGain.current = nGain;
    merger.current = channelMerger;
  }

  function dispose() {
    audioContext.suspend();
  }

  // one-shot
  function playNote(index) {
    const oscillatorNode = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillatorNode
      .connect(gainNode)
      .connect(merger.current, 0, 1);
    const rightNow = audioContext.currentTime;
    const duration = 2;  // seconds
    const end = rightNow + duration;
    const freq = range[index].hz;
    oscillatorNode.frequency.value = freq;
    oscillatorNode.frequency.setTargetAtTime(freq, rightNow, 0)
    gainNode.gain.setValueAtTime(1, rightNow);
    gainNode.gain.linearRampToValueAtTime(0, end);
    oscillatorNode.start();
    oscillatorNode.stop(end);
    setTimeout(() => {
      gainNode.disconnect();
      oscillatorNode.disconnect();
    }, end * 1000);
  }

  return { playNote };
}
