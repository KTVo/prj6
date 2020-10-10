"""
Filename: modals.py
Team name: Second Chance
Backend members: Kevin Vo, Kevin Ramos, Alannah Gavuzzi
Frontend members: Eric Diaz, Trevor Shortlidge, Bernardo Rodriguez, Youngseung Lee
Project Description:
    6. Project title: Medical Imaging database system/Second opinion
    ----------------------------------------------------------------
    Description: Patients take medical images such as CTs, MRIs, x-rays from different medical
                facilities. They are scattered in different hospital databases. Create a central medical
                imaging database system where medical images can be uploaded by physicians from
                different hospitals. Patients and their doctors are able to log in and view all the uploaded
                images. The system also provides a service to the patients to get their image interpreted for
                a fee. It should allow the patients to view a list of radiologists with their bios and give them
                an option to choose which physician to interpret their image.
                Skills: databases, UI/UX, general + web programming, teamwork
    Purpose: Design datatables for images, physicians, patients, ratings, diagnoses, and transactions to then store as
             metadata for SQLAlchemy to create on a chosen database.
    Created on: Sept. 4, 2020 @ 4:14pm PDT
"""

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, MetaData
from sqlalchemy import Table, Column, Integer, String, ForeignKey, Date, Float, Boolean
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import inspect
from get_creds import get_creds

# MetaData() contains objects that stores data about our tables to eventually be created my SQLAlchemy
metadata = MetaData()
Base = declarative_base()


class CloudDB:

    def __init__(self):
        creds = get_creds()  # Read credentials from file
        self.metadata = metadata
        self.base = Base
        self.url = creds["dialect"] + '://' + creds["user"] + ':' + \
                   creds["paswd"] + '@' + creds["server"] + ":" + creds["port"] + '/' + creds["db"]
        self.engine = create_engine(self.url, echo=True, pool_recycle=3600, pool_size=20, max_overflow=0)

    def get_session(self):
        # Sessions are used to create database transactions.
        # A session should be created, database interactions should be executed, then the session should close.
        session = sessionmaker()
        session.configure(bind=self.engine)
        Session = session()
        return Session

    def get_scoped_session(self):

        session = sessionmaker()
        session.configure(bind=self.engine)
        return scoped_session(session)



User = Table('user', metadata,
    Column('id', Integer, autoincrement=True, primary_key=True),
    Column('name', String(100)),
    Column('email', String(100)),
    Column('password', String(2000)),
    Column('user_type', String(100))
             )


"""
Creating table for physicians on the database
npi       -> National Provider Identifier Standard, a 10-digit number ID for healthcare providers
name      -> [Firstname Lastname]
bio       -> Info on physician's speciality, education, experiences, etc 
addr      -> The address of where the physician practices  
username  -> Unique username for physician to login
password  -> Password for login (hash-value)
qual      -> Qualifications of the physician
reviewCnt -> Used to display number of reviews for a physician on their profile by their patients
"""
# Different fields collected for the physicians table
# Email: ${data.email}
#                Password: ${data.password}
#              Repassword: ${data.repassword}
#               FirstName: ${data.firstName}
#                LastName: ${data.lastName}
#                     NPI: ${data.npi}
#              Speciality: ${data.speciality}
#                 Address: ${data.address}
#                    City: ${data.city}
#                US_State: ${data.us_state}
#                     Zip: ${data.zip}
#                 Picture: ${data.picture}
#                     Bio: ${data.bio}`

Physician = Table('physician', metadata,
                  Column('phy_id', Integer, primary_key=True, unique=True, autoincrement=True),
                  Column('npi', String(20), unique=True),
                  Column('name', String(400)),
                  Column('bio', String(400)),
                  Column('addr', String(400)),
                  Column('username', String(50), unique=True),
                  Column('qual', String(400)),
                  Column('reviewCnt', String(400)),
                  Column('email', String(100), unique=True),
                  Column('password', String(50)),
                  )


"""
Creating table for patients
pat_id          -> Patients' unique ID {PK}
medical_history -> Info on patient's pre-existing medical conditions such as allergies, illnesses, and surgeries 
sex             -> Patient's gender
age             -> Age of the patient
username        -> Unique username for physician to login
password        -> Password for login (hash-value)
"""
Patient = Table('patients', metadata,
                Column('pat_id', Integer, primary_key=True, unique=True, autoincrement=True),
                Column('medical_history', String(400)),
                Column('sex', String(400)),
                Column('age', Integer),
                Column('username', String(50), unique=True),
                Column('email', String(100), unique=True),
                Column('password', String(50)),
                )


"""
Creating table for ratings from patients on their physicians
review_id       -> A unique ID to identify a comment {PK}
npi             -> Unique National Provider Identifier Standard, a 10-digit number ID for healthcare providers {FK}
pat_id          -> Unique Patients' ID {FK}
comment         -> A patient's written comment on their experience with a physician
score           -> A rating system where viewers can quickly glance at (metric current undecided)
                                                                        (# of stars)
                                                                        (red vs green bar)
                                                                        (percentage value)
"""
ratings = Table('rating', metadata,
                Column('review_id', Integer, autoincrement=True, primary_key=True, unique=True),
                Column('npi', Integer), #, ForeignKey('physicians.npi')),
                Column('pat_id', Integer), #, ForeignKey('patients.pat_id')),
                Column('comment', String(400)),
                Column('score', String(400)),
                )
# Creating table for records for patients
# record_id   -> A unique ID to identify each case
# pat_id      -> A unique ID specific patient
# comment     -> Allows for comments to be made based off of the image
# hospital_id -> A ID specific to the hospital

records = Table('records', metadata,
                Column('record_id', Integer, autoincrement=True, primary_key=True, unique=True),
                Column('pat_id', Integer, ForeignKey('patient.pat_id'), unique=True),
                Column('comment', String(400)),
                Column('hospital_id', Integer, ForeignKey('hospital.hospital_id'), unique=True),
                )

# Creating table for hospital data
# hospital_id  -> A ID specific to the hospital
# address      -> Allows for hospital address to be displayed
# city         -> Displays the city that the hospital is located in
# zip code     -> Displays the city zip code for the hospital

hospitals = Table('hospital', metadata,
                  Column('hospital_id', Integer, autoincrement=True, primary_key=True, unique=True),
                  Column('address', String(400)),
                  Column('city', String(400)),
                  Column('zip_code', String(400)),
                  )



Record_Assesments = Table('record_assesment', metadata,
                          Column('record_assesment_id', Integer, primary_key=True, autoincrement=True, unique=True),
                          Column('record_id', Integer, ForeignKey('records.record_id')),
                          Column('physician_id', Integer, ForeignKey('physician.npi')),
                          Column('pat_id', Integer, ForeignKey('patient.pat_id')),
                          Column('assesment', String(1200)),
                          Column('completion_dt', Date), # was getting errors, this would overshadow a keyword in another function
                          Column('status', String(15)),
                          )



# Payment
# payment_id
# client_id
# record_id
# physician_id
# item_total
# order_id
# isPaid

Payment = Table('payment', metadata,
                Column('payment_id', Integer, autoincrement=True, primary_key=True, unique=True),
                Column('client_id', Integer),#, ForeignKey('client.client_id')),
                Column('record_id', Integer),#, ForeignKey('record.id')),
                Column('total', Float),
                Column('is_paid', Boolean)
                )


# Fields for the case history table
#{ id: 1, caseTitle: 'Irregular Heart Beat', case_status: 'Patient Canceled',
# category: 'Cardiology', createDate: '05/17/20', completedDate: '05/27/20'},



# -------------------------  For Ongoing Cases ------------------------------
# id: 1, caseTitle: 'Irregular Heart Beat', case_status: 'Patient Canceled', category: 'Cardiology', createDate: '05/17/20', acceptedOn: '05/20/20', docCancel: 'Cancel'

# OngoingCases = Table('ongoing_cases', metadata,
#                 Column('review_id', Integer, primary_key=True, unique=True, autoincrement=True),
#                 Column('npi', Integer, ForeignKey('physicians.npi'), unique=True),
#                 Column('pat_id', Integer, ForeignKey('patients.pat_id'), unique=True),
#                 Column('comment', String(400)),
#                 Column('score', String(400)),
#                 )
# --------------------------------- Dr. Request Table ------------------------------
# { id: 1, caseTitle: 'Chest pain and arm hurts',  category: 'Cardiology', createDate: '08/17/20', action: 'Accept / Decline'},

# Configured Database object that will be at the center of all database interactions.
# Is available on import
db = CloudDB()

if __name__ == '__main__':
    import requests

    db.metadata.drop_all(db.engine)
    db.metadata.create_all(db.engine)

    # d = {'God created war so that Americans would learn geography': 'Mark Twain'}
    # res = requests.post('http://127.0.0.1:8080/test_post', json=d)
    #
    # print(res.content, d)

    # new_account = { "data": {
    #     "email": "abc123s@yahoo.com", "name": "mse", "password": "its_a_secret!"}}
    #
    # res = requests.post('http://127.0.0.1:8080/adduser', json=new_account)
    # print(res.text, "res")
