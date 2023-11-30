import mysql.connector

def get_mysql_connection():
    return mysql.connector.connect(
        host='127.0.0.1',
        user='network',
        password='12341234',
        database='fine_dust'
    )

def fetch_and_print_daejeo_data():
    try:
        conn = get_mysql_connection()
        cursor = conn.cursor()

        select_query = "SELECT * FROM fine_dust WHERE stationName = '대저동'"
        cursor.execute(select_query)

        rows = cursor.fetchall()
        daejeo_data = []
        for row in rows:
            daejeo_data.append({
                'id': row[0],
                'stationName': row[1],
                'dataTime': row[2],
                'pm10Value': row[3],
                'pm25Value': row[4]
            })
        
        return daejeo_data
    except Exception as e:
        print(f"오류 발생: {str(e)}")

# 대저동 데이터 출력 함수 실행


