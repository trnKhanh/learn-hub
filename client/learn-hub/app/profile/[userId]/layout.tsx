import { ProfileProvider } from "./profile-provider";

const ProfileIdLayout = ({
    children, params
} : {children : React.ReactNode, params : {userId : string}}) => {
    return ( 
        <ProfileProvider params={params}>
            {children}
        </ProfileProvider>
    );
}

export default ProfileIdLayout;