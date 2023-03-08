import {Link} from "react-router-dom";
import Container from "./Container";
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <ul className={styles.list}>
                    <li className={styles.title}>
                        <Link to="/">Loja do Mirante</Link>
                    </li>
                    <li>
                        <Link to="/Venda">Venda</Link>
                    </li>
                    <li >
                        <Link to="/Produtos">Produtos</Link>
                    </li>
                    <li>
                        <Link to="/Tipos">Tipos de produtos</Link>
                    </li>
                    <li>
                        <Link to="/Relatorio">Relatorio</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar