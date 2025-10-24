import HeaderIcons from "@/constants/headerIcons";
import FormActionsDropdown from "@/constants/formActionsDropdown";
import { NavLink } from 'react-router-dom';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import PublishDialog from "@/constants/publishDialog";
import IconHover from "@/constants/iconHover";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const Header = (props) => {
    const {formId, responseLink} = props;

    const getNavLinkClass = ({ isActive }) => {
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

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="self-center mx-2 cursor-pointer">
                                    <h1>Forms</h1>
                                </div>
                            </DropdownMenuTrigger>
                                <DropdownMenuContent  className="bg-white">
                                <DropdownMenuItem>
                                    <NavLink to="/">Create New Form</NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink to="/responses">Responses</NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink to="/settings">Settings</NavLink>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                    <div className="flex justify-end items-center">
                        <HeaderIcons/>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button
                                    className={`${responseLink ? 'bg-white border text-violet-800 border-violet-800 hover:bg-violet-100' : 'bg-violet-800 hover:bg-violet-600'}
                                    rounded-md font-semibold
                                    px-6 py-2 mx-2 text-xs `}>
                                    {responseLink ? 'Published' : 'Publish'}
                                </button>
                            </DialogTrigger>
                            <PublishDialog formId={formId} responseLink={responseLink}/>
                        </Dialog>

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
                    <NavLink to={formId ? `/responses/${formId}` : '/'} className={getNavLinkClass}>
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