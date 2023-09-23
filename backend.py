from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

app = Flask(__name__, template_folder='template', static_folder='static')
import sqlite3


def get_db_connection():
    conn = sqlite3.connect("energy_data.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/data")
def get_energy_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM energy_data")
    energy_data = cursor.fetchall()
    conn.close()
    return {"energy_data": [dict(row) for row in energy_data]}


if __name__ == '__main__':
    app.run()
