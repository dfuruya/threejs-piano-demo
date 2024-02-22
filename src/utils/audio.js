import { CONCERT_A, HALF_STEP, KEY_OFFSET } from "../consts/audio"

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
