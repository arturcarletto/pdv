import React, { useState, useEffect } from 'react';
import styles from './NovoItem.module.css'

function NovoItem() {

    const [produtos, setProdutos] = useState([]);
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

    const getProdutos = async () => {
        fetch('http://localhost/desafio_pdv/DbSelect/Produtos.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setProdutos(responseJson.records);
            })
    }
    useEffect(() => {
        getProdutos();
    }, [])

    const [item, setItem] = useState({
        pedido: '',
        produto: '',
        quantidade:'1',
        valor: '',
        total: '',
    });


    const cadItem = async (e) => {
        e.preventDefault();
        await fetch("http://localhost/desafio_pdv/DbInsert/novoItem.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( item )
        })
            .then((response) => response.json())
        window.location.reload();
    }

    const valorSelect = (e) => setItem({
        pedido: parseInt(pedido.codigo)+1,
        produto: e.target.options[e.target.selectedIndex].id,
        valor : parseFloat(e.target.value).toFixed(2),
        total: (parseFloat(e.target.value)*item.quantidade).toFixed(2),
        quantidade: item.quantidade,
        tipo: e.target.options[e.target.selectedIndex].getAttribute('name'),
    });

    const quantidadeInput = (e) => setItem({
        ...item, quantidade: e.target.value,
        total: (e.target.value * item.valor).toFixed(2)
    });

    return(
        <>
            <div className={styles.novoItem}>
                <h1 className={styles.title}>Novo Item</h1>
                <form onSubmit={cadItem}>
                    <div>
                        <label htmlFor="produto">Produto: </label>
                        <select name="valor" onChange={valorSelect} id="produto" defaultValue="escolha">
                            <option value="escolha" disabled>Escolha o Produto</option>
                            {Object.values(produtos).map(produto => (
                                <option key={produto.codigo} id={produto.codigo} value={produto.valor} name={produto.tipo}>
                                    {produto.codigo} - {produto.nome}
                                </option>
                            ))}
                        </select>
                        <div className={styles.form_inline}>
                            <label htmlFor="quantidade">Quantidade: </label>
                            <input type="number" placeholder={item.quantidade} name="quantidade" className={styles.quantidade} onChange={quantidadeInput} min="1"/>

                            <label htmlFor="produto-valor">Valor un: </label>
                            <input type="number" placeholder={`R$ ${item.valor}`} readOnly className={styles.valor}/>

                            <label htmlFor="produto-total">Total: </label>
                            <input type="number" placeholder={`R$ ${item.total}`} name="total" readOnly className={styles.total} />
                        </div>
                        <button type="submit" className={styles.btn_inserir}>Inserir</button>
                    </div>
                </form>
            </div>
        </>
    )



}

export default NovoItem