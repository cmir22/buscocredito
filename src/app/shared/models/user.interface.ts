
export interface userRol{
    userRol?: boolean;   
}

export interface adminRol{
    adminRol?: boolean;   
}

export interface UserI{

    email: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    uid?: string;
    phoneNumber?: string; 
    userRol?: userRol;
    adminRol?: adminRol;
    

}