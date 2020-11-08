from api_client import client_blueprint
from api_physician import physician_blueprint
from api_record_assessment import record_assessment_blueprint
from flask import Flask, request, jsonify, render_template, send_from_directory, session
import models
from flask_cors import CORS, cross_origin
import os
from datetime import date

template_dir = os.path.abspath('./static/build/')
print(template_dir)
app = Flask(__name__, static_folder=template_dir)
app.register_blueprint(client_blueprint)
app.register_blueprint(physician_blueprint)
app.register_blueprint(record_assessment_blueprint)

# To let the front end team execute javascript from a different ip address
cors = CORS(app)

app.secret_key = b'lol123'
@app.route('/')
@cross_origin()
def login():
    # Load the reactjs frontend
    return render_template("index.html")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@cross_origin()
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return ""


@app.route('/success')
@cross_origin()
def success():
    return "success"


@app.route('/register', methods = ["GET", "POST"])
@cross_origin()
def register():
    return render_template("register.html")


@app.route('/adduser', methods = ['POST'])
@cross_origin()
def adduser():
    request.get_data()
    if not request.is_json:
        return "not json"
    post_data = request.get_json()
    post_data = post_data["data"]
    print(post_data["name"], "name")
    name = post_data["name"]
    email = post_data["email"]
    password = post_data["password"]

    user = models.User.insert().values(name=name, email=email, password=password, user_type="physician")
    con = models.db.engine.connect()
    con.execute(user)
    con.close()
    return "user registered"


@app.route("/get_users", methods=['GET', 'POST'])
@cross_origin()
def route_get_users():
    session = models.db.get_session()
    data_to_return = []
    for entry in session.query(models.User):
        data = dict()
        data["email"] = entry.email
        data["id"] = entry.id
        data["password"] = entry.password
        data["user_type"] = entry.user_type
        data_to_return.append(data)
    return jsonify(data_to_return)


@app.route("/test_post", methods=['POST'])
@cross_origin()
def test_post():
    # Test method for the front end team to see what they're sending us.
    # receive JSON, send JSON
    print(request.is_json)
    post_data = request.get_json()

    return post_data


@app.route('/logincheck', methods= ['GET','POST'])
@cross_origin()
def logincheck():

    '''
    Method to validate user login
    :return: :str
    '''

    post_data = request.get_json()
    emailchk = post_data['email']
    passwordchk = post_data['password']

    # creating the login session
    session = models.db.get_session()
    check = session.query(models.User).filter_by(email=emailchk).first()
    session.close()
    if check is None:
        return "error"
    else:
        if check.password == passwordchk and check.email == emailchk:
            return "user logged in"
        else:
            return "error"


@app.route("/get_case_history", methods=["POST", "GET"])
@cross_origin()
def get_case_history():
    # Need session key
    return "case history returned"


@app.route("/image_upload", methods=["POST", "GET"])
@cross_origin()
def handle_image_upload():
    data = dict()
    if request.method == 'GET':
        data["error"] = "Do Not Send GET requests to this end point. Use a POST request instead:\n " \
                             "https://www.educative.io/edpresso/how-to-make-an-axios-post-request"
    # Store image
    return "Image Uploaded"


@app.route("/manage_cases", methods=["GET", "POST"])
@cross_origin()
def manage_cases():
    data = request.args

    return data

@app.route("/get_account_info", methods=["GET"])
@cross_origin()
def get_account_info():

    # return fetch_account_info()
    return "GETTING ACCOUNT INFORMATION"


@app.route("/choose_doctor", methods=["POST", "GET"])
@cross_origin()
def choose_doctor():
    # Only accepts POST REQUEST
    data = dict()

    if request.method == 'GET':
        data["error"] = "Do Not Send GET requests to this end point. Use a POST request instead:\n " \
                        "https://www.educative.io/edpresso/how-to-make-an-axios-post-request"
        return Flask.json_encoder(data)
    return "doctor registered"


@app.route("/get_pending_records", methods=["GET", "POST"])
@cross_origin()
def route_get_pending_records():
    print("get_pending_records")
    if not request.is_json:
        print("yolo1")
        return "not json"
    data = request.get_json()
    print("before try")
    try:
        phy_id = data["phy_id"]
    except:
        return "need phy_id"
    print("After try")
    sess = models.db.get_session()
    entries = sess.query(models.Record_Assessments, models.Patient, models.records)\
        .filter(models.Record_Assessments.c.physician_id == phy_id,
                models.Record_Assessments.c.status == "pending",
                models.Record_Assessments.c.pat_id == models.Patient.c.pat_id,
                models.Record_Assessments.c.pat_id == models.records.c.pat_id)\
        .order_by(models.Record_Assessments.c.create_dt).all()

    data_to_ret = []
    for entry in entries:
        data = dict()
        data["record_assessment_id"] = entry.record_assessment_id
        data["phy_id"] = entry.physician_id
        data["record_id"] = entry.record_id
        data["patient_name"] = entry.pat_name
        data["original_assessment"] = entry.comment
        data["create_dt"] = entry.create_dt
        data_to_ret.append(data)

    sess.close()
    return jsonify(data_to_ret)


