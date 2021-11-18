#! /goinfre/miniconda3/bin/python

import mysql.connector
import requests
from mysql.connector import Error

try:
    connection = mysql.connector.connect(host='localhost',
                                         database='postgres',
                                         user='admin',
                                         password='admin')
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)

except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")

# uname = requests.post['username']
# passwd = requests.post['password']
# sql = "SELECT id FROM users WHERE username='" + uname + "' AND password='" + passwd + "'"
# cursor.execute(sql)

# try:
#     connection = mysql.connector.connect(host='localhost',
#                                          database='electronics',
#                                          user='pynative',
#                                          password='pynative@#29')

#     sql_select_Query = "select * from Laptop"
#     cursor = connection.cursor()
#     cursor.execute(sql_select_Query)
#     # get all records
#     records = cursor.fetchall()
#     print("Total number of rows in table: ", cursor.rowcount)

#     print("\nPrinting each row")
#     for row in records:
#         print("Id = ", row[0], )
#         print("Name = ", row[1])
#         print("Price  = ", row[2])
#         print("Purchase date  = ", row[3], "\n")

# except mysql.connector.Error as e:
#     print("Error reading data from MySQL table", e)
# finally:
#     if connection.is_connected():
#         connection.close()
#         cursor.close()
#         print("MySQL connection is closed")