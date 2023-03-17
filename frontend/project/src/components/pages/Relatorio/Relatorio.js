import TabelaRelatorio from "./TabelaRelatorio";
import image from "../../imgs/relatorio.png";

function Relatorio() {

    return (
        <>
            <TabelaRelatorio/>

            <div>
                <img src={image} alt="relatorio"/>
            </div>
        </>
    )
}
export default Relatorio