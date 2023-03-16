<?php

class Conexao {

    function __construct() {
        $this->conn();
    }

    function conn() {
        $host = "localhost";
        $user = "root";
        $pass = "";
        $dbname = "dbpdv";

        $conn = new PDO("mysql:host=$host;dbname=" . $dbname, $user, $pass);
        return $conn;
    }
}
