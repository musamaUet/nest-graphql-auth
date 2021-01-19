import { Column, Entity } from "typeorm";

@Entity("users", {schema:"dbtest"})
export class Users {
    @Column("binary", {primary:true, name:"userId", length:16})
    userId: Buffer;
    
    @Column("varchar", {name:"username", length:100})
    username:string

    @Column("varchar", {name:"email", length:100})
    email:string

    @Column("varchar", {name:"password", length:100})
    password:string
}