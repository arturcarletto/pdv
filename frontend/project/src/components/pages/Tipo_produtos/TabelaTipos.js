import styles from "../Produtos/Produtos.module.css";
import {FaTrash} from "react-icons/fa";
import React, {useEffect, useState} from "react";

function TabelaTipos() {

    const [data, setData] = useState([]);
    const getTipos = async () => {
        fetch('http://localhost/desafio_pdv/DbSelect/tipos.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records);
            })
    }
    useEffect(() => {
        getTipos();
    }, [])

    const apagarTipo = async (codigoTipo) => {
        await fetch("http://localhost/desafio_pdv/DbDelete/deleteTipo.php?codigo=" + codigoTipo)
            .then((response) => response.json())
            .then( () => {
                getTipos();
            })
    };

    return (
        <div className={styles.tabela}>
            <h1 className={styles.title}>Tipos</h1>
            <div className={styles.scroll}>
                <table>
                    <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Percentual de imposto</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map(tipo => (
                        <tr key={tipo.codigo}>
                            <td>{tipo.codigo}</td>
                            <td>{tipo.nome}</td>
                            <td>{`${tipo.percentual_imposto}%`}</td>
                            <td>
                                <button onClick={() => apagarTipo(tipo.codigo)} className={styles.apagar}><FaTrash/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabelaTipos