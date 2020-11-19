
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
    emailEmpresa?: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    uid?: string;
    phoneNumber?: string; 
    userRol?: userRol;
    adminRol?: adminRol;
    childRol?: childRol;
<<<<<<< HEAD

=======
    emailEmpresa?: string
>>>>>>> 625590f3c069fde936a7cb00857d9c0e248fa499
    

}