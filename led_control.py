from flask import Flask, render_template
import delete
import search
import insert
import RPi.GPIO as GPIO

# GPIO 설정
GPIO.setmode(GPIO.BOARD)
GPIO.setup(8, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(10, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(30, GPIO.OUT, initial=GPIO.LOW)

# LED 제어 함수
def control_led(value):
    try:
        if value >= 150:
            GPIO.output(10, GPIO.HIGH)
            GPIO.output(8, GPIO.LOW)
            GPIO.output(30, GPIO.LOW)
        elif value >= 80:
            GPIO.output(8, GPIO.HIGH)
            GPIO.output(10, GPIO.LOW)
            GPIO.output(30, GPIO.LOW)
        elif value >= 30:
            GPIO.output(30, GPIO.HIGH)
            GPIO.output(8, GPIO.LOW)
            GPIO.output(10, GPIO.LOW)
        else:
            GPIO.output(8, GPIO.LOW)
            GPIO.output(10, GPIO.LOW)
            GPIO.output(30, GPIO.LOW)
    except Exception as e:
        print(e)
        GPIO.cleanup()
