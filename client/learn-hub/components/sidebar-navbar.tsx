import NavbarItem from "./navbar-item";

const SidebarNavbar = () => {
    return ( 
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="flex flex-col cursor-pointer">
                <NavbarItem 
                label="My trips" 
                />
                <NavbarItem 
                label="My favorites" 
                />
            </div>
        </div>
    );
}

export default SidebarNavbar;