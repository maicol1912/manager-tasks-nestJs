declare namespace NodeJS{
    interface ProcessEnv{
        PORT:number
        POSTGRES_HOST:string
        POSTGRES_PORT:number
        POSTGRES_USER:string
        POSTGRES_PASSWORD:string
        POSTGRES_DB:string
        HASH_SALT:number
        JWT_SECRET:string
        NODE_ENV:string
    }
}