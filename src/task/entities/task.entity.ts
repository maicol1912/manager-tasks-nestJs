import {Table,Column,Model,DataType} from "sequelize-typescript"

export enum TaskStatusEnum{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

@Table({
    tableName: 'tasks',
    timestamps: false,
    underscored: true,
})
export class Task extends Model{
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        field:'id_task'
    })
    id:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique:true,
        field:'title_task'
    })
    title :string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field:'description_task'
    })
    description:string;

    @Column({
        type:DataType.ENUM('PENDING','IN_PROGRESS','DONE'),
        field:'status_task'
    })
    status:TaskStatusEnum
}

