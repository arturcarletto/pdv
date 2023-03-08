<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");




include_once 'conexao.php';


$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    
    $cad_item = $conn->prepare("INSERT INTO produto_pedido (pedido, produto, quantidade, total) VALUES (:pedido, :produto, :quantidade, :total)");

    $cad_item->bindParam(':pedido', $dados['produto_pedido']['pedido'], PDO::PARAM_INT);
    $cad_item->bindParam(':produto', $dados['produto_pedido']['produto'], PDO::PARAM_INT);
    $cad_item->bindParam(':quantidade', $dados['produto_pedido']['quantidade'], PDO::PARAM_INT);
    $cad_item->bindParam(':total', $dados['produto_pedido']['total'], PDO::PARAM_INT);

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
echo json_encode($cad_item);