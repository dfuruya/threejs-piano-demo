import { CONCERT_A, HALF_STEP, KEY_OFFSET, NOTES_PER_OCTAVE } from "../consts/audio"

export function makeChromatic() {
  let temp = CONCERT_A
  let list = [
    {
      hz: temp,
      note: 'a',
      octave: 4,
    }
  ]
  for (let i = 0; i < 57; i++) {
    temp /= HALF_STEP
    list.unshift({ hz: temp })
  }
  temp = CONCERT_A
  for (let i = 0; i < 51; i++) {
    temp *= HALF_STEP
    list.push({ hz: temp })
  }
  for (let i = 0; i < list.length; i++) {
    list[i].note = KEY_OFFSET[i % 11]
    list[i].octave = Math.floor(i / 11)
  }
  return list
}

export function getFreq(notes, index) {
  return notes[index]?.hz;
}

/**
 * Data required to visually position the keys
 * @returns { offset: number; isBlack: boolean }
 */
export function generateKeysData() {
  let allKeys = [];
  for (let i = 0; i < 13; i++) {
    if (i !== 5) {
      allKeys.push(getPos(i));
    }
  }
  return allKeys;
}

function getPos(i) {
  const isOdd = i % 2;
  return { offset: i / 2, isBlack: isOdd };
}

export function getPianoKeyIndex(index, octave) {
  return NOTES_PER_OCTAVE * octave + index;
}
