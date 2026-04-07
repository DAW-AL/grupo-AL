console.log("Trabajo Práctico “Introducción a TypeScript”\nGrupo AL - Alumnos: Micaela Ortiz, Demian Diak, Andres Labra, Ezequiel Sanchez\n");

/* 1) Crear una interfaz “Animal” que posea el atributo “nombre”, así como también la
definición de un método “gritar” que retorne un string que representa el ruido que
hace el animal al gritar.
 */

interface Animal {
    nombre: string;
    gritar():string;
}

// 2. Crear las clases “Perro”, “Gato”, y “Vaca” que implementen la interfaz “Animal”.

class Perro implements Animal {
    nombre:string;

    constructor (nombre: string) {
        this.nombre = nombre
    };

    gritar():string {
        return 'Guau';
    };
}

class Gato implements Animal {
    nombre:string;

    constructor (nombre: string) {
        this.nombre = nombre
    };

    gritar():string {
        return 'Miau';
    };
}

class Vaca implements Animal {
    nombre:string;

    constructor (nombre: string) {
        this.nombre = nombre
    };

    gritar():string {
        return 'Muu';  };
}

/* 3. Crear una función “describirAnimal” que reciba como parámetro un objeto de tipo
“Animal” e imprima en la consola “El animal [nombre del animal] hace [ruido que
hace el animal al gritar]”. Hacer uso del método “gritar” y el acceso a la propiedad
“nombre” para cumplir el objetivo. */

function describirAnimal (animal: Animal): void {
    console.log (`El animal ${animal.nombre} hace ${animal.gritar()}.\n`)
};

/* 4. Crear una constante “perro”, una constante “vaca”, y una constante “gato” que tengan
como valor una instancia de la clase que corresponda y tengan declarado el tipo de
datos correspondiente. */

const perro: Perro = new Perro("Oso");
const vaca: Vaca = new Vaca("Lulu");
const gato: Gato = new Gato("Milanesa");

/* 5. Ejecutar el método “describirAnimal” para cada una de las constantes creadas (3
veces en total) */

describirAnimal(perro);
describirAnimal(vaca);
describirAnimal(gato);

/* 6. Crear un Enum “DiasSemana” que tenga como valores los días de la semana. */

enum DiasSemana{
    Lunes = "Lunes",
    Martes = "Martes",
    Miercoles = "Miercoles",
    Jueves = "Jueves",
    Viernes = "Viernes",
    Sabado = "Sabado",
    Domingo = "Domingo"
}

/* 7. Crear una variable que pueda contener únicamente valores de tipo número o de tipo
string. Asignar a la variable el string “Messi”, y luego reemplazarlo por el número 10 */

let soloGrandes: string | number;
soloGrandes = 'Messi';
console.log(`La variable soloGrandes tiene el valor: ${soloGrandes}`)
soloGrandes = 10;
console.log(`La variable soloGrandes tiene el valor: ${soloGrandes}\n`)

// 8. Crear una clase genérica que implemente la siguiente interfaz:

interface Fila<T> {
    agregar(elemento: T): void;
    remover(): T | undefined;
    obtenerElementos(): T[];
}


class FilaUniversal<T> implements Fila<T> {
    private fila: T[];

    constructor(){
        this.fila = [];
    }

    agregar(elemento: T): void {
        this.fila.push(elemento);
    };

    remover(): T | undefined {
        return this.fila.shift();
    };
    
    obtenerElementos(): T[] {
        return this.fila;
    };
}

/* 9. Crear una fila para números, una fila para strings, y una fila para animales (declarando
los tipos correspondientes en cada variable). */

const numeros: FilaUniversal<number> = new FilaUniversal<number>();
const caracteres: FilaUniversal<string> = new FilaUniversal<string>();
const animales: FilaUniversal<Animal> = new FilaUniversal<Animal>();

/* 10. En la fila para animales, agregar las 3 instancias que fueron creadas con anterioridad.
En las otras 2 filas, agregar 3 elementos a elección en cada una. Para finalizar,
remover un elemento de cada una de las 3 filas. */

animales.agregar(perro);
animales.agregar(gato);
animales.agregar(vaca);
console.log(`Animales en la fila: ${animales.obtenerElementos().map(a => a.nombre)}`);
animales.remover();
console.log(`Animales después de remover: ${animales.obtenerElementos().map(a => a.nombre)}\n`);

caracteres.agregar('Somos el GrupoAL');
caracteres.agregar('\nCursando la materia Desarrollo de Aplicaciones Web');
caracteres.agregar('\nAlumnos: Micaela, Demian, Andres, Ezequiel');
console.log(`Strings en la fila: ${caracteres.obtenerElementos()}`);
caracteres.remover();
console.log(`Strings después de remover: ${caracteres.obtenerElementos()}\n`);

numeros.agregar(4);
numeros.agregar(128);
numeros.agregar(14.5);
console.log(`Numeros en la fila: ${numeros.obtenerElementos()}`);
numeros.remover();
console.log(`Numeros después de remover: ${numeros.obtenerElementos()}`);

