import styles from "./Produtos.module.css";
import {FaEdit} from "react-icons/fa";
import Tipos from "./Tipos";
import React, {useEffect, useState} from "react";

function EditForm() {

    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');

    const [data, setData] = useState([]);
    const getProdutos = async () => {
        fetch('http://localhost/desafio_pdv/DbSelect/Produtos.php')
            .then((response) => response.json())
            .then((responseJson) => (
                setData(responseJson.records)
            ));
    }

    useEffect(() => {
        getProdutos();
    }, [])

    const editProduto = async (e) => {
        e.preventDefault();
        await fetch("http://localhost/desafio_pdv/DbUpdate/editarProduto.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({codigo, nome, valor, tipo})
        }).then((response) => response.json())
            .then(() => {
                window.location.reload();
            })
    }

    const selectInput = (e) => {
        setCodigo(e.target.options[e.target.selectedIndex].id)
        setNome(e.target.options[e.target.selectedIndex].getAttribute('name'))
        setValor(e.target.value)
        setTipo(e.target.options[e.target.selectedIndex].getAttribute('type'))
    }

    return (
        <div className={styles.editForm}>
            <h1 className={styles.title}>Edição <FaEdit/></h1>
            <form onSubmit={editProduto}  >
                <label htmlFor="codigo">Produto: </label>
                <select name="codigo" onChange={selectInput} defaultValue="escolha">
                    <option value="escolha" disabled>Produto para edição</option>
                    {Object.values(data).map(produto => (
                        <option key={produto.codigo}  value={produto.valor} id={produto.codigo} name={produto.nome} type={produto.tipo}>{produto.codigo} - {produto.nome}</option>
                    ))}
                </select><br/><br/>

                <label htmlFor="nome">Nome: </label>
                <input type="text" name="nome" placeholder="Nome para edição" onChange={e => setNome(e.target.value)}
                       value={nome}/>

                <br/>
                <br/>

                <label>Valor: </label>
                <input type="number" step="0.01" name="valor" placeholder="Novo valor"
                       onChange={e => setValor(e.target.value)} value={valor}/>

                <br/>
                <br/>

                <label>Tipo: </label>
                <select name="tipo" onChange={e => setTipo(e.target.options[e.target.selectedIndex].id)} defaultValue="escolha" >
                    <option disabled value="escolha">Tipo para edição</option>
                    <Tipos/>
                </select>

                <br/>
                <br/>

                <button type="submit" className={styles.editar}>Editar</button>
            </form>
        </div>
    )
}

export default EditForm;