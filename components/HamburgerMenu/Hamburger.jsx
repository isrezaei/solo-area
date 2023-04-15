import {css} from "@emotion/css";
import {slide as Menu} from "react-burger-menu";
import {Sidebar} from "../Sidebar/Sidebar";
import {useRecoilState, useRecoilValue} from "recoil";
import {HAMBURGER_MENU} from "../../atoms/atoms";

const style = css`
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
  }

  /* Color/shape of burger icon bars */

  .bm-burger-bars {
    background: #373a47;
  }

  /* Color/shape of burger icon bars on hover*/

  .bm-burger-bars-hover {
    background: #a90000;
  }

  /* Position and sizing of clickable cross button */

  .bm-cross-button {
    height: 24px;
    width: 24px;

  }

  /* Color/shape of close button cross */

  .bm-cross {
    background: #bdc3c7;
  }

  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */

  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */

  .bm-menu {
    background: #101010;
    padding: 2em;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  /* Morph shape necessary with bubble or elastic */

  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */

  .bm-item-list {
    padding: 0;
  }


  /* Styling of overlay */

  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }

,
`


const Hamburger = ({SSR_GET_SUBSCRIBED_LIST}) => {

    const [openHamburger , setOpenHamburger] = useRecoilState(HAMBURGER_MENU)

    const handleMenuStateChange = () => {
        setOpenHamburger(prev => !prev);
    };

    return (
        <Menu
            isOpen={openHamburger}
            onOpen={handleMenuStateChange}
            onClose={handleMenuStateChange}
            className={style}
            height={"100vhs"}
            width={"100%"}>

            <Sidebar SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>

        </Menu>
    );
};

export default Hamburger;