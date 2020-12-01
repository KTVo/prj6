from flask import Flask, Blueprint, jsonify, json, request, abort, session as flask_session
from flask_cors import CORS, cross_origin
import models
import datetime

record_assessment_blueprint = Blueprint('api_record_assessment', __name__,)


@record_assessment_blueprint.route('/record_assessment', methods=['GET'])
@cross_origin()
def home():
    return jsonify("RECORD ASSESSMENT API")


@record_assessment_blueprint.route('/record_assessment', methods=['POST'])
@cross_origin()
def api_record_assessment_add():
    if not request.is_json:
        return jsonify({"msg": "not json format"})

    post_data = request.get_json()

    record_id = post_data["record_id"]
    physician_id = post_data["physician_id"]
    pat_id = post_data["pat_id"]
    status = "pending"
    create_dt = datetime.date.today()

    stmt = models.Record_Assessments.insert().\
        values(record_id=record_id, physician_id=physician_id, pat_id=pat_id, status=status,
               create_dt=create_dt)
    con = models.db.engine.connect()
    con.execute(stmt)
    con.close()

    sess = models.db.get_session()
    r = sess.query(models.Record_Assessments).filter(record_id == record_id, physician_id == physician_id)\
            .order_by(models.Record_Assessments.c.record_assessment_id.desc()).first()
    for entry in r:
        d = entry._asdict()

    return jsonify(d)


@record_assessment_blueprint.route('/client_records', methods=["GET", 'POST'])
@cross_origin()
def route_client_records():
    if not request.is_json:
        return "not json"
    post_data = request.get_json()
    sess = models.db.get_session()
    entries = sess.query(models.records).filter(models.records.c.pat_id == post_data["pat_id"]).all()
    to_ret = []
    for i in entries:
        to_ret.append(i._asdict())

    return jsonify(to_ret)
