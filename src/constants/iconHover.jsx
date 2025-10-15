import {Tooltip, TooltipContent, TooltipTrigger} from "../components/ui/tooltip";

const IconHover = (props) => {
    const {icon, text} = props
    return (
        <div className="mx-3.5">
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="self-start">
                        {icon}
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="z-50  bg-black text-white border-0">
                    <p className="bg-gray-800 py-1 text-xs">{text}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default IconHover;
