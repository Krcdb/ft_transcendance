Dim db As Database

uname = request.POST['username']
passwd = request.POST['password']

sql = "SELECT id FROM users WHERE username='" + uname + "' AND password='" + passwd + "'"

db.Execute(sql)