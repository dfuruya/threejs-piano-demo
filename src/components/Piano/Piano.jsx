import BoxTarget from "../BoxTarget";
import useOscillator from "../../hooks/useOscillator";
import { NOTES_PER_OCTAVE } from "../../consts/audio";
import { isBlack, makeChromatic } from "../../utils/music";

export default function Piano({
  octave = 4,
  start = (NOTES_PER_OCTAVE * octave),
  end = (NOTES_PER_OCTAVE * (octave + 1)) + 1
}) {
  const ALL_NOTES = makeChromatic();
  const range = Array(end - start).fill().map((_, ix) => ALL_NOTES[ix + start]);
  const { playNote } = useOscillator(range);
  console.log(range);

  function onClick(ix) {
    playNote(ix);
  }

  return range.map((k, i) => (
    <BoxTarget
      key={`key-${octave}-${k.note}`}
      position={[-40, isBlack(k) ? 10 : 5, k.offset * -5]}
      color={isBlack(k) ? 'black' : 'white' }
      size={[4, 4, 4]}
      onClick={() => onClick(i)}
    />
  ));
}
