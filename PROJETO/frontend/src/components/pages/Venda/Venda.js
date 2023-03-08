import styles from './Venda.module.css'
import NovoItem from './NovoItem';
import Carrinho from './Carrinho';

function Venda() {


    return (
        <div>

            <NovoItem/>

            <div className={styles.vl}></div>

            <Carrinho/>

        </div>
    )
}

export default Venda;