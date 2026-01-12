export const getPlayerInput = () => ({
    forward: !!window.keys["KeyW"],
    back: !!window.keys["KeyS"],
    left: !!window.keys["KeyA"],
    right: !!window.keys["KeyD"],
    run: !!window.keys["ShiftLeft"],

    aim: !!window.keys["KeyQ"],
    interact: !!window.keys["Space"],
    menu: !!window.keys["KeyE"]
});
