import {useEffect, useState} from "react";
import styles from "./Relatorio.module.css";
import {MdKeyboardReturn} from "react-icons/md";

function ItensVenda(codigoVenda) {

    const [venda, setVenda] = useState([]);
    const getVenda = async (codigoVenda) => {
        fetch("http://localhost/desafio_pdv/DbSelect/exibirVenda.php?codigo=" + codigoVenda)
            .then((response) => response.json())
            .then((responseJson) => {
                setVenda(responseJson.records)
            })
    }
    useEffect(() => {
        getVenda(codigoVenda.codigo)
    } , [getVenda])

    return (
        <div>
            <button className={styles.voltar} onClick={() => window.location.reload()}><MdKeyboardReturn/>VOLTAR</button>
            <h2 className={styles.title}>Itens da venda </h2>
            <div className={styles.scroll}>
                <table>
                    <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(venda).map(venda => (
                        <tr key={venda.codigo}>
                            <td>{venda.nome}</td>
                            <td>{venda.quantidade}</td>
                            <td>R${venda.total}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ItensVenda