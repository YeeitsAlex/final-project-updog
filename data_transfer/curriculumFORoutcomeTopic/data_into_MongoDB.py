from pymongo import MongoClient
import urllib
import sys
import pandas as pd
import pymongo
import json
import os
def import_content(filepath):
    print(filepath)
    filename = filepath
    filename = filename.replace('.json','')
    print(filename)
    
    client = pymongo.MongoClient("mongodb+srv://sfeng023:<Fsy123456789>@cluster0-sl1km.mongodb.net/test?retryWrites=true&w=majority")
    

    m_db = client['cs179_run_test'] # database_name
    db_cm = m_db[filename]
    print(db_cm)
    cdir = os.path.dirname(__file__)
    file_res = os.path.join(cdir, 'dataOutput/' + filepath)
    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))
    print(db_cm.find() )
    i = 0
    for data in data_json:
        db_cm.insert_one(data)

if __name__ == "__main__":
    for item in os.listdir('dataOutput/'):
        if not item.startswith('.') and os.path.isfile(os.path.join('dataOutput/', item)):
            print (item)
            import_content(item)
