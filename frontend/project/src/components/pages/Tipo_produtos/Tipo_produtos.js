import React from "react";
import {NovoTipo} from "./NovoTipo";
import styles from "../Produtos/Produtos.module.css";
import TabelaTipos from "./TabelaTipos";
import EditForm from "./EditForm";

export default  function Tipo_produtos() {

    return (
        <div className={styles.background}>
            <div className={styles.novoTipo}>
                <NovoTipo/>
            </div>
            <div className={styles.left}>
                <TabelaTipos/>
            </div>

            <div className={styles.vl}></div>
            
            <div className={styles.right}>
                <EditForm />
            </div>
        </div>
    )
}
