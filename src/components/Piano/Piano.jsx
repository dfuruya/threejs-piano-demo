import BoxTarget from "../BoxTarget";
import useOscillator from "../../hooks/useOscillator";
import { ALL_NOTES, NOTES_PER_OCTAVE, PIANO_KEYS } from "../../consts/audio";
import { getPianoKeyIndex } from "../../utils/music";

export default function Piano({
  octave = 4,
  // keys = PIANO_KEYS,
  start = NOTES_PER_OCTAVE * octave,
  end = NOTES_PER_OCTAVE * (octave + 1)
}) {
  const range = Array(end - start).fill().map((_, ix) => ALL_NOTES[ix + start]);
  console.log(range);
  const { playNote } = useOscillator(range);

  function onClick(ix) {
    playNote(ix);
  }

  return PIANO_KEYS.map((k, i) => (
    <BoxTarget
      key={`key-${k.offset}`}
      position={[-40, k.isBlack ? 10 : 5, k.offset * -5]}
      color={k.isBlack ? 'black' : 'white' }
      size={[4, 4, 4]}
      onClick={() => onClick(i)}
    />
  ));
}
