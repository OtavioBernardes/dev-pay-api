// @ts-nocheck

import { Column, PrimaryGeneratedColumn } from "typeorm"

export class User1670290376220 {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    created_at: Date

    @Column({ nullable: true })
    updated_at: Date
}