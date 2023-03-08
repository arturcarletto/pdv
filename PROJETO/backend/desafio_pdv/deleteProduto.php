<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



include_once 'conexao.php';

$codigo = filter_input(INPUT_GET, 'codigo', FILTER_SANITIZE_NUMBER_INT);

$response = "";

$query_produto = "DELETE FROM produto WHERE codigo = :codigo";
$delete_produto = $conn->prepare($query_produto);
$delete_produto->bindParam(':codigo', $codigo, PDO::PARAM_INT);

if ($delete_produto->execute()) {
    $response = [
        "error" => false,
        "message" => "Produto apagado com sucesso! $codigo"
    ];
} else {
    $response = [
        "error" => true,
        "message" => "Não foi possível apagar o produto"
    ];
}

http_response_code(200);
echo json_encode($response);