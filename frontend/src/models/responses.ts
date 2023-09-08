export interface TokenResponse{
    token: string;
}

export interface ResultResponse<T>{
    result: T,
    message?: string
}
