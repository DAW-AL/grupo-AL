/* 1. Crear una interfaz “Animal” que posea el atributo “nombre”, así como también la
definición de un método “gritar” que retorne un string que representa el ruido que
hace el animal al gritar.*/
/* 2. Crear las clases “Perro”, “Gato”, y “Vaca” que implementen la interfaz “Animal”. */
var Perro = /** @class */ (function () {
    function Perro(nombre) {
        this.nombre = nombre;
    }
    ;
    Perro.prototype.gritar = function () {
        return "Guau";
    };
    ;
    return Perro;
}());
;
var Gato = /** @class */ (function () {
    function Gato(nombre) {
        this.nombre = nombre;
    }
    ;
    Gato.prototype.gritar = function () {
        return "Miau";
    };
    ;
    return Gato;
}());
;
var Vaca = /** @class */ (function () {
    function Vaca(nombre) {
        this.nombre = nombre;
    }
    ;
    Vaca.prototype.gritar = function () {
        return "Mooo";
    };
    ;
    return Vaca;
}());
;
/* 3. Crear una función “describirAnimal” que reciba como parámetro un objeto de tipo
“Animal” e imprima en la consola “El animal [nombre del animal] hace [ruido que
hace el animal al gritar]”. Hacer uso del método “gritar” y el acceso a la propiedad
“nombre” para cumplir el objetivo.  */
function describirAnimal(animal) {
    console.log("El animal ".concat(animal.nombre, " hace ").concat(animal.gritar()));
}
/* 4. Crear una constante “perro”, una constante “vaca”, y una constante “gato” que tengan
como valor una instancia de la clase que corresponda y tengan declarado el tipo de
datos correspondiente. */
var perro = new Perro("Emo");
var gato = new Gato("Lulu");
var vaca = new Vaca("Lara");
/* 5. Ejecutar el método “describirAnimal” para cada una de las constantes creadas (3
veces en total). */
describirAnimal(perro);
describirAnimal(gato);
describirAnimal(vaca);
/* 6. Crear un Enum “DiasSemana” que tenga como valores los días de la semana. */
var DiasSemana;
(function (DiasSemana) {
    DiasSemana[DiasSemana["LUNES"] = 0] = "LUNES";
    DiasSemana[DiasSemana["MARTES"] = 1] = "MARTES";
    DiasSemana[DiasSemana["MIERCOLES"] = 2] = "MIERCOLES";
    DiasSemana[DiasSemana["JUEVES"] = 3] = "JUEVES";
    DiasSemana[DiasSemana["VIERNES"] = 4] = "VIERNES";
    DiasSemana[DiasSemana["SABADO"] = 5] = "SABADO";
    DiasSemana[DiasSemana["DOMINGO"] = 6] = "DOMINGO";
})(DiasSemana || (DiasSemana = {}));
/* 7. Crear una variable que pueda contener únicamente valores de tipo número o de tipo
string. Asignar a la variable el string “Messi”, y luego reemplazarlo por el número 10. */
var personaje = "Messi";
console.log(personaje);
personaje = 10;
console.log(personaje);
var FilaElementos = /** @class */ (function () {
    function FilaElementos() {
        this.fila = [];
    }
    FilaElementos.prototype.agregar = function (elemento) {
        this.fila.push(elemento);
    };
    FilaElementos.prototype.remover = function () {
        return this.fila.shift();
    };
    FilaElementos.prototype.mostrarFila = function () {
        console.log(this.fila);
    };
    return FilaElementos;
}());
;
/* 9. Crear una fila para números, una fila para strings, y una fila para animales (declarando
los tipos correspondientes en cada variable). */
var numeros = new FilaElementos();
numeros.agregar(8);
numeros.agregar(10);
numeros.agregar(5);
numeros.mostrarFila();
var palabra = new FilaElementos();
palabra.agregar("Hola");
palabra.agregar("Como estas");
palabra.agregar("Chau");
palabra.mostrarFila();
var animales = new FilaElementos();
animales.agregar(perro);
animales.agregar(gato);
animales.agregar(vaca);
animales.mostrarFila();
/* 10. En la fila para animales, agregar las 3 instancias que fueron creadas con anterioridad.
En las otras 2 filas, agregar 3 elementos a elección en cada una. Para finalizar,
remover un elemento de cada una de las 3 filas. */
numeros.remover();
numeros.mostrarFila();
palabra.remover();
palabra.mostrarFila();
animales.remover();
animales.mostrarFila();
