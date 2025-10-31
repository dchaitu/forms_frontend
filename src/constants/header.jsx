import HeaderIcons from "@/constants/headerIcons";
import FormActionsDropdown from "@/constants/formActionsDropdown";
import {NavLink, useNavigate} from 'react-router-dom';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import PublishDialog from "@/constants/publishDialog";
import {useUser} from "@/context/UserContext";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {API_BASE_URL} from "@/constants/constants";

const Header = (props) => {
    const {formId, responseLink} = props;
    const {user} = useUser();

    const getNavLinkClass = ({ isActive }) => {
        const activeStyle = "text-violet-800 border-b-2 border-violet-800 px-4 py-2 text-sm font-medium"
        const inactiveStyle = "text-gray-500 hover:text-violet-800 px-4 py-2 text-sm font-medium"
        return  isActive ? activeStyle: inactiveStyle;
    }
    console.log("user Details ",user)
    const navigate = useNavigate();
    const handleCreateNewForm = async () => {
     try{
        const resp =   await fetch(`${API_BASE_URL}/form/create`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify({
             title: "New Form",
             description: "New Form Description",
         }),
     });
     const data = await resp.json();
     console.log("Created new form: ",data);
     setTimeout(()=>{
         navigate(`/${data.id}`);

     },500);
     if(!resp.ok) {
         throw new Error("Failed to create form");
     }
     }
     catch (error) {
         console.error("Error creating form: ", error);
     }

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
                                <DropdownMenuItem onSelect={handleCreateNewForm}>
                                    Create New Form
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
                                    className={`${responseLink ? 'bg-white border text-violet-800 border-violet-800 hover:bg-violet-100' : 'bg-violet-800 text-white hover:bg-violet-600'}
                                    rounded-md font-semibold
                                    px-6 py-2 mx-2 text-xs `}>
                                    {responseLink ? 'Published' : 'Publish'}
                                </button>
                            </DialogTrigger>
                            <PublishDialog formId={formId} responseLink={responseLink}/>
                        </Dialog>

                        <FormActionsDropdown />
                        <Avatar>
                            <AvatarImage src={user?.pic_url} alt={user?.username || 'User'} />
                            <AvatarFallback>{user?.username?.charAt(0) || 'U'}</AvatarFallback>
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