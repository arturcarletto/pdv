<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if ($dados) {
    $query_produto = "UPDATE produto SET nome=:nome, valor=:valor, tipo=:tipo WHERE codigo=:codigo";
    $edit_produto = $conn->prepare($query_produto);
   
    $edit_produto->bindParam(':nome', $dados['nome'], PDO::PARAM_STR);
    $edit_produto->bindParam(':valor', $dados['valor'], PDO::PARAM_INT);
    $edit_produto->bindParam(':tipo', $dados['tipo'], PDO::PARAM_INT);
    $edit_produto->bindParam(':codigo', $dados['codigo'], PDO::PARAM_INT);

    $edit_produto->execute();

    if($edit_produto->rowCount()) {
        $response = [
            "error" => false,
            "message" => "Produto editado com sucesso"
        ];
    } else {
        $response = [
            "error" => false,
            "message" => "Não foi possível editar"
        ];
    }
}else{
    $response = [
        "erro" => false,
        "mensagem" => "Produto não editado!"
    ];
}

http_response_code(200);
echo json_encode($response);