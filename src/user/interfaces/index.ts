export interface UserLogin {
    email: string,
    password: string
}

export interface UserAuthorization {
    id: string
}

export interface UserVerifyEmail {
    email: string
}

export interface UserConfirmRegistration {
    emailVerificationCode: string
}

export interface UserResetPassword {
    email: string
}

export interface UserConfirmPasswordReset {
    emailVerificationCode: string
}

export interface UserHashPassword {
    password: string
}

export interface UserSetPassword {
    id: string,
    password: string
}

export interface UserVerifyPassword {
    password: string
}
