<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'conexao.php';

$query_produtos = "SELECT codigo, nome, valor, tipo FROM produto ORDER BY codigo DESC";
$result_produtos = $conn->prepare($query_produtos);
$result_produtos->execute();

if (($result_produtos) AND ($result_produtos->rowCount() != 0)) {
    while ($row_produtos = $result_produtos->fetch(PDO::FETCH_ASSOC)) {
        extract($row_produtos);

        $lista_produtos["records"][$codigo] = [
            "codigo" => $codigo,
            "nome" => $nome,
            "valor" => $valor,
            "tipo" => $tipo
        ];
    }

    http_response_code(200);

    echo json_encode($lista_produtos);
}