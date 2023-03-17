import React, {useState} from "react";
import styles from "./NovoTipo.module.css";
import {FaPlus} from "react-icons/fa";
export const NovoTipo = () => {

    const [tipo, setTipo] = useState({
        nome: '',
        percentual_imposto: ''
    });

    const valorInput = (e) => setTipo({ ...tipo, [e.target.name]: e.target.value });

    const cadTipo = async (e) => {
        e.preventDefault();
        await fetch("http://localhost/desafio_pdv/DbInsert/novoTipo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo })
        })
            .then((response) => response.json())
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <div className={styles.novoTipo}>
            <h1 className={styles.title}><FaPlus/> Novo Tipo </h1>

            <form onSubmit={cadTipo} >
                <label>Nome: </label>
                <input type="text" name="nome" placeholder="Nome do Tipo" onChange={valorInput} required/>

                <label>Imposto: </label>
                <input type="number" name="percentual_imposto" step="0.01" placeholder="Imposto" onChange={valorInput} required/>

                <button type="submit" className={styles.btn_cadastrar}>Cadastrar</button>

            </form>
        </div>
    )
}