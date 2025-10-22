import HeaderIcons from "@/constants/headerIcons";
import FormActionsDropdown from "@/constants/formActionsDropdown";
import { NavLink } from 'react-router-dom';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Header = () => {
    // className({ isActive, isPending, isTransitioning })
    // React Router automatically calls your className function with a special object
    // that includes { isActive, isPending, isTransitioning }

    const getNavLinkClass = ({ isActive }) => {
        console.log("NavLink is active ",isActive);

        const activeStyle = "text-violet-800 border-b-2 border-violet-800 px-4 py-2 text-sm font-medium"
        const inactiveStyle = "text-gray-500 hover:text-violet-800 px-4 py-2 text-sm font-medium"
        return  isActive ? activeStyle: inactiveStyle;
    }
    return (
        <div id="header" className="bg-white">
            <div className="flex flex-col">
            <div className="flex flex-1 justify-between items-center">
                <div className="flex flex-row w-10 p-2 m-2">
                    <img src="/images/forms_logo.png" alt="forms_logo"/>
                    <div className="self-center mx-2">
                        <h1>Forms</h1>
                    </div>
                </div>


                <div className="flex justify-end items-center">
                    <HeaderIcons/>
                    <button className="bg-violet-800 hover:bg-violet-600 rounded-md font-semibold px-6 py-2 mx-2 text-xs text-white">Publish</button>

                    <FormActionsDropdown />
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="flex flex-grow justify-center">
                <NavLink to="/" className={getNavLinkClass}>
                    Questions
                </NavLink>
                <NavLink to="/responses" className={getNavLinkClass}>
                    Responses
                </NavLink>
                <NavLink to="/settings" className={getNavLinkClass}>
                    Settings
                </NavLink>
            </div>
            </div>

        </div>
    );
}
export default Header;