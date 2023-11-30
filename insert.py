import requests
import mysql.connector
import search

# MySQL 데이터베이스 연결 설정
def get_mysql_connection():
    return mysql.connector.connect(
        host='127.0.0.1',
        user='network',
        password='12341234',
        database='fine_dust'
    )

# API 요청을 받아와서 MySQL에 데이터를 저장하는 함수
def fetch_and_store_data_in_mysql():
    url = 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=3wi3%2BBhf8z5d%2FRSz8%2B7qpwZCrInnRO2ueLyuf5ZkNVmw%2B9XzwzwX1WgFP6K1BtUW6yF9%2FFeMYwf2d1U%2Fw0o7rg%3D%3D&returnType=json&numOfRows=50&pageNo=1&sidoName=%EB%B6%80%EC%82%B0&ver=1.0'

    try:
        response = requests.get(url)
        if response.status_code == 200:
            api_data = response.json()
            conn = get_mysql_connection()
            cursor = conn.cursor()

            for item in api_data['response']['body']['items']:
                station_name = item.get('stationName')
                data_time = item.get('dataTime')
                pm10_value = item.get('pm10Value')
                pm25_value = item.get('pm25Value')

                # MySQL 데이터베이스에 데이터 삽입
                insert_query = "INSERT INTO fine_dust (stationName, dataTime, pm10Value, pm25Value) VALUES (%s, %s, %s, %s)"
                cursor.execute(insert_query, (station_name, data_time, pm10_value, pm25_value))

            conn.commit()
            cursor.close()
            conn.close()
            print("데이터가 MySQL에 성공적으로 추가되었습니다.")
        else:
            print("API로부터 데이터를 받아오지 못했습니다.")
    except Exception as e:
        print(f"오류 발생: {str(e)}")
        