import React from 'react';
import { Color } from 'three';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';
// import { color }  'framer-motion';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  logoTexture.anisotropy = 16;
  fullTexture.anisotropy = 16;
  


  
  useFrame((state, delta) => {
    const targetColor = snap.color;
    const currentColor = materials.lambert1.color.clone(); // Clone the current color
    easing.dampC(currentColor, targetColor, new Color(), 0.25, delta);
    materials.lambert1.color.copy(currentColor); // Apply the updated color back to the material
  });
  
  
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roghness={1}
        dispose={null}>
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
           
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
