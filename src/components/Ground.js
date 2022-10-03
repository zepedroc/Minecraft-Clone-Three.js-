import { usePlane } from "@react-three/cannon";
import { RepeatWrapping } from "three";
import { useStore } from "../hooks/useStore";
import { groundTexture } from "../images/textures";

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0], // ground position
        position: [0, -0.5, 0],
    }));

    const [addCube] = useStore((state) => [state.addCube]);

    // repeat pattern (images)
    groundTexture.wrapS = RepeatWrapping;
    groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(100, 100);

    return (
        <mesh onClick={(e) => {
            e.stopPropagation();
            const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
            addCube(x, y, z);
        }} ref={ref}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach="material" map={groundTexture} />
        </mesh>
    )
}