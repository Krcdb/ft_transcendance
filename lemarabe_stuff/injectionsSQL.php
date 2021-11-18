#! /usr/bin/php
<?php 
  #Requete sur base de donnees a l aide d'une ID 
    $mysqli = new mysqli("127.0.0.1", "admin@admin.fr", "admin", "postgres", 5432);

    $id = $_REQUEST['id'];
    // $result = mysqli_query($mysqli, "SELECT * from tabelle WHERE id=$id", MYSQLI_STORE_RESULT);
  "SELECT id FROM users WHERE name = 'Admin' AND password = '".$_POST["password"]."'"

    echo $result;
  
  # Affichage du résultat ...
?>