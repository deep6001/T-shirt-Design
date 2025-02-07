import React from 'react'
import {SketchPicker} from 'react-color'
import {useSnapshot} from 'valtio'
import state from '../store'
import { color } from 'framer-motion'
const Colorpicker = () => {
  const snap=useSnapshot(state);
  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker
        color={snap.color}
        disableAlpha
        // presetColors={}
        onChange={(color)=>state.color=color.hex}
      ></SketchPicker>
    </div>
  )
}

export default Colorpicker
