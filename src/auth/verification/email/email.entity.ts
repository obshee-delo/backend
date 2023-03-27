import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'verification' })
export class EmailVerification {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    /**
     * Unique identifier to maintain delay time for the same user.
     */
    @Column('varchar')
    id: string;

    /**
     * Action ID. (like "registration" or "resetPassword")
     */
    @Column('varchar')
    action: string;

    /**
     * Generated verification code.
     */
    @Column('varchar')
    code: string;
    
    /**
     * Human-readable reason of verification.
     */
    @Column('varchar')
    purpose: string;

    /**
     * Target email.
     */
    @Column('varchar')
    email: string;

    /**
     * Gateway address to forward the request to the server.
     */
    @Column('varchar')
    gatewayUrl: string;

    /**
     * Last send time in unix milliseconds.
     */
    @Column('integer', {
        default: Math.floor(Date.now() / 1000)
    })
    lastSendTime: number = Math.floor(Date.now() / 1000);
}
