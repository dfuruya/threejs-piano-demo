import { CONCERT_A, HALF_STEP, NOTES_PER_OCTAVE } from "../consts/audio";
import { BLACK, KEYS, NOTE_A } from "../consts/music";

/**
 * Generates a range of chromatic notes data
 * (frequency, octave and note value)
 * Based on Concert A as 440hz
 */
// TODO: clean this up!!!
export function makeChromatic() {
  const concertAIndex = KEYS.findIndex(k => k.note === NOTE_A);
  let hz = CONCERT_A;
  let relKeyIx = concertAIndex;
  let octave = 4;
  const aNote = KEYS[concertAIndex];

  let list = [
    {
      hz,
      note: aNote.note,
      color: aNote.color,
      octave,
      offset: aNote.offset,
    }
  ];
  // build frequencies lower than Concert A
  relKeyIx--;
  // lowest note is "D"
  for (let i = 0; i < 57; i++) {
    if (relKeyIx < 0) {
      relKeyIx = NOTES_PER_OCTAVE - 1;
      octave--;
    }
    hz /= HALF_STEP;
    const key = KEYS[relKeyIx];
    list.unshift({
      hz,
      note: key.note,
      color: key.color,
      octave,
      offset: list[0].offset - key.offset,
    });
    relKeyIx--;
  }
  // build frequencies higher than Concert A
  hz = CONCERT_A;
  octave = 4;
  relKeyIx = concertAIndex + 1;
  for (let i = 0; i < 51; i++) {
    if (relKeyIx === NOTES_PER_OCTAVE) {
      relKeyIx = 0;
      octave++;
    }
    hz *= HALF_STEP;
    const key = KEYS[relKeyIx];
    const prevKey = relKeyIx - 1 < 0 ? NOTES_PER_OCTAVE - 1 : relKeyIx - 1;
    list.push({
      hz,
      note: key.note,
      color: key.color,
      octave,
      offset: list[list.length - 1].offset + KEYS[prevKey].offset,
    });
    relKeyIx++;
  }
  console.log(list);
  return list;
}

function getPreviousOffset(list, index) {
  if (index === 0) {
    return 0.5;
  }
  return list[index - 1].offset;
}

export function isBlack(note) {
  return note.color === BLACK;
}

export function getPianoKeyIndex(index, octave) {
  return NOTES_PER_OCTAVE * octave + index;
}
