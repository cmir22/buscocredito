
export interface userRol{
    userRol?: any;   
}

export interface adminRol{
    adminRol?: any;   
}

export interface childRol{
    childRol?: any;   
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
    childRol?: childRol;
    emailEmpresa?: string
    

}