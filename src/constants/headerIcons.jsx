import IconHover from "./iconHover";
import {VscSymbolColor} from "react-icons/vsc";
import {IoEyeOutline} from "react-icons/io5";
import {BiRedo, BiUndo} from "react-icons/bi";
import {PiPaperclipHorizontalLight} from "react-icons/pi";
import {MdPersonAddAlt} from "react-icons/md";

const HeaderIcons = () => {
    const iconSize = 20;
    return (
        <div className="flex flex-1  justify-evenly items-center">

            <IconHover icon={<VscSymbolColor size={iconSize}/>} text="Customize Theme"/>
            <IconHover icon={<IoEyeOutline size={iconSize}/>} text="Preview"/>
            <IconHover icon={<BiUndo size={iconSize}/>} text="Undo"/>
            <IconHover icon={<BiRedo size={iconSize}/>} text="Redo"/>
            <IconHover icon={<PiPaperclipHorizontalLight size={iconSize}/>} text="Copy responder link"/>
            <IconHover icon={<MdPersonAddAlt size={iconSize}/>} text="Share"/>
        </div>
    )
}

export default HeaderIcons
