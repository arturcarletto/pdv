<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../Conexao.php';

class deleteTipo {

        public function __construct() {
            $this->deleteTipo();
        }

        function deleteTipo()  {

            $conn = new Conexao();
            $conn = $conn->conn();

            $codigo = $_GET['codigo'];

            $query_tipo = "DELETE FROM tipo_produto WHERE codigo = :codigo";
            $delete_tipo = $conn->prepare($query_tipo);
            $delete_tipo->bindParam(':codigo', $codigo, PDO::PARAM_INT);

            if ($delete_tipo->execute()) {
                $response = [
                    "error" => false,
                    "message" => "tipo apagado com sucesso! $codigo"
                ];
            } else {
                $response = [
                    "error" => true,
                    "message" => "Não foi possível apagar o tipo"
                ];
            }

            http_response_code(200);
            echo json_encode($response);
        }
}

$tipo = new deleteTipo();