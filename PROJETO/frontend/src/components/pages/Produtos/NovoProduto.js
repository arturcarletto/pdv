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
        console.log(JSON.stringify(produto));

        await fetch("http://localhost/desafio_pdv/novoProduto.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ produto })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                window.location.reload(false);
            })

    }




    return (
        <div  className={styles.novoProduto}>
            <h1 className={styles.title}>
               <FaPlus/> Novo Produto
            </h1>

            <form onSubmit={cadProduto}>
                <label>Nome: </label>
                <input type="text" name="nome" placeholder="Nome do produto" onChange={valorInput}/>
                <label>Valor: </label>
                <input type="number" name="valor" placeholder="Valor do produto" onChange={valorInput}/>


                <label>Tipo: </label>
                <select name="tipo" onChange={valorInput}>
                    <Tipos/>
                </select>


                <button type="submit" className={styles.btn_cadastrar}>Cadastrar</button>

            </form>
        </div>
    )
}