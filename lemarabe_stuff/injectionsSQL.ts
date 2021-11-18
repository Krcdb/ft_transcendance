

connection.query("SELECT * FROM health_records WHERE dob = '"+ req.body.dob +"' AND name = '"+ req.body.name +"'", (error, results) => {
    ...
  });
  
  