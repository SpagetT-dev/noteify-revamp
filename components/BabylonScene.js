import React, { useRef, useState, useEffect } from "react";
import { Engine, Scene, useBeforeRender, useScene } from "react-babylonjs";
import { Vector3, Color3, MeshBuilder } from "@babylonjs/core";

const InteractiveCube = ({ onClick }) => {
  const cubeRef = useRef(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.02);
  const [color, setColor] = useState(Color3.Green());

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " ") {
        setColor(Color3.Random());
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useBeforeRender((scene) => {
    if (cubeRef.current) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
      cubeRef.current.rotation.y += rotationSpeed * (deltaTimeInMillis / 1000);
    }
  });

  return (
    <mesh
      ref={cubeRef}
      name="cube"
      onClick={onClick}
      onPointerOver={() => setRotationSpeed(0.05)}
      onPointerOut={() => setRotationSpeed(0.02)}
    >
      <box name="cube-box" size={2} />
      <standardMaterial name="cube-mat" diffuseColor={color} specularColor={Color3.White()} />
    </mesh>
  );
};

export const BabylonScene = () => {
  const scene = useScene();
  const [isClicked, setIsClicked] = useState(false);

  const handleCubeClick = () => {
    setIsClicked(!isClicked);
    if (scene) {
      scene.getMeshByName("cube").material.diffuseColor = isClicked ? Color3.Green() : Color3.Blue();
    }
  };

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", zIndex: -1 }}>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={10}
            setPosition={[new Vector3(0, 5, -10)]}
          />
          <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
          <InteractiveCube onClick={handleCubeClick} />
          <ground name="ground1" width={20} height={20} subdivisions={2}>
            <standardMaterial name="ground-mat" diffuseColor={Color3.Gray()} />
          </ground>
        </Scene>
      </Engine>
    </div>
  );
};