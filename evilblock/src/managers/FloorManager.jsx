import * as THREE from "three";

export const FloorManager = ({ floors, floorRefs }) => {
    return (
        <>
            {/* Normal floors */}
            {floors
                .filter(floor => !floor?.skip)
                .map((floor, i) => (
                    <mesh
                        key={`floor-${i}`}
                        ref={floorRefs?.[i]}
                        position={floor.position}
                        rotation={[-Math.PI / 2, 0, 0]}
                        receiveShadow
                    >
                        <planeGeometry args={floor.size} />
                        <meshStandardMaterial color={floor.color} side={THREE.DoubleSide} />
                    </mesh>
                ))}

            {/* Floors with skip flag: render walls instead */}
            {floors
                .filter(floor => floor?.skip)
                .map((floor, i) => {
                    const [x, y, z] = floor.position;
                    const [width, depth] = floor.size;
                    const wallHeight = 3;

                    const directionToWallNum = {
                        1: 4,
                        2: 2,
                        3: 3,
                        4: 1,
                    };

                    const walls = [
                        { pos: [x, -wallHeight / 2, z - depth / 2], size: [width, wallHeight], rot: [0, 0, 0], num: 1 },
                        { pos: [x, -wallHeight / 2, z + depth / 2], size: [width, wallHeight], rot: [0, 0, 0], num: 2 },
                        { pos: [x - width / 2, -wallHeight / 2, z], size: [depth, wallHeight], rot: [0, Math.PI / 2, 0], num: 3 },
                        { pos: [x + width / 2, -wallHeight / 2, z], size: [depth, wallHeight], rot: [0, Math.PI / 2, 0], num: 4 },
                    ];

                    return walls
                        .filter(w => w.num !== directionToWallNum[floor.direction])
                        .map((w, j) => (
                            <mesh key={`wall-${i}-${j}`} position={w.pos} rotation={w.rot}>
                                <planeGeometry args={w.size} />
                                <meshStandardMaterial color="black" side={THREE.DoubleSide} />
                            </mesh>
                        ));
                })}
        </>
    );
};
