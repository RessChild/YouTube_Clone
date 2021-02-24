import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column({ unique: true, nullable: false, length: 20 })
    email: string;
    @Column({ nullable: false })
    password: string;
    @Column({ nullable: false })
    firstName: string;
    @Column({ nullable: false })
    lastName: string;

    @OneToMany(() => Video, video => video.writer)
    write: Video[];
}