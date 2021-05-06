export class App{
    static listaErrores(json){
        let res = "<strong>Errores: </strong> <br><br>";
        json.each((i, item) => {
            res += "-" + item + "<br>";
        })
        return res;
    }
}