import s from './PaymentFailure.module.css';
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";


const PaymentFailure = () => {

    const search = window.location.search;
    const cookies = new Cookies();
    const send = cookies.get('turnToPost');
    const id = cookies.get('idProfessional')

    const history = useHistory();

    const deleteParams = () => {
        if (search) {
            window.location=window.location.origin + window.location.pathname
        }
    }

    const handleNavLinkClick = () => {
        history.push(`/profTT/${id}`);
    }


return(
    <div>
        {deleteParams()}
        <NavbarTwo/>
        <div className={s.pageContainer}>
            <div className={s.succesContainer}>
                <div className={s.textCont}>
                    <h2 className={s.text}>El pago no pudo ser realizado</h2>
                    <iconify-icon icon="charm:circle-cross" width="30" height="30"></iconify-icon>
                </div>
                <h3>Tu turno no pudo ser registrado</h3>
            </div>
            <botton className={s.link} to="#" onClick={handleNavLinkClick}>Tomar otro turno</botton> 
        </div>
    </div>
)
}

export default PaymentFailure;