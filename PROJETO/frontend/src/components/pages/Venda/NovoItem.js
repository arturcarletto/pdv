import React, { useState, useEffect } from 'react';
import styles from './NovoItem.module.css'
import produtos from "../Produtos/Produtos";

function NovoItem() {

    const [data, setData] = useState([]);
    const getProdutos = async () => {
        fetch('http://localhost/desafio_pdv/index.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records);
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
        e.preventDefault()
        console.log(JSON.stringify(item));

        await fetch("http://localhost/desafio_pdv/novoItem.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item  })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
    }




    const valorSelect = (e) => setItem({
        produto: e.target.options[e.target.selectedIndex].index,
        valor : e.target.value,
        total: (e.target.value * item.quantidade).toFixed(2),
        quantidade: item.quantidade
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
                        <div className={styles.input_produto}>
                            <label htmlFor="produto">Produto: </label>
                            <select name="valor" onChange={valorSelect} id="produto">
                                <option disabled selected>Escolha o Produto</option>
                                {Object.values(data).map(produto => (
                                    <option key={produto.codigo} value={produto.valor}>
                                        {produto.codigo} - {produto.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
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