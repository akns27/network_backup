from flask import Flask, request, render_template
import delete
import search
import insert

app = Flask(__name__)

@app.route("/")
def home():
    # fetch_and_print_daejeo_data 함수 실행
    data_from_db = search.fetch_and_print_daejeo_data()
    return render_template("index.html", data =data_from_db)

if __name__ == "__main__":
  app.run(host="0.0.0.0")
  delete.delete_data_in_mysql()

  # fetch_and_store_data_in_mysql 함수 실행
  insert.fetch_and_store_data_in_mysql()


