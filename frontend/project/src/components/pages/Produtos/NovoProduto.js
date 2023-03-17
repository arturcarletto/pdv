import styles from './NovoProduto.module.css'
import React, {useState} from "react";
import Tipos from './Tipos';
import {FaPlus} from "react-icons/fa";

export const NovoProduto = () => {

    const [produto, setProduto] = useState({
        nome: '',
        valor: '',
        tipo: ''
    });

    const valorInput = (e) => setProduto({ ...produto, [e.target.name]: e.target.value });

    const cadProduto = async (e) => {
        e.preventDefault();

        await fetch("http://localhost/desafio_pdv/DbInsert/novoProduto.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ produto })
        })
            .then((response) => response.json())
            .then(() => {
                window.location.reload();
            })
    }

    const valorSelect = (e) => {
        produto.tipo = e.target.options[e.target.selectedIndex].id;
    }

    return (
        <div  className={styles.novoProduto}>
            <h1 className={styles.title}>
                <FaPlus/> Novo Produto
            </h1>

            <form onSubmit={cadProduto}>
                <label>Nome: </label>
                <input type="text" name="nome" placeholder="Nome do produto" onChange={valorInput} required/>

                <label>Valor: </label>
                <input type="number" min="0.01" step="0.01" name="valor" placeholder="Valor do produto" onChange={valorInput} required/>

                <label>Tipo: </label>
                <select name="tipo" onChange={valorSelect} defaultValue="escolha" required>
                    <option disabled value="escolha">Selecione o tipo</option>
                    <Tipos/>
                </select>

                <button type="submit" className={styles.btn_cadastrar}>Cadastrar</button>

            </form>
        </div>
    )
}