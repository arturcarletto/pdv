import styles from "../Produtos/Produtos.module.css";
import {FaEdit} from "react-icons/fa";
import Tipos from "../Produtos/Tipos";
import React, {useState} from "react";

function EditForm() {

    const [nome, setNome] = useState('');
    const [codigo, setCodigo] = useState('');
    const [percentual_imposto, setPercentual_imposto] = useState('');
    const editTipo = async (e) => {
        e.preventDefault();
        await fetch("http://localhost/desafio_pdv/DbUpdate/editarTipo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo, nome, percentual_imposto })
        }).then((response) => response.json())
            .then(() => {
                window.location.reload();
            })
    }

    const selectInput = (e) => {
        setCodigo(e.target.options[e.target.selectedIndex].id)
        setNome(e.target.options[e.target.selectedIndex].getAttribute('name'))
        setPercentual_imposto(e.target.options[e.target.selectedIndex].getAttribute('value'))
    }

    return (
        <div className={styles.editForm}>
            <h1 className={styles.title}>Edição <FaEdit/></h1>
            <form onSubmit={editTipo} >
                <label>Tipo: </label>
                <select name="tipo" onChange={selectInput} defaultValue="escolha">
                    <option value="escolha" disabled>Tipo para edição</option>
                    <Tipos/>
                </select>

                <br/>
                <br/>

                <label htmlFor="nome">Nome: </label>
                <input type="text" name="nome" placeholder="Novo nome" onChange={e => setNome(e.target.value)}
                       value={nome}/>

                <br/>
                <br/>

                <label htmlFor="imposto">Percentual de Imposto: </label>
                <input type="number" step="0.1" name="imposto" placeholder="Novo imposto" onChange={e => setPercentual_imposto(e.target.value)}
                       value={percentual_imposto}/>
                <br/>
                <br/>

                <button type="submit" className={styles.editar}>Editar</button>
            </form>

        </div>
    )
}
export default EditForm