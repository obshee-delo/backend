import { JwtToken } from "@backend/security/security.types";


export interface AuthorizationResponse {
    token: JwtToken
}
