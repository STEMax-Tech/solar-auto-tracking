let light2 = 0
let light1 = 0
// Góc ban đầu của servo
let servoAngle = 90
// Ngưỡng chênh lệch ánh sáng để điều chỉnh
let threshold = 1
serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
    if (input.buttonIsPressed(Button.AB)) {
        light1 = 0
        light2 = 0
    } else if (input.buttonIsPressed(Button.B)) {
        light2 += 1
    } else if (input.buttonIsPressed(Button.A)) {
        light1 += 1
    }
    basic.pause(100)
})
// Ngưỡng chênh lệch ánh sáng để điều chỉnh
basic.forever(function () {
    // So sánh ánh sáng và điều chỉnh servo
    if (light1 > light2 + threshold) {
        // Quay servo sang phải
        servoAngle = Math.min(servoAngle + 1, 140)
    } else if (light2 > light1 + threshold) {
        // Quay servo sang trái
        servoAngle = Math.max(servoAngle - 1, 35)
    }
    // Điều chỉnh servo theo góc tính được
    pins.servoWritePin(AnalogPin.P16, servoAngle)
})
basic.forever(function () {
    led.plot(randint(0, 4), randint(0, 4))
    serial.writeNumbers([light1, light2, servoAngle])
    basic.pause(100)
    basic.clearScreen()
})
