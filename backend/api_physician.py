from flask import Blueprint, jsonify, request, abort, session as flask_session
from flask_cors import cross_origin
import models
import smtplib
from sqlalchemy import and_, select

physician_blueprint = Blueprint('api_physician', __name__,)


@physician_blueprint.route('/physician', methods=['GET'])
@cross_origin()
def home():
    return jsonify("PHYSICIAN API")


@physician_blueprint.route('/physician', methods=['POST'])
@cross_origin()
def api_physician_add():
    if not request.is_json:
        return jsonify({"msg": "not json format"})

    post_data = request.get_json()
    print("!@#!@#!@#!")
    print(post_data)
# Referencing unique keys to ensure uniqueness before inserting
    entry = physician_email(post_data["email"])
    if entry is not None:
        return "email exists"
    entry = physician_username(post_data["username"])
    if entry is not None:
        return "user exists"
    entry = physician_npi(post_data["npi"])
    if entry is not None:
        return "npi exists"
    print(post_data)
    npi = post_data["npi"]
    username = post_data["username"]
    name = post_data["phy_name"]
    bio = post_data["phy_bio"]
    addr = post_data["phy_addr"]
    qual = post_data["phy_qual"]
    reviewCnt = 0
    email = post_data["email"]
    password = post_data["password"]

    stmt = models.Physician.insert().values(username=username, npi=npi, phy_name=name, phy_bio=bio,
                                            phy_addr=addr, phy_qual=qual, reviewCnt=reviewCnt, email=email, password=password)

    con = models.db.engine.connect()
    con.execute(stmt)
    con.close()
    return "Physician registered."


@physician_blueprint.route('/physician', methods=['PUT'])
@cross_origin()
def api_physician_edit():
    # session = models.db.get_session()
    if not request.is_json:
        return jsonify({"msg": "not json format"})
    post_data = request.get_json()

    phy_id = post_data["phy_id"]
    npi = post_data["npi"]
    username = post_data["username"]
    name = post_data["phy_name"]
    bio = post_data["phy_bio"]
    addr = post_data["phy_addr"]
    qual = post_data["phy_qual"]
    reviewCnt = post_data["reviewCnt"]
    email = post_data["email"]
    password = post_data["password"]
    hospital_id = post_data["hospital_id"]
    stmt = models.Physician.update().where(models.Physician.c.phy_id == phy_id)\
        .values(username=username, npi=npi, phy_name=name, phy_bio=bio, phy_addr=addr, phy_qual=qual, reviewCnt=reviewCnt,
                email=email, password=password, hospital_id = hospital_id)
    con = models.db.engine.connect()
    con.execute(stmt)
    con.close()
    return "Physician updated."


@physician_blueprint.route('/physician/<id>', methods=["GET"])
@cross_origin()
def api_physician_id(id):
    session = models.db.get_session()
    data_to_return = []
    entry = session.query(models.Physician).filter_by(phy_id=id).first()
    session.close()
    if entry is not None:
        data = dict()
        data["phy_id"] = entry.phy_id
        data["username"] = entry.username
        data["phy_name"] = entry.phy_name
        data["npi"] = entry.npi
        data["phy_bio"] = entry.phy_bio
        data["phy_addr"] = entry.phy_addr
        data["phy_qual"] = entry.phy_qual
        data["reviewCnt"] = entry.reviewCnt
        data["email"] = entry.email
        data["password"] = entry.password

        data_to_return.append(data)
        return jsonify(data_to_return)
    else:
        abort(404, 'Person not found for Id: {phy_id}'.format(phy_id=id))


@physician_blueprint.route('/physician/all', methods=["GET"])
@cross_origin()
def api_physician_all():
    session = models.db.get_session()
    data_to_return = []
    for entry in session.query(models.Physician):
        data = dict()
        data["phy_id"] = entry.phy_id
        data["username"] = entry.username
        data["phy_name"] = entry.phy_name
        data["npi"] = entry.npi
        data["phy_bio"] = entry.phy_bio
        data["phy_addr"] = entry.phy_addr
        data["phy_qual"] = entry.phy_qual
        data["reviewCnt"] = entry.reviewCnt
        data["email"] = entry.email
        data["password"] = entry.password
        data_to_return.append(data)
    session.close()
    return jsonify(data_to_return)


@physician_blueprint.route('/physician/login', methods=["POST"])
@cross_origin()
def api_physician_login():
    if not request.is_json:
        return "not json"
    post_data = request.get_json()
    session = models.db.get_session()
    print(post_data)
    username = post_data["username"]
    password = post_data["password"]
    r = session.query(models.Physician).filter(models.Physician.c.username == username,
                                               models.Physician.c.password == password)

    if r.count() == 1:
        v = r.first()
        flask_session["logged_in"] = True
        return jsonify(v._asdict())
    elif r.count() > 1:
        return "system error. something went MAJORLY wrong"
    return "not logged in"


def physician_email(p_email):
    session = models.db.get_session()
    data_to_return = []
    entry = session.query(models.Physician).filter_by(email=p_email).first()
    session.close()
    return entry


def physician_npi(p_npi):
    session = models.db.get_session()
    data_to_return = []
    entry = session.query(models.Physician).filter_by(npi=p_npi).first()
    session.close()
    return entry


def physician_username(p_uname):
    session = models.db.get_session()
    data_to_return = []
    entry = session.query(models.Physician).filter_by(username=p_uname).first()
    session.close()
    return entry

