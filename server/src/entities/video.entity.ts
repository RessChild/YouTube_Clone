import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Video extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    vid: string;

    @Column({ nullable: false })
    title: string;
    @Column({ default: '' })
    description: string;
    @Column({ nullable: false })
    thumbnail: string;
    @Column({ nullable: false })
    video: string;

    @Column({ type: "timestamp", default: () => "now()" })
    writedAt: string;
    @Column({ default: 0 })
    views: number; // 조회수

    @ManyToOne(() => User, user => user.write)
    // @Column({ nullable: false })
    writer: User;
};