from flask import Flask, render_template
import delete
import search
import insert
import RPi.GPIO as GPIO

#GPIO.setwarnings(False)  # GPIO warning 메시지 비활성화

# GPIO 핀 초기화
GPIO.cleanup()
GPIO.setmode(GPIO.BOARD)

# 필요한 핀들을 설정
GPIO.setup(8, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(10, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(12, GPIO.OUT, initial=GPIO.LOW)

# LED 제어 함수
def control_led(data):
    try:
        print(*data)
        data = int(data[0].get('pm10Value'))
        print(data)
        if data >= 80:
            GPIO.output(12, GPIO.HIGH)
            GPIO.output(10, GPIO.LOW)
            GPIO.output(8, GPIO.LOW)
        elif data >= 30:
            GPIO.output(10, GPIO.HIGH)
            GPIO.output(8, GPIO.LOW)
            GPIO.output(12, GPIO.LOW)
        elif data >= 10:
            GPIO.output(8, GPIO.HIGH)
            GPIO.output(12, GPIO.LOW)
            GPIO.output(10, GPIO.LOW)
        else:
            GPIO.output(8, GPIO.LOW)
            GPIO.output(10, GPIO.LOW)
            GPIO.output(12, GPIO.LOW)
    except Exception as e:
        print(e)
        GPIO.cleanup()

