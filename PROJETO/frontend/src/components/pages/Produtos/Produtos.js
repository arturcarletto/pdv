import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {NovoProduto} from "./NovoProduto";
import styles from './Produtos.module.css';
import Tipos from "./Tipos";
import {FaEdit, FaTrash} from "react-icons/fa";

function Produtos() {

    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        fetch('http://localhost/desafio_pdv/index.php')
            .then((response) => response.json())
            .then((responseJson) => (
                setData(responseJson.records)
            ));
    }

    useEffect(() => {
        getProdutos();
    }, [])


    const apagarProduto = async (codigoProduto) => {
        await fetch("http://localhost/desafio_pdv/deleteProduto.php?codigo=" + codigoProduto)

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
                getProdutos();
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    message: 'Erro: Não foi possível apagar.'
                })
            });
    };



    const editProduto = async (e) => {
        e.preventDefault();
        await fetch("http://localhost/desafio_pdv/editarProduto.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({codigo, nome, valor, tipo})
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
                    message: "Produto não editado com sucesso, tente mais tarde!"
                });
            });
    }


    return (
        <div className={styles.background}>
            {status.type === 'erro' ? <p>{status.message}</p> : ''}
            {status.type === 'success' ? <p>{status.message}</p> : ''}
            <NovoProduto/>
            <div  className={styles.produtos}>
                <h1 className={styles.title}>Produtos</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Tipo</th>
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

            <div className={styles.vl}></div>

            <div className={styles.editForm}>
                <h1 className={styles.title}>Edição <FaEdit/></h1>
                <form onSubmit={editProduto}  >
                    <label htmlFor="codigo">Produto: </label>
                    <select name="codigo" onChange={e => setCodigo(e.target.value)}>
                        <option value="">Selecione o produto</option>
                        {Object.values(data).map(produto => (
                            <option key={produto.codigo} value={produto.codigo}>{produto.codigo} - {produto.nome}</option>
                        ))}
                    </select><br/><br/>

                    <label htmlFor="nome">Nome: </label>
                    <input type="text" name="nome" placeholder="Nome do produto" onChange={e => setNome(e.target.value)}
                           value={nome}/><br/><br/>

                    <label>Valor: </label>
                    <input type="text" name="valor" placeholder="Valor do produto"
                           onChange={e => setValor(e.target.value)} value={valor}/><br/><br/>

                    <label>Tipo: </label>
                    <select name="tipo" onChange={e => setTipo(e.target.value)}>
                        <Tipos/>
                    </select>
<br/>
                    <button type="submit" className={styles.editar}>Editar</button>
                </form>

            </div>


        </div>
    )
}

export default Produtos