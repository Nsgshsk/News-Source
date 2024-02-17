export interface UserToken {
    token_type: string,
    exp: number,
    iat: number,
    jti: string,
    user_id: number,
    first_name: string
}