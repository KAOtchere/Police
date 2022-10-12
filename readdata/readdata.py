import mysql.connector
from mysql.connector import Error
from datetime import datetime
import json
from openpyxl import load_workbook
import re
import sys


file_location = sys.argv[1]
wb = load_workbook(file_location, data_only=True)
dataset = wb.active.values


def create_db_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")

    return connection



def execute_insert(connection, query, values):
    cursor = connection.cursor(buffered=True)
    try:
        cursor.executemany(query, values)
        connection.commit()
        cursor.execute('SELECT LAST_INSERT_ID()')
        id = cursor.fetchone()[0]
        return id
        
    except Error as err:
        print('insert \n')
        print(values[0])
        print(f"Error: '{err}' \n")
        return None

def execute_select(connection, query):
    cursor = connection.cursor(buffered=True)
    try:
        cursor.execute(query)
        result = cursor.fetchone()
        return result[0]
    except Error as err:
        print('select \n')
        print(f"Error: '{err}' \n")
        return None





DB_HOST=sys.argv[2]
DB_DATABASE=sys.argv[3]
DB_USERNAME=sys.argv[4]
DB_PASSWORD=sys.argv[5]
myConnect = create_db_connection(DB_HOST, DB_USERNAME, DB_PASSWORD,DB_DATABASE)

keyword_set = set()
media_set = set()
pname_set = set()
authors_set = set()

dataset = list(dataset)
dataset_keys = dataset[0]
dataset = dataset[1:]


for record in dataset:
    record_keywords = set()
    record_authors = set()

    title = record[1]
    media = record[2]
    pubdate = record[3]
    pubname = record[4]
    authors = record[5]
    summary = record[6]
    positive = record[7]
    negative = record[8]
    neutral = record[9]
    keywords = record[10]

    if(summary==None):
        summary = ' '

    if(title==None):
        title = ' '
    
    keywords = keywords.split(', ')
    for keyword in keywords:
        keyword = keyword.strip()
        keyword = keyword.lower()
        if keyword not in keyword_set:
            keyword_set.add(keyword)
            sql = "insert into keywords(keyword) values (%s)"
            values = [tuple([keyword])]
            #add to db & get id from db
            output = execute_insert(myConnect, sql, values)

            
            if(output!=None):
                #append to record keys set
                record_keywords.add(output)
            
        else:
            #get id from db
            sql = "select * from keywords where keyword ='{}'".format(keyword)
            output = execute_select(myConnect, sql)
            if(output!=None):
                #append to record keys set
                record_keywords.add(output)
            

        

    media = media.lower()
    if media not in media_set:
        media_set.add(media)
        sql = "insert into media(medium) values (%s)"
        values = [tuple([media])]
        #get id from db
        output = execute_insert(myConnect, sql, values)

        
        if(output!=None):
            media_id = output
    else:
        #get id from db
        sql = "select * from media where medium ='{}'".format(media)
        output = execute_select(myConnect, sql)
        
        if(output!=None):
            media_id = output
    
    authors = re.split('and |, |& ', authors)
    for author in authors:
        author = author.strip()
        author = author.lower()
        if author not in authors_set:
            if author!='-' and author!='.' and author!='..':
                authors_set.add(author)
                # add to db
                sql = "insert into authors(name) values (%s)"
                values = [tuple([author])]
                
                #get id from db
                output = execute_insert(myConnect, sql, values)

                
                if(output!=None):
                    #append to record keys set
                    record_authors.add(output)
        else:
            #get id from db
            sql = "select * from authors where name ='{}'".format(author)
            output = execute_select(myConnect, sql)
            #get id from db
            if(output!=None):
                #append to record keys set
                record_authors.add(output)


    denom = positive + negative + neutral

    newPositive = (positive/denom) * 100
    newNegative = (negative/denom) * 100
    newNeutral = (neutral/denom) * 100

    if pubname not in pname_set:
        pname_set.add(pubname)
        # add to db
        sql = "insert into publication_names(name) values (%s)"
        values = [tuple([pubname])]

        output = execute_insert(myConnect, sql, values)

        #get id from db
        if(output!=None):
            pub_id = output
        #pubname = pub_id
    else:
        #get id from db
        sql = "select * from publication_names where name ='{}'".format(pubname)
        output = execute_select(myConnect, sql)
        #get id from db
        if(output!=None):
            pub_id = output
        ##pubname = pub_id
        

    pubdate = pubdate.strftime('%Y-%m-%d')
    
    #create record (title, media_id, summary, pubdate, negative, positive, neutral, pub_id)
    sql = "insert into posts(title,media_id,pub_id,summary,publication_date,positive,negative,neutral) values (%s,%s,%s,%s,%s,%s,%s,%s)"
    values = [(title,media_id,pub_id,summary,pubdate,newPositive, newNegative, newNeutral)]
    post_id = execute_insert(myConnect, sql, values)

    if(post_id != None):
        #create many to many for keywords-record 
        for item in record_keywords:
            sql = "insert into post_keywords(post_id, keyword_id) values (%s, %s)"
            values = [(post_id, item)]
            output = execute_insert(myConnect, sql, values)

        #create many to many for author-record 
        for item in record_authors:
            sql = "insert into post_authors(post_id, author_id) values (%s, %s)"
            values = [(post_id, item)]
            output = execute_insert(myConnect, sql, values)

        






