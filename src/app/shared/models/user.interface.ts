
export interface Roles{
    editor?: boolean;
    admin?: boolean;
}

export interface UserI{

    email: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    uid?: string;
    phoneNumber?: string; 
    roles?: Roles;

}