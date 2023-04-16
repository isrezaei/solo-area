import {slide as Menu} from "react-burger-menu";
import {Sidebar} from "../Sidebar/Sidebar";
import {useRecoilState, useRecoilValue} from "recoil";
import {HAMBURGER_MENU} from "../../atoms/atoms";
import {style} from "./style";


const Hamburger = ({SSR_GET_SUBSCRIBED_LIST}) => {

    const [openHamburger, setOpenHamburger] = useRecoilState(HAMBURGER_MENU)

    const handleMenuStateChange = () => {
        setOpenHamburger(prev => !prev);
    };

    return (
        <Menu
            isOpen={openHamburger}
            onOpen={handleMenuStateChange}
            onClose={handleMenuStateChange}
            className={style}
            width={"20rem"}
            height={"100vhs"}>

            <Sidebar
                SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>

        </Menu>
    );
};

export default Hamburger;