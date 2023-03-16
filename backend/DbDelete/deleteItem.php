<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../Conexao.php';

class deleteItem {

    public function __construct() {
        $this->deleteItem();
    }

    function deleteItem()  {

        $conn = new Conexao();
        $conn = $conn->conn();

        $codigo = $_GET['codigo'];

        $query_produto = "DELETE FROM produto_pedido WHERE codigo = :codigo";
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
    }
}
$item = new deleteItem();