export interface UserProfile {
    user_id: number
    username: string
    created_at: string
}

export interface ChangePasswordRequest {
    old_password: string
    new_password: string
}
