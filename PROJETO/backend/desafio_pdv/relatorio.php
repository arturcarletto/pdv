<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'conexao.php';

$query_tipos = "SELECT codigo, data, total FROM pedido ORDER BY codigo DESC";
$result_tipos = $conn->prepare($query_tipos);
$result_tipos->execute();

if (($result_tipos) AND ($result_tipos->rowCount() != 0)) {
    while ($row_tipos = $result_tipos->fetch(PDO::FETCH_ASSOC)) {
        extract($row_tipos);

        $lista_tipos["records"][$codigo] = [
            "codigo" => $codigo,
            "data" => $data,
            "total" => $total
        ];
    }

    http_response_code(200);

    echo json_encode($lista_tipos);
}