<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../Conexao.php';

class novoPedido {

    public function __construct() {
        $this->novoPedido();
    }

    function novoPedido() {

        $conn = new Conexao();
        $conn = $conn->conn();

        $response_json = file_get_contents("php://input");
        $dados = json_decode($response_json, true);

        if($dados){

            $cad_pedido = $conn->prepare("INSERT INTO pedido (data, total) VALUES ( LOCALTIME, :total)");

            $cad_pedido->bindParam(':total', $dados['total'], PDO::PARAM_STR);

            $cad_pedido->execute();


            if($cad_pedido->rowCount()){
                $response = [
                    "error" => false,
                    "message" => "pedido cadastrado com sucesso"
                ];
            }else{
                $response = [
                    "error" => true,
                    "message" => "Não foi possível cadastrar o pedido"
                ];
            }

        }else{
            $response = [
                "erro" => true,
                "messagem" => "Não foi possível cadastrar o pedido"
            ];
        }


        http_response_code(200);
        echo json_encode($response);
    }
}

$pedido = new novoPedido();