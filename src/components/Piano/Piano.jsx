import { useControls } from "leva";

import BoxTarget from "../BoxTarget";
import useOscillator from "../../hooks/useOscillator";
import { NOTES_PER_OCTAVE, PIANO_KEYS } from "../../consts/audio";
import { KEYS_SHADER_DEFAULTS } from "../../consts/keysShader";

export default function Piano({
  octave = 4,
}) {
  const { playNote } = useOscillator();
  const shaderControls = useControls(KEYS_SHADER_DEFAULTS);

  function onClick(ix) {
    const index = NOTES_PER_OCTAVE * octave + ix;
    playNote(index);
  }

  return PIANO_KEYS.map((k, i) => (
    <BoxTarget
      key={`key-${k.offset}`}
      position={[-40, k.isBlack ? 10 : 5, k.offset * -5]}
      color={k.isBlack ? 'black' : 'white' }
      size={[4, 4, 4]}
      shaderControls={shaderControls}
      onClick={() => onClick(i)}
    />
  ));
}
