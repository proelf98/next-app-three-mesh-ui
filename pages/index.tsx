import { Canvas, extend, ThreeElements, useFrame } from "@react-three/fiber";
import { VRButton, XR } from "@react-three/xr";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import ThreeMeshUI from "three-mesh-ui";
// extend(ThreeMeshUI);

function Box(props: any) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
    }
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function App() {
  return (
    <div className="containerCanvas">
      <VRButton></VRButton>
      <Canvas>
        <XR>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[1, 0, -2]} />
          <Box position={[-1, 0, -2]} />
        </XR>
      </Canvas>
    </div>
  );
}
