import React, {useEffect, useState} from "react";
import styles from "./NovoTipo.module.css";
import {FaPlus} from "react-icons/fa";
export const NovoTipo = () => {

    const [data, setData] = useState([]);

    const getTipos = async () => {
        fetch('http://localhost/desafio_pdv/tipos.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records);
            })
    }

    useEffect(() => {
        getTipos();
    }, [])



    const [tipo, setTipo] = useState({
        nome: '',
        percentual_imposto: ''
    });


    const valorInput = (e) => setTipo({ ...tipo, [e.target.name]: e.target.value });

    const cadTipo = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(tipo));

        await fetch("http://localhost/desafio_pdv/novoTipo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                window.location.reload(false);
            }).catch(() => {
                console.log("Erro: Não foi possível cadastrar.");
            }
        );
    }



    return (
        <div className={styles.novoTipo}>
            <h1 className={styles.title}><FaPlus/> Novo Tipo </h1>

            <form onSubmit={cadTipo} >
                <label>Nome: </label>
                <input type="text" name="nome" placeholder="Nome do Tipo" onChange={valorInput}/>

                <label>Imposto: </label>
                <input type="text" name="percentual_imposto" placeholder="Imposto" onChange={valorInput}/>

                <button type="submit" className={styles.btn_cadastrar}>Cadastrar</button>

            </form>
        </div>
    )
}