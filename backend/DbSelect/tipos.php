<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../Conexao.php';

class tipos {

        public function __construct() {
            $this->tipos();
        }

        public function tipos() {

            $conn = new Conexao();
            $conn = $conn->conn();

            $query = "SELECT codigo, nome, percentual_imposto FROM tipo_produto ORDER BY codigo DESC";
            $result = $conn->prepare($query);
            $result->execute();

            if (($result) AND ($result->rowCount() != 0)) {
                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $lista_tipos["records"][$codigo] = [
                        "codigo" => $codigo,
                        "nome" => $nome,
                        "percentual_imposto" => $percentual_imposto
                    ];
                }

                http_response_code(200);

                echo json_encode($lista_tipos);
            }
        }
}

$tipos = new tipos();