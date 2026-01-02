export interface ApiError {
    error: string
}

export interface ApiSuccess {
    message: string
}

export interface JwtPayload {
    user_id: number
    username: string
    exp: number
}
