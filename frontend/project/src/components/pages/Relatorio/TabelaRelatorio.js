import {useEffect, useState} from "react";
import styles from "./Relatorio.module.css";
import {FaEye} from "react-icons/fa";
import {createRoot} from "react-dom/client";
import ItensVenda from "./ItensVenda";

function TabelaRelatorio() {

    const [data, setData] = useState([]);
    const getRelatorio = async () => {
        fetch('http://localhost/desafio_pdv/DbSelect/relatorio.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.records);
            })
    }
    useEffect(() => {
        getRelatorio();
    }, [])

    const exibirVenda = async (codigoVenda) => {
        const container = document.getElementById("dados")
        const root = createRoot(container)
        root.render(<ItensVenda codigo={codigoVenda}/>)
    }

    return (
        <div className={styles.relatorio} id="dados">
            <h1 className={styles.title}>Relatório</h1>
            <div className={styles.scroll}>
                <table>
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Data</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(data).map(relatorio => (
                        <tr key={relatorio.codigo}>
                            <td>{relatorio.codigo}</td>
                            <td>{relatorio.data}</td>
                            <td>R${relatorio.total}</td>
                            <td className={styles.visualizar}><button onClick={() => exibirVenda(relatorio.codigo)}><FaEye/></button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabelaRelatorio