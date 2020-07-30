
export interface Rol{
    adminRol?: boolean;
    userRol?: boolean;
    childRol?: boolean;
    userChildRol?: boolean;
}

export interface UserI{

    email: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    uid?: string;
    phoneNumber?: string; 
    rol?: Rol;

}