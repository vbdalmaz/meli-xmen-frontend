
//let urlApi = "http://ec2-54-233-234-116.sa-east-1.compute.amazonaws.com:8080/melixmen/dna";
let urlApi = "http://localhost:8080/melixmen/dna";
let urlApiGetDnas = urlApi + "/all";
let urlApiPostTestDnas = urlApi + "/mutant";
let urlApiGetStats = urlApi + "/stats"
export default class Constants{ 

    static getUrlApiPostTestDnas(){
        return urlApiPostTestDnas;
    }

    static getUrlApiGetDnas(){
        return urlApiGetDnas;
    }

    static getUrlApiGetStats(){
        return urlApiGetStats;
    }
} 