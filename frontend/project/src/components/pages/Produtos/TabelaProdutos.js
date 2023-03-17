import React, {useEffect, useState} from "react";
import styles from "./Produtos.module.css";
import {FaTrash} from "react-icons/fa";

function TabelaProdutos() {

    const [data, setData] = useState([]);
    const getProdutos = async () => {
        fetch('http://localhost/desafio_pdv/DbSelect/Produtos.php')
            .then((response) => response.json())
            .then((responseJson) => (
                setData(responseJson.records)
            ));
    }
    useEffect(() => {
        getProdutos();
    }, [])

    const apagarProduto = async (codigoProduto) => {
        await fetch("http://localhost/desafio_pdv/DbDelete/deleteProduto.php?codigo=" + codigoProduto)

            .then((response) => response.json())
            .then( () => {
                getProdutos();
            })
    };

    return (
        <div className={styles.tabela}>
            <h1 className={styles.title}>Produtos</h1>
            <div className={styles.scroll}>
                <table>
                    <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map(produto => (
                        <tr key={produto.codigo}>
                            <td>{produto.codigo}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.valor}</td>
                            <td>{produto.tipo}</td>
                            <td>
                                <button onClick={() => apagarProduto(produto.codigo)} className={styles.apagar}><FaTrash/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default TabelaProdutos