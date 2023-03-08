<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");




include_once 'conexao.php';


$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    
    $cad_tipo = $conn->prepare("INSERT INTO tipo_produto (nome, percentual_imposto) VALUES (:nome, :percentual_imposto)");

    $cad_tipo->bindParam(':percentual_imposto', $dados['tipo']['percentual_imposto'], PDO::PARAM_STR);
    $cad_tipo->bindParam(':nome', $dados['tipo']['nome'], PDO::PARAM_STR);
    $cad_tipo->execute();

    if($cad_tipo->rowCount()){
        $response = [
            "error" => false,
            "message" => "tipo cadastrado com sucesso"
        ];
    }else{
        $response = [
            "error" => true,
            "message" => "Não foi possível cadastrar o tipo"
        ];
    }

}else{
    $response = [
        "erro" => true,
        "messagem" => "Não foi possível cadastrar o tipo"
    ];
}


http_response_code(200);
echo json_encode($cad_tipo);