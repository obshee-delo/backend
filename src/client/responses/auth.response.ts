import { JwtToken } from "@backend/security/security.types";


export type AuthorizationResponse = {
    token: JwtToken,
    secret: string
}
