export type LoginModel = {
    username: string;
    password: string;
}

export type RegisterModel = LoginModel & {
    email: string;
}
