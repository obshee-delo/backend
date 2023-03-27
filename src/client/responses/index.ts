import { Jwt } from "@backend/security/security.types";


export type AuthorizationResponse = {
    token: Jwt,
    secret: string
}
