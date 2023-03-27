import { Jwt } from "@backend/security/security.types";


export interface UserRegistrationResponse {
    token: Jwt
}

export interface UserAuthorizationResponse {
    token: Jwt
}
