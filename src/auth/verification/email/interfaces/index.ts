export interface EmailVerificationVerify {
    id: string,
    email: string,
    action: string,
    purpose: string,
    gatewayUrl: string
}

export interface EmailVerificationConfirm {
    code: string
}

export interface EmailVerificationRetry {
    id: string,
    action: string
}

export interface EmailVerificationCanVerify {
    id: string
}
