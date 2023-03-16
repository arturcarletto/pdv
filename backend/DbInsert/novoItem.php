<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../Conexao.php';

class novoItem {

    function __construct() {
        $this->novoItem();
    }

    function novoItem() {
        $conn = new Conexao();
        $conn = $conn->conn();

        $response_json = file_get_contents("php://input");
        $dados = json_decode($response_json, true);

        if($dados){

            $cad_item = $conn->prepare("INSERT INTO produto_pedido (pedido, produto, quantidade, total) VALUES (:pedido, :produto, :quantidade, :total)");

            $cad_item->bindParam(':pedido', $dados['pedido'], PDO::PARAM_STR);
            $cad_item->bindParam(':produto', $dados['produto'], PDO::PARAM_STR);
            $cad_item->bindParam(':quantidade', $dados['quantidade'], PDO::PARAM_STR);
            $cad_item->bindParam(':total', $dados['total'], PDO::PARAM_STR);

            $cad_item->execute();

            if($cad_item->rowCount()){
                $response = [
                    "error" => false,
                    "message" => "item cadastrado com sucesso"
                ];
            }else{
                $response = [
                    "error" => true,
                    "message" => "Não foi possível cadastrar o item"
                ];
            }

        }else{
            $response = [
                "erro" => true,
                "messagem" => "Não foi possível cadastrar o item"
            ];
        }


        http_response_code(200);
        echo json_encode($response);
    }
}

$item = new novoItem();