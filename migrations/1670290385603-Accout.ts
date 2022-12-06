// @ts-nocheck

import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Account1670290385603 {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    balance: decimal

    @Column()
    user_id: string

    @Column({ nullable: true })
    created_at: Date

    @Column({ nullable: true })
    updated_at: Date
}