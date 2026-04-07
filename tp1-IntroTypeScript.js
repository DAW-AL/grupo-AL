console.log("Trabajo Práctico “Introducción a TypeScript”\nGrupo AL - Alumnos: Micaela Ortiz, Demian Diak, Andres Labra, Ezequiel Sanchez\n");
// 2. Crear las clases “Perro”, “Gato”, y “Vaca” que implementen la interfaz “Animal”.
var Perro = /** @class */ (function () {
    function Perro(nombre) {
        this.nombre = nombre;
    }
    ;
    Perro.prototype.gritar = function () {
        return 'Guau';
    };
    ;
    return Perro;
}());
var Gato = /** @class */ (function () {
    function Gato(nombre) {
        this.nombre = nombre;
    }
    ;
    Gato.prototype.gritar = function () {
        return 'Miau';
    };
    ;
    return Gato;
}());
var Vaca = /** @class */ (function () {
    function Vaca(nombre) {
        this.nombre = nombre;
    }
    ;
    Vaca.prototype.gritar = function () {
        return 'Muu';
    };
    ;
    return Vaca;
}());
/* 3. Crear una función “describirAnimal” que reciba como parámetro un objeto de tipo
“Animal” e imprima en la consola “El animal [nombre del animal] hace [ruido que
hace el animal al gritar]”. Hacer uso del método “gritar” y el acceso a la propiedad
“nombre” para cumplir el objetivo. */
function describirAnimal(animal) {
    console.log("El animal ".concat(animal.nombre, " hace ").concat(animal.gritar(), ".\n"));
}
;
/* 4. Crear una constante “perro”, una constante “vaca”, y una constante “gato” que tengan
como valor una instancia de la clase que corresponda y tengan declarado el tipo de
datos correspondiente. */
var perro = new Perro("Oso");
var vaca = new Vaca("Lulu");
var gato = new Gato("Milanesa");
/* 5. Ejecutar el método “describirAnimal” para cada una de las constantes creadas (3
veces en total) */
describirAnimal(perro);
describirAnimal(vaca);
describirAnimal(gato);
/* 6. Crear un Enum “DiasSemana” que tenga como valores los días de la semana. */
var DiasSemana;
(function (DiasSemana) {
    DiasSemana["Lunes"] = "Lunes";
    DiasSemana["Martes"] = "Martes";
    DiasSemana["Miercoles"] = "Miercoles";
    DiasSemana["Jueves"] = "Jueves";
    DiasSemana["Viernes"] = "Viernes";
    DiasSemana["Sabado"] = "Sabado";
    DiasSemana["Domingo"] = "Domingo";
})(DiasSemana || (DiasSemana = {}));
/* 7. Crear una variable que pueda contener únicamente valores de tipo número o de tipo
string. Asignar a la variable el string “Messi”, y luego reemplazarlo por el número 10 */
var soloGrandes;
soloGrandes = 'Messi';
console.log("La variable soloGrandes tiene el valor: ".concat(soloGrandes));
soloGrandes = 10;
console.log("La variable soloGrandes tiene el valor: ".concat(soloGrandes, "\n"));
var FilaUniversal = /** @class */ (function () {
    function FilaUniversal() {
        this.fila = [];
    }
    FilaUniversal.prototype.agregar = function (elemento) {
        this.fila.push(elemento);
    };
    ;
    FilaUniversal.prototype.remover = function () {
        return this.fila.shift();
    };
    ;
    FilaUniversal.prototype.obtenerElementos = function () {
        return this.fila;
    };
    ;
    return FilaUniversal;
}());
/* 9. Crear una fila para números, una fila para strings, y una fila para animales (declarando
los tipos correspondientes en cada variable). */
var numeros = new FilaUniversal();
var caracteres = new FilaUniversal();
var animales = new FilaUniversal();
/* 10. En la fila para animales, agregar las 3 instancias que fueron creadas con anterioridad.
En las otras 2 filas, agregar 3 elementos a elección en cada una. Para finalizar,
remover un elemento de cada una de las 3 filas. */
animales.agregar(perro);
animales.agregar(gato);
animales.agregar(vaca);
console.log("Animales en la fila: ".concat(animales.obtenerElementos().map(function (a) { return a.nombre; })));
animales.remover();
console.log("Animales despu\u00E9s de remover: ".concat(animales.obtenerElementos().map(function (a) { return a.nombre; }), "\n"));
caracteres.agregar('Somos el GrupoAL');
caracteres.agregar('\nCursando la materia Desarrollo de Aplicaciones Web');
caracteres.agregar('\nAlumnos: Micaela, Demian, Andres, Ezequiel');
console.log("Strings en la fila: ".concat(caracteres.obtenerElementos()));
caracteres.remover();
console.log("Strings despu\u00E9s de remover: ".concat(caracteres.obtenerElementos(), "\n"));
numeros.agregar(4);
numeros.agregar(128);
numeros.agregar(14.5);
console.log("Numeros en la fila: ".concat(numeros.obtenerElementos()));
numeros.remover();
console.log("Numeros despu\u00E9s de remover: ".concat(numeros.obtenerElementos()));
