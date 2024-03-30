from flask import Flask, render_template, request
from pymongo import MongoClient
import requests

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

if __name__ == '__main__':
    app.run(debug=True)    