//estamos declarando que en el tipo Request de express siempre veamos y podamos usar el usar estos atributos definidos aca
//en una variable del tipo request

declare namespace Express{
    interface Request{
        idUser:string;
        roleUser:string;
    }
}