import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";
import { groundTexture } from "../images/textures";

export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0], // ground position
        position: [0, 0, 0],
    }));

    // focus the image
    groundTexture.magFilter = NearestFilter;
    // repeat pattern (images)
    groundTexture.wrapS = RepeatWrapping;
    groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(100, 100);

    return (
        <mesh ref={ref}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach="material" map={groundTexture} />
        </mesh>
    )
}