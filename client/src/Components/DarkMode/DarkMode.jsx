import './DarkMode.css';
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from '../../Redux/Actions';


export default function DarkMode (props) {

    const dispatch = useDispatch(); 
    const darkMode = useSelector((state) => state.darkMode)

    const handlerTheme = () => {
        if(darkMode === false){
        dispatch(changeTheme(true))
        }else{
            dispatch(changeTheme(false))
        }
    }

    return(
        <div className='darkModeContainer'>
            <div className='text-container'>
                <iconify-icon icon="ri:moon-fill" width="20" height="20"></iconify-icon>
                <h1 className='theme-text'>DARK MODE</h1>
            </div>
            <div class="switch-button">
                <input onChange={handlerTheme} type="checkbox" name="switch-button" id="switch-label" class="switch-button__checkbox"/>
                <label for="switch-label" class="switch-button__label"></label>
            </div>
        </div>
    )
}