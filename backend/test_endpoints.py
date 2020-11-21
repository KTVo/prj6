import requests
import sys



if __name__ == "__main__":
    remote_url = "http://52.247.220.137"
    local_url = "http://127.0.0.1:5000"
    url = local_url

    failed_endpoints = []
    try:
        sys.argv[1]
        url = remote_url
    except:
        pass
    print(url)
    endpoint = "/client/1"
    d = requests.get(url+endpoint)
    if d.status_code >= 400:
        failed_endpoints.append(endpoint)
    print(d.text)
    try:
        print(d.json())
    except Exception as e:
        print(e)
    endpoint = "/client/all"
    d = requests.get(url+endpoint)
    print(d.text)
    if d.status_code >= 400:
        failed_endpoints.append(endpoint)
    try:
        print(d.json())
    except Exception as e:
        print(e)

    endpoint = "/hospitals"
    d = requests.get(url+endpoint)
    print(d.text)
    try:
        print(d.json())
    except Exception as e:
        print(e)
    endpoint = "/get_pending_records"
    d = requests.get(url+endpoint, json={"phy_id": 3})
    print(d.text)
    try:
        print(d.json())
    except Exception as e:
        print(e)

    endpoint = "/physician/all"
    d = requests.get(url+endpoint)
    print(d.text)
    try:
        print(d.json())
    except Exception as e:
        print(e)

    endpoint = "/physician/login"
    d = requests.post(url+endpoint, json={"username": "ericisbalanced", "password": "password_is_plain_text"})
    if d.status_code >= 400:
        failed_endpoints.append(endpoint)
    print(d.text)
    try:
        print(d.json())
    except Exception as e:
        print(e)

    endpoint = "/hospitals"
    d = requests.get(url+endpoint)
    print(d.text)
    try:
        print(d.json())
    except Exception as e:
        print(e)

    endpoint = "/client/all"
    d = requests.get(url+endpoint)
    if d.status_code >= 400:
        failed_endpoints.append(endpoint)
    print(d.text)
    if d.status_code >= 400:
        failed_endpoints.append(endpoint)
    try:
        print(d.json())
    except Exception as e:
        print(e)

    endpoint = "/client"
    d = requests.put(url+endpoint, json={"username": "impatient", "password": "123pass",
                                         "pat_id": 6,"pat_age": 56, "pat_sex":"m", "pat_name": "Eric Franky",
                                         "pat_medical_history": "yes, I have history.", "email": "123@aol.hotmail",
                                         "hospital_id": 1})
    print(d.text)
    if d.status_code >= 400:
        failed_endpoints.append(endpoint)

    endpoint = "/physician/all"
    d = requests.get(url+endpoint)
    if d.status_code >= 400:
        failed_endpoints.append(endpoint)
    print(d.text)

    endpoint = "/physician"
    d = requests.put(url+endpoint, json={"phy_addr":"96 ave lane","phy_bio":"Human Butcher","email":"email@aol.hotmail",
                                         "phy_name":"Ericasdfasdfasdf Diaz","npi":"1","password":"password_is_plain_text",
                                         "phy_id":1,"phy_qual":"PhDoctorate","reviewCnt":"0","username":"ericisbalanced",
                                         "hospital_id": 1})
    if d.status_code >= 400:
        failed_endpoints.append(endpoint)

    print(d.text)
    endpoint = "/client_records"
    d = requests.get(url+endpoint, json={"pat_id": 3})

    if d.status_code >= 400:
        failed_endpoints.append(endpoint)
    print(d.text)

    print(failed_endpoints)

