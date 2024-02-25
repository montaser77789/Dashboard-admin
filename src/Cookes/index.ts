import Cookies from 'universal-cookie';
export interface Ioptions {
    path: string;
    expires: Date;
}

const cookies = new Cookies()


class CookiesServices{
get(name:string){
    return cookies.get(name)
}


set(name:string,value:string,option:Ioptions){
    return cookies.set(name,value,option)
} 
remove(name:string){
    return cookies.remove(name)
}
}
export default new CookiesServices()