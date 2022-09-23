import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const JUMP_FORCE = 5;
const SPEED = 5;

export const Player = () => {
    const actions = useKeyboard();

    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0],
    }));

    const vel = useRef([0, 0, 0]);

    // attach camera to player velocity
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v);
    }, [api.velocity]);

    const pos = useRef([0, 0, 0]);

    // attach camera to player position
    useEffect(() => {
        api.position.subscribe((p) => pos.current = p);
    }, [api.position]);

    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));

        const direction = new Vector3();

        const frontVector = new Vector3(
            0,
            0,
            (actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0), // stop if we're pressing w and s at the same time
        );
        const sideVector = new Vector3(
            (actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0),
            0,
            0,
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)

        api.velocity.set(direction.x, vel.current[1], direction.z);
  
        if (actions.jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
        }
    })

    return (
        <mesh ref={ref}></mesh>
    )
}
