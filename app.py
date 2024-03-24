from flask import Flask, render_template, jsonify
from pymongo import MongoClient

# -----------------------------------------------------------------------------------
# MongoDB configuration
client = MongoClient('localhost', 27017)

# Creating a flask application instance
app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)