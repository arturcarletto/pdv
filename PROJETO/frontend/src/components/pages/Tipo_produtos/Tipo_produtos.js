import React, {useEffect, useState} from "react";
import {NovoTipo} from "./NovoTipo";
import styles from "../Produtos/Produtos.module.css";
import Tipos from "../Produtos/Tipos";
import {FaEdit, FaTrash } from "react-icons/fa";

export default  function Tipo_produtos() {

    const [nome, setNome] = useState('');
    const [codigo, setCodigo] = useState('');
    const [percentual_imposto, setPercentual_imposto] = useState('');

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

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


    const apagarTipo = async (codigoTipo) => {
        await fetch("http://localhost/desafio_pdv/deleteTipo.php?id=" + codigoTipo)

            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson) {
                    setStatus({
                        type: 'erro',
                        message: responseJson.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: responseJson.message
                    });
                }
                getTipos();
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    message: 'Erro: Não foi possível apagar.'
                })
            });
    };

    const editTipo = async (e) => {
        e.preventDefault();
        console.log(codigo, nome, percentual_imposto)
        await fetch("http://localhost/desafio_pdv/editarTipo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo, nome, percentual_imposto })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.erro) {
                    setStatus({
                        type: 'error',
                        message: responseJson.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: responseJson.message
                    });
                }
                window.location.reload(false);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: "Produto não editado, tente mais tarde!"
                });
            });
    }




    return (
        <div className={styles.background}>
            <NovoTipo/>
            <div className={styles.tipos}>
                <h1 className={styles.title}>Tipos</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Percentual de imposto</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map(tipo => (
                        <tr key={tipo.codigo}>
                            <td>{tipo.codigo}</td>
                            <td>{tipo.nome}</td>
                            <td>{tipo.percentual_imposto}</td>
                            <button onClick={() => apagarTipo(tipo.codigo)} className={styles.apagar}><FaTrash/></button>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.vl}></div>

            <div className={styles.editForm}>
                <h1 className={styles.title}>Edição <FaEdit/></h1>
                <form onSubmit={editTipo} >
                    <label>Tipo: </label>
                    <select name="tipo" onChange={e => setCodigo(e.target.value)}>
                        <Tipos/>
                    </select>
                    <br/><br/>
                    <label htmlFor="nome">Nome: </label>
                    <input type="text" name="nome" placeholder="Novo nome" onChange={e => setNome(e.target.value)}
                           value={nome}/><br/><br/>

                    <label htmlFor="imposto">Percentual de Imposto: </label>
                    <input type="text" name="imposto" placeholder="Novo imposto" onChange={e => setPercentual_imposto(e.target.value)}
                           value={percentual_imposto}/><br/><br/>

                    <button type="submit" className={styles.editar}>Editar</button>


                </form>

            </div>
        </div>
    )
}
