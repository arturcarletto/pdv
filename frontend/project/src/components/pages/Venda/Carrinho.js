import React, {useEffect, useState} from "react";
import styles from "./Carrinho.module.css";
import {FaCartArrowDown, FaTrash} from "react-icons/fa";


function Carrinho() {

    const [data, setData] = useState([]);
    const [pedido, setPedido] = useState([]);

    const getPedido = async () => {
        fetch('http://localhost/desafio_pdv/DbSelect/pedido.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setPedido(responseJson.ultimo_codigo);
            })
    }
    useEffect(() => {
        getPedido();
    } , [])

    const produtos = Object.values(data).filter(carrinho => carrinho.pedido === pedido.codigo+1)
    const getCarrinho = async () => {
        fetch('http://localhost/desafio_pdv/DbSelect/carrinho.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records);
            })
    }
    useEffect(() => {
        getCarrinho();
    }, [])


    const apagarItem = async (codigoItem) => {
        await fetch("http://localhost/desafio_pdv/DbDelete/deleteItem.php?codigo=" + codigoItem)

            .then((response) => response.json())
            .then(() => {
                getCarrinho();
            })
    };

    const concluirVenda = async (e) => {
        e.preventDefault()

        await fetch("http://localhost/desafio_pdv/DbInsert/novoPedido.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ total })
        })
            .then((response) => response.json())
            .then(() => {
                window.location.reload();
            })
    }

    let total = 0;
    Object.values(produtos).map(produto => (
        total += parseInt(produto.total)
    ))
    let impostos = 0;
    Object.values(produtos).map(produto => (
        impostos += (parseInt(produto.valor) * produto.tipo_imposto / 100)
    ))

    return (
        <div className={styles.carrinho}>
            <h1 className={styles.title}>Carrinho <FaCartArrowDown/></h1>
            <div className={styles.scroll}>
                <table>
                    <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor un.</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(produtos).map(produto => (
                        <tr key={produto.codigo}>
                            <td>{produto.produto} - {produto.nome}</td>
                            <td>{produto.quantidade}</td>
                            <td>R$ {produto.valor}</td>
                            <td>R$ {produto.total}</td>
                            <td><button onClick={() => apagarItem(produto.codigo)} className={styles.apagar}><FaTrash/></button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className={styles.imposto}>
                    <h3>Imposto Estimado: <span>R${impostos.toFixed(2)}</span></h3>
                </div>
            </div>

            <button  type="submit" onClick={concluirVenda} className={styles.btn_concluir}>Concluir Venda</button>

        </div>
    )



}

export default Carrinho;