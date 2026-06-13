# Sender Code
let radioGroup = 3
let throttle = 0
let arm = 0
let roll = 0
let pitch = 0

radio.setGroup(radioGroup)
basic.showNumber(radioGroup)
basic.pause(1000)
basic.clearScreen()

input.onButtonPressed(Button.A, function () {
    if (throttle > 40) {
        throttle = throttle - 3
    } else {
        throttle = throttle - 5
    }

    if (throttle < 0) {
        throttle = 0
    }
})

input.onButtonPressed(Button.B, function () {
    if (throttle > 40) {
        throttle = throttle + 3
    } else {
        throttle = throttle + 5
    }

    if (throttle > 100) {
        throttle = 100
    }
})

input.onButtonPressed(Button.AB, function () {
    if (arm == 1) {
        arm = 0
    } else {
        arm = 1
    }

    throttle = 0
})

input.onGesture(Gesture.Shake, function () {
    arm = 0
    throttle = 0
})

basic.forever(function () {
    // lower tilt sensitivity
    roll = Math.idiv(input.rotation(Rotation.Roll), 2)
    pitch = Math.idiv(input.rotation(Rotation.Pitch), 2)

    if (roll < -45) {
        roll = -45
    }
    if (roll > 45) {
        roll = 45
    }

    if (pitch < -45) {
        pitch = -45
    }
    if (pitch > 45) {
        pitch = 45
    }

    basic.clearScreen()

    // arm indicator
    if (arm == 1) {
        led.plot(0, 0)
    }

    // throttle indicator on left side
    let throttleY = 4 - Math.idiv(throttle, 25)
    if (throttleY < 0) {
        throttleY = 0
    }
    if (throttleY > 4) {
        throttleY = 4
    }
    led.plot(0, throttleY)

    // roll/pitch dot
    let x = Math.round((roll + 45) / 22.5)
    let y = Math.round((pitch + 45) / 22.5)

    if (x < 0) {
        x = 0
    }
    if (x > 4) {
        x = 4
    }
    if (y < 0) {
        y = 0
    }
    if (y > 4) {
        y = 4
    }

    led.plot(x, y)

    radio.sendValue("P", pitch)
    radio.sendValue("A", arm)
    radio.sendValue("R", roll)
    radio.sendValue("T", throttle)

    basic.pause(50)
})
