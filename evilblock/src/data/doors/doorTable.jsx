export const DOOR_TABLE = {
    door_01: {
        leadsTo: {
            level: "floor_02",
            room: "room_02",
            door: "door_02"
        },
        spawn: {
            position: [-4, 0.5, 4.1],
            rotationY: 4
        }
    },
    door_02: {
        leadsTo: {
            level: "floor_01",
            room: "room_01",
            door: "door_01"
        },
        spawn: {
            position: [-2, 1, 7.8],
            rotationY: 4
        }
    }
}