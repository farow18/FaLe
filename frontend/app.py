import json
from flask import Flask, jsonify, request, render_template
from calculos import calcular

app = Flask(__name__)

@app.route('/')
def base():

    return render_template('base.html')

@app.route('/index')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)

