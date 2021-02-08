from flask import Flask,render_template,request,redirect
from flask import Markup
from flask_mobility import Mobility
import os
import logging
logging.basicConfig(format='%(asctime)s %(levelname)-8s %(message)s',level=logging.INFO,datefmt='%Y-%m-%d %H:%M:%S')
app = Flask(__name__)
Mobility(app)

@app.route("/")
def mainpage(): #STARTPAGE
    return render_template("index.html")

app.run()