import styles from './Venda.module.css'
import NovoItem from './NovoItem';
import Carrinho from './Carrinho';

function Venda() {


    return (
        <div>
            <div className={styles.left}>
                <NovoItem/>
            </div>
            <div className={styles.vl}></div>

            <div className={styles.right}>
                <Carrinho/>
            </div>

        </div>
    )
}

export default Venda;