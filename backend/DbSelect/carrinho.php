<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../Conexao.php';

class carrinho {

    public function __construct() {
        $this->carrinho();
    }

    function carrinho() {
        $conn = new Conexao();
        $conn = $conn->conn();

        $query_carrinho =
            "SELECT
                produto_pedido.codigo,
                produto_pedido.pedido,
                produto_pedido.produto,
                produto_pedido.quantidade,
                produto_pedido.total,
                produto.valor,
                produto.nome,
                tipo_produto.percentual_imposto AS tipo_imposto
            FROM
                produto_pedido
            INNER JOIN produto ON produto_pedido.produto = produto.codigo
            INNER JOIN tipo_produto ON produto.tipo = tipo_produto.codigo
            ORDER BY
                produto_pedido.codigo DESC
            ";

        $result_carrinho = $conn->prepare($query_carrinho);
        $result_carrinho->execute();

        if (($result_carrinho) AND ($result_carrinho->rowCount() != 0)) {
            while ($row_carrinho = $result_carrinho->fetch(PDO::FETCH_ASSOC)) {
                extract($row_carrinho);

                $lista_carrinho["records"][$codigo] = [
                    "codigo" => $codigo,
                    "pedido" => $pedido,
                    "produto" => $produto,
                    "quantidade" => $quantidade,
                    "total" => $total,
                    "valor" => $valor,
                    "tipo_imposto" => $tipo_imposto,
                    "nome" => $nome
                ];
            }
            http_response_code(200);

            echo json_encode($lista_carrinho);
        }
    }
}

$carrinho = new carrinho();