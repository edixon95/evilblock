import {
    FLOOR_01,
    FLOOR_02,

    ROOM_01,
    ROOM_02,

    DOOR_01,
    DOOR_02,
    DOOR_00,
    FLOOR_00,
    ROOM_00,
    DOOR_001,
    ROOM_000,
    DOOR_002,
    DOOR_03,
    DOOR_04,
    ROOM_03,
    DOOR_05,
    DOOR_06,
    ROOM_04,
} from "../../constants/floorConstants";
import { handleCreatePrompt } from "../../tool/handleCreatePrompt";

// TODO: Seperate into floors like the levels

/* 
    DOOR STATES BECAUSE I WILL FORGET:
        Either prompt or success will trigger the prompt window (and isLocked, but it's expected that you'd have both the other fields if isLocked)
        prompt: Text used for locked doors/things you will interact with
            prompt can be without a confirm option if the door is not unlocked through normal key usage
        success: Text used for unlocked doors
            success MUST have both a confirm option or else the player will get stuck

        The door will not be marked as seen until it's unlocked
        isSeen: Determines if the text will pop up again, this will be set to true automatically when it's unlocked
        alwaysShow: Override isSeen. Can be used for world building texts. 
            isLocked will decide on what text is shown during the override
        
*/
export const DOOR_TABLE = {
    // Intro scene
    [DOOR_00]: { // Lower roof entrance ramp bottom
        group: "Epilogue",
        to: {
            level: FLOOR_00,
            room: ROOM_000,
            door: DOOR_001,
        },
        lock: {
            type: 0,
            isLocked: false
        },
        cutscene: null
    },
    [DOOR_001]: { // Lower roof entrance ramp bottom top
        group: "Epilogue",
        to: {
            level: FLOOR_00,
            room: ROOM_00,
            door: DOOR_00,
        },
        lock: {
            type: 0,
            isLocked: false
        },
        cutscene: null
    },
    [DOOR_002]: { // lower roof building entrance
        group: "Floor 2",
        to: {
            level: FLOOR_02,
            room: ROOM_02,
            door: DOOR_02,
        },
        lock: {
            type: 0,
            isLocked: true,
            required: "Plank of Wood"
        },
        prompt: handleCreatePrompt("You could probably get in through here. Try to break the window?",),
        success: handleCreatePrompt("The glass shatters into the room, sharp edges around all the edges", "CONFIRMATION", "Enter", "Back"),
        alwaysShow: false,
        isSeen: false,
        cutscene: null
    },
    [DOOR_02]: { // floor 2 - storage exit to lower roof
        group: "Epilogue",
        to: {
            level: FLOOR_00,
            room: ROOM_000,
            door: DOOR_002,
        },
        lock: {
            type: 0,
            isLocked: false
        },
        cutscene: null
    },
    [DOOR_03]: { // floor 2 - storage exit to floor 2 hall
        group: "Floor 2",
        to: {
            level: FLOOR_02,
            room: ROOM_03,
            door: DOOR_04,
        },
        lock: {
            type: 0,
            isLocked: false,
        },
    },
    [DOOR_04]: { // floor 2 - floor 2 hall, entrance to storage
        group: "Floor 2",
        to: {
            level: FLOOR_02,
            room: ROOM_02,
            door: DOOR_03,
        },
        lock: {
            type: 0,
            isLocked: false,
        },
    },
    [DOOR_05]: { // floor 2 - entrance to 2D
        group: "Floor 2",
        to: {
            level: FLOOR_02,
            room: ROOM_04,
            door: DOOR_06,
        },
        lock: {
            type: 0,
            isLocked: false,
        },
    },
    [DOOR_06]: { // floor 2 - 2D exit to hall
        group: "Floor 2",
        to: {
            level: FLOOR_02,
            room: ROOM_03,
            door: DOOR_05,
        },
        lock: {
            type: 0,
            isLocked: false,
        },
    },
    [DOOR_01]: {
        group: "Unused",
        to: {
            level: FLOOR_02,
            room: ROOM_02,
            door: DOOR_02,
        },
        lock: {
            type: 0,
            isLocked: true,
            required: "Reagent G",
        },
        cutscene: "cutscene_01",
        prompt: handleCreatePrompt("The door is locked, use an item?"),
        success: handleCreatePrompt("The door is unlocked, it doesn't feel right in there", "CONFIRMATION", "Enter", "Back"),
        alwaysShow: true,
        isSeen: false
    },
}

export const getDoorInfo = (id) => {
    return DOOR_TABLE[id]
}