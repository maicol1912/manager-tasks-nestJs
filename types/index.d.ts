//NodeJS.ProcessEnv

//declaracion para poder acceder y ver el indice de cada variable por medio del process.env
//ya que cuando accedemos al process.env nos aparecera lo que definimos en esta interfaz
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
    }
}