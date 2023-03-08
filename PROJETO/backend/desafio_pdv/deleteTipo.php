<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



include_once 'conexao.php';

$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

$response = "";

$query_tipo = "DELETE FROM tipo_produto WHERE codigo = :id";
$delete_tipo = $conn->prepare($query_tipo);
$delete_tipo->bindParam(':id', $id, PDO::PARAM_INT);

if ($delete_tipo->execute()) {
    $response = [
        "error" => false,
        "message" => "tipo apagado com sucesso! $id"
    ];
} else {
    $response = [
        "error" => true,
        "message" => "Não foi possível apagar o tipo"
    ];
}

http_response_code(200);
echo json_encode($response);