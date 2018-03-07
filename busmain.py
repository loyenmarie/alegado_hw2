#!flask/bin/python
from flask import Flask, jsonify, url_for, request
from flask_httpauth import HTTPBasicAuth
import sys, os
import flask
import model

app = Flask(__name__)
auth = HTTPBasicAuth()

def spcall(qry, param, commit=False):
    try:
        dbo = model.DBconn()
        cursor = dbo.getcursor()
        cursor.callproc(qry, param)
        res = cursor.fetchall()
        if commit:
            dbo.dbcommit()
        return res
    except:
        res = [("Error: " + str(sys.exc_info()[0]) + " " + str(sys.exc_info()[1]),)]
    return res

@auth.get_password
def getpassword(username):
    return 'akolagini'


@app.route('/reserve/', methods=['POST'])
def reserve():

    params = request.get_json()
    name = params["name"]
    contact = params["contact"]
    tiime = params["tiime"]
    route = params["route"]
    seat_no = params["seat_no"]
    bus_no = params["bus_no"]

    res = spcall('reserves', (name,contact,tiime,route,seat_no,bus_no), True)
    if 'Error' in res[0][0]:
        return jsonify({'status': 'error', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})

@app.route('/viewreservation/', methods=['GET'])
def viewres():
    res = spcall('viewres', (), True)

    if 'Error' in str(res[0][0]):
        return jsonify({'status': 'error', 'message': res[0][0]})

    recs = []
    for r in res:
     recs.append({"name": str(r[0]), "contact": str(r[1]), "tiime": str(r[2]), "route": str(r[3]), "seat_no": str(r[4]), "bus_no": str(r[5]), "price_rate": str(r[6])})
    return jsonify({'status': 'ok', 'entries': recs, 'count': len(recs)})

@app.route('/login/', methods=['POST'])
def login():

    params = request.get_json()
    password = params["password"]
    username = params["username"]

    res = spcall('login', (username, password), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'error', 'message': res[0][0]})

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/delete2', methods=['POST'])
def delete2():

    res = spcall("delete2", ('1'),True)

    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/edit_reserve', methods=['POST'])
def edit_reserve():

    params = request.get_json()
    name = params["name"]
    contact = params["contact"]
    tiime = params["tiime"]
    route = params["route"]
    seat_no = params["seat_no"]
    bus_no = params["bus_no"]

    res = spcall("edit_reserve",(name, contact, tiime, route, seat_no, bus_no), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'error', 'message': res[0][0]})
    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.route('/editedit', methods=['POST'])
def editedit():

    params = request.get_json()
    name = params["name"]
    contact = params["contact"]
    tiime = params["tiime"]
    route = params["route"]
    seat_no = params["seat_no"]
    bus_no = params["bus_no"]

    res = spcall("editedit",(name, contact, tiime, route, seat_no, bus_no), True)

    if 'Error' in res[0][0]:
        return jsonify({'status': 'error', 'message': res[0][0]})
    return jsonify({'status': 'ok', 'message': res[0][0]})


@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get('Access-Control-Request-Headers',
                                                                             'Authorization')
    if app.debug:
        resp.headers["Access-Control-Max-Age"] = '1'
    return resp

if __name__ == '__main__':
    app.run(threaded=True)