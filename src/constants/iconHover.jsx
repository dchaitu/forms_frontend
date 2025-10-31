import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

const IconHover = (props) => {
    const {icon, text, onClick} = props
    return (
        <div className="mx-3.5 cursor-pointer" onClick={onClick}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="self-start">
                        {icon}
                    </div>
                </TooltipTrigger>
                {text &&(
                    <TooltipContent side="top" align="center" className="z-50 p-0 bg-gray-400 text-white border-0">
                        <p className="px-2 py-1 text-xs">{text}</p>
                    </TooltipContent>
                )}

            </Tooltip>
        </div>
    )
}

export default IconHover;
