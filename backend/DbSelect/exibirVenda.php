<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../Conexao.php';

class exibirVenda {

    public function __construct() {
        $this->exibirVenda();
    }

    function exibirVenda() {

        $conn = new Conexao();
        $conn = $conn->conn();

        $codigo = filter_input(INPUT_GET, 'codigo', FILTER_SANITIZE_NUMBER_INT);

        $query_produtos =
            "
            SELECT
            produto.codigo AS produto,
            produto.nome AS nome,
            produto_pedido.quantidade AS quantidade,
            produto_pedido.total AS total
            FROM
            produto_pedido
            INNER JOIN produto ON produto_pedido.produto = produto.codigo
            WHERE
            produto_pedido.pedido = :codigo
            ORDER BY
            produto.nome ASC
            "   ;
        $result_produtos = $conn->prepare($query_produtos);
        $result_produtos->bindParam(':codigo', $codigo, PDO::PARAM_INT);
        $result_produtos->execute();

        if (($result_produtos) AND ($result_produtos->rowCount() != 0)) {
            while ($row_produtos = $result_produtos->fetch(PDO::FETCH_ASSOC)) {
                extract($row_produtos);

                $lista_produtos["records"][$produto] = [
                    "nome" => $nome,
                    "produto" => $produto,
                    "quantidade" => $quantidade,
                    "total" => $total
                ];
            }

            http_response_code(200);

            echo json_encode($lista_produtos);
        }
    }
}

$exibirVenda = new exibirVenda();
