<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../Conexao.php';

class novoProduto {

    function __construct() {
        $this->novoProduto();
    }

    function novoProduto() {
        $conn = new Conexao();
        $conn = $conn->conn();

        $response_json = file_get_contents("php://input");
        $dados = json_decode($response_json, true);

        if($dados){

            $cad_produto = $conn->prepare("INSERT INTO produto (nome, valor, tipo) VALUES (:nome, :valor, :tipo)");

            $cad_produto->bindParam(':nome', $dados['produto']['nome'], PDO::PARAM_STR);
            $cad_produto->bindParam(':valor', $dados['produto']['valor'], PDO::PARAM_STR);
            $cad_produto->bindParam(':tipo', $dados['produto']['tipo'], PDO::PARAM_INT);

            $cad_produto->execute();

            if($cad_produto->rowCount()){
                $response = [
                    "error" => false,
                    "message" => "Produto cadastrado com sucesso"
                ];
            }else{
                $response = [
                    "error" => true,
                    "message" => "Não foi possível cadastrar o produto"
                ];
            }

        }else{
            $response = [
                "erro" => true,
                "messagem" => "Não foi possível cadastrar o produto"
            ];
        }


        http_response_code(200);
        echo json_encode($response);
    }
}

$produto = new novoProduto();