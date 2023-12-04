from flask import Flask, render_template
import delete
import search
import insert
import led_control
import threading
import time

app = Flask(__name__)

def scheduled_task():
    while True:
        delete.delete_data_in_mysql()
        insert.fetch_and_store_data_in_mysql()
        data_from_db = search.fetch_and_print_daejeo_data()
        led_control.control_led(data=data_from_db)
        time.sleep(3600)  # 1시간마다 실행

@app.route('/')
def home():
    # fetch_and_print_daejeo_data 함수 실행
    data_from_db = search.fetch_and_print_daejeo_data()
    return render_template('index.html', data=data_from_db)

if __name__ == '__main__':
    # 백그라운드 스레드로 scheduled_task 실행
    task_thread = threading.Thread(target=scheduled_task)
    task_thread.daemon = True
    task_thread.start()

    # Flask 애플리케이션 실행
    app.run(host='0.0.0.0')