@app.route("/update_pending_records", methods=["PUT"])
@cross_origin()
def route_update_pending_record_assessment():
    print("updatepending recrods")
    if not request.is_json:
        print("Not working")
        return "not json"
    post_data = request.get_json()
    print("Before Try update pending")
    try:
        record_assessment_id = post_data["record_assessment_id"]
        assessment = post_data["assessment"]
        completion_date = date.today()
        status = post_data["status"]

    except Exception as e:
        print("ERRORING OUT")
        print(e)
        return "need fields: 'record_assessment_id', 'assessment', 'status'"

    if status == "Cancelled":
        stmt = models.Record_Assessments.update(). \
                     where(models.Record_Assessments.c.record_assessment_id == record_assessment_id). \
                     values(completion_dt=completion_date, status=status)
    else:
        stmt = models.Record_Assessments.update().where(models.Record_Assessments.c.record_assessment_id == record_assessment_id)\
            .values(assessment=assessment, completion_dt=completion_date, status="Complete")

    con = models.db.engine.connect()
    con.execute(stmt)
    con.close()
    return "record updated"


@app.route("/accept_pending_record", methods=["PUT"])
@cross_origin()
def route_accept_pending_record():
    print("accept_pending_record")
    if not request.is_json:
        return "not json"
    post_data = request.get_json()
    print("Before Try accept")
    print(post_data)
    try:
        record_assessment_id = post_data["record_assessment_id"]
    except Exception as e:
        print("ERRORING OUT")
        print(e)
        return "need 'record_assessment_id'"
    stmt = models.Record_Assessments.update().where(
        models.Record_Assessments.c.record_assessment_id == record_assessment_id) \
        .values(status="Diagnosing")
    print("BEFORE EXECUTE")
    con = models.db.engine.connect()
    con.execute(stmt)
    con.close()
    return "accepted"


@app.route("/get_all_physician_records", methods=["POST"])
@cross_origin()
def route_get_all_records():
    if not request.is_json:
        return "not json"
    post_data = request.get_json()

    try:
        phy_id = post_data["phy_id"]
    except Exception as e:
        print(e)
        return "need 'phy_id'"

    sess = models.db.get_session()
    to_ret = []
    entries = sess.query(models.Record_Assessments,
                         models.Physician,
                         models.Patient,
                         models.records)\
                  .filter(models.Record_Assessments.c.physician_id == phy_id,
                          models.Record_Assessments.c.physician_id == models.Physician.c.phy_id,
                          models.Record_Assessments.c.pat_id == models.Patient.c.pat_id,
                          models.records.c.record_id == models.Record_Assessments.c.record_id).all()
    for entry in entries:
        to_ret.append(entry._asdict())

    return jsonify(to_ret)


@app.route("/get_all_patient_records", methods=["POST"])
@cross_origin()
def route_get_all_pat_records():
    if not request.is_json:
        return "not json"
    post_data = request.get_json()

    try:
        pat_id = post_data["pat_id"]
    except Exception as e:
        print(e)
        return "need 'phy_id'"

    sess = models.db.get_session()
    to_ret = []
    entries = sess.query(models.Record_Assessments, models.records, models.Physician, models.Patient)\
        .join(models.Record_Assessments, models.Record_Assessments.c.record_id == models.records.c.record_id)\
        .filter(models.Record_Assessments.c.pat_id == pat_id,
                models.Record_Assessments.c.record_id == models.records.c.record_id,
                models.Physician.c.phy_id == models.Record_Assessments.c.physician_id,
                models.Patient.c.pat_id == models.records.c.pat_id).all()
    for entry in entries:
        to_ret.append(entry._asdict())

    return jsonify(to_ret)



@app.route('/insertreview', methods=["POST"])
@cross_origin()
def insertreview():

    if not request.is_json():
        return "not json"
    post_data = request.get_json()
    try:
        doctor_npi = post_data["npi"]
        comment = post_data["comment"]
        patid = post_data["pat_id"]
        percent = post_data["percent"]
    except:
        return "need phy_id, comment, pat_id, percent"
    my_session = models.db.get_session()

    stmt = models.ratings.insert().values(npi=doctor_npi, pat_id=patid, score=percent, comment=comment)
    my_session.execute(stmt)
    my_session.close()
    return 'added doctor review'


@app.route('/checkspecificdocrev', methods=["GET"])
@cross_origin()
def checkspecificdocrev():
    if not request.is_json():
        return "not json"
    post_data = request.get_json()
    doctornpi = post_data["npi"]

    my_session = models.db.get_session()
    datareturn = []
    entry = my_session.query(models.ratings).filter_by(npi=doctornpi).first()

    if entry is not None:
        for i in entry:
            data = i._asdict()
            datareturn.append(data)
    else:
        return "ERROR DOCTOR NPI NOT ON SYSTEM"

    return jsonify(datareturn)


@app.route('/displayallratings', methods=["GET"])
@cross_origin()
def displayallratings():
    my_session = models.db.get_session()
    datareturn = []
    for entry in my_session.query(models.ratings):
        data = dict()
        data["reviewid"] = entry.review_id
        data["npi"] = entry.npi
        data["pat_id"] = entry.pat_id
        data["comment"] = entry.comment
        data["score"] = entry.score
        datareturn.append(data)
    return jsonify(datareturn)


@app.route("/hospitals")
@cross_origin()
def route_get_all_hospitals():
    sess = models.db.get_session()
    entries = sess.query(models.hospitals).all()
    to_ret = []
    for i in entries:
        to_ret.append(i._asdict())
    return jsonify(to_ret)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, debug=False)
