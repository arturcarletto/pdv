<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../Conexao.php';

class pedido
{

    function __construct() {
        $this->pedido();
    }

    function pedido() {
        $conn = new Conexao();
        $conn = $conn->conn();

        $ultimo_pedido = "SELECT MAX(codigo) FROM pedido";

        $result_ultimo_pedido = $conn->prepare($ultimo_pedido);
        $result_ultimo_pedido->execute();

        if (($result_ultimo_pedido) and ($result_ultimo_pedido->rowCount() != 0)) {
            while ($row_ultimo_pedido = $result_ultimo_pedido->fetch(PDO::FETCH_ASSOC)) {
                extract($row_ultimo_pedido);

                $ultimo_codigo["ultimo_codigo"] = ["codigo" => $row_ultimo_pedido['MAX(codigo)']];
            }

            http_response_code(200);
            echo json_encode($ultimo_codigo);
        }
    }
}

$pedido = new pedido();
