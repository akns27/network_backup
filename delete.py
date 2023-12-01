from colorama import Cursor

from search import get_mysql_connection  # Remove this import if it's not necessary

# 기존 코드에서 수정된 부분
def delete_data_in_mysql():
    conn = get_mysql_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM fine_dust")
    cursor.execute("ALTER TABLE fine_dust AUTO_INCREMENT = 1")
