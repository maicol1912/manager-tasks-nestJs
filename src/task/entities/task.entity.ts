import {Table,Column,CreatedAt,Model,DataType} from "sequelize-typescript"

export enum TaskStatus{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

@Table({ timestamps: false })
export class Task extends Model{
    
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique:true
    })
    title :string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status:TaskStatus
}

