from flask import Flask, render_template, redirect, url_for, request
from pymongo import MongoClient
import requests
import sqlite3

# -----------------------------------------------------------------------------------
# Repliers API data
# -----------------------------------------------------------------------------------
# MongoDB configuration
client = MongoClient('localhost', 27017)
# -----------------------------------------------------------------------------------
# Creating a flask application instance
app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():    
    return render_template('index.html')

@app.route('/get_data', methods=['GET'])
def get_data():    
    city = request.args.get('city')
    repliers_data_url = f"https://api.repliers.io/listings?city={city}&listings=true&operator=AND&sortBy=updatedOnDesc&status=A"    
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "REPLIERS-API-KEY": "B9bl5DlpfD2SQlwdIggL9ENNWyotza"
    }
    response = requests.get(repliers_data_url, headers=headers)    
    return response.text

@app.route('/form_page', methods=['GET'])
def form_page():
    return render_template('html/planning.html')

@app.route('/post_form_data', methods=['GET', 'POST'])
def receive_form_data():    
    data = request.json    
    # Connect to the database
    conn = sqlite3.connect('c:\\Users\\prajv\\Desktop\\Sourcecode\\Python II\\NxtHome\\NxtHome\\form_data.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO test_table (city) VALUES (?)', (data['city_location'],))        
    conn.commit()
    conn.close()
    return data

if __name__ == '__main__':
    app.run(debug=True)    