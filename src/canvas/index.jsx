import React from 'react'
import {Environment,Center} from '@react-three/drei'
import {Canvas } from '@react-three/fiber'
import Shirt from './Shirt'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'



const Canvasmodel = () => {
  return (
    <Canvas
        shadows
        camera={{position:[0,0,0],fov:25}}
        gl={{preserveDrawingBuffer:true}}
        className='w-full max-w-full h-full transition-all ease-in'
    >
        <ambientLight intensity={0.5}></ambientLight>
        <Environment preset='city'></Environment>
        <CameraRig>
            <Backdrop></Backdrop>
            <Center>
                <Shirt></Shirt>
            </Center>
        </CameraRig>
    </Canvas>
  )
}

export default Canvasmodel
