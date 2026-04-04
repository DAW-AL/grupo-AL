/* 1. Crear una interfaz “Animal” que posea el atributo “nombre”, así como también la 
definición de un método “gritar” que retorne un string que representa el ruido que 
hace el animal al gritar.*/

interface Animal {
    nombre: string,
    gritar(): string
}

/* 2. Crear las clases “Perro”, “Gato”, y “Vaca” que implementen la interfaz “Animal”. */

class Perro implements Animal {

    nombre: string;

    constructor (nombre: string) {
        this.nombre = nombre
    };

    gritar(): string {
        return `Guau`
    };

};

class Gato implements Animal {

    nombre: string;

    constructor (nombre: string) {
        this.nombre = nombre
    };

    gritar(): string {
        return `Miau`
    };

};

class Vaca implements Animal {

    nombre: string;

    constructor (nombre: string) {
        this.nombre = nombre
    };

    gritar(): string {
        return `Mooo`
    };

};

/* 3. Crear una función “describirAnimal” que reciba como parámetro un objeto de tipo 
“Animal” e imprima en la consola “El animal [nombre del animal] hace [ruido que 
hace el animal al gritar]”. Hacer uso del método “gritar” y el acceso a la propiedad 
“nombre” para cumplir el objetivo.  */

function describirAnimal (animal: Animal) {
    console.log(`El animal ${animal.nombre} hace ${animal.gritar()}`)
}

/* 4. Crear una constante “perro”, una constante “vaca”, y una constante “gato” que tengan 
como valor una instancia de la clase que corresponda y tengan declarado el tipo de 
datos correspondiente. */

const perro: Perro = new Perro("Emo");
const gato: Gato = new Gato("Lulu");
const vaca: Vaca = new Vaca("Lara");

/* 5. Ejecutar el método “describirAnimal” para cada una de las constantes creadas (3 
veces en total). */

describirAnimal(perro);
describirAnimal(gato);
describirAnimal(vaca);

/* 6. Crear un Enum “DiasSemana” que tenga como valores los días de la semana. */

enum DiasSemana {
    LUNES,
    MARTES,
    MIERCOLES,
    JUEVES,
    VIERNES,
    SABADO,
    DOMINGO
}

/* 7. Crear una variable que pueda contener únicamente valores de tipo número o de tipo 
string. Asignar a la variable el string “Messi”, y luego reemplazarlo por el número 10. */

let personaje: number | string = "Messi";
console.log(personaje);
personaje = 10;
console.log(personaje);

/* 8. Crear una clase genérica que implemente la siguiente interfaz: 
interface Fila<T> {  
agregar(elemento: T): void;  
remover(): T | undefined;  
} */

interface Fila<T> {
    agregar(elemento: T): void;
    remover(): T | undefined;
}

class FilaElementos<T> implements Fila<T> {

    private fila: T[] = [];

    agregar(elemento: T): void {
        this.fila.push(elemento);
    }

    remover(): T | undefined {
        return this.fila.shift();
    }

    mostrarFila(): void {
        console.log(this.fila)
    }

};

/* 9. Crear una fila para números, una fila para strings, y una fila para animales (declarando 
los tipos correspondientes en cada variable). */

const numeros: FilaElementos<number> = new FilaElementos<number>();
numeros.agregar(8);
numeros.agregar(10);
numeros.agregar(5);
numeros.mostrarFila();
const palabra: FilaElementos<string> = new FilaElementos<string>();
palabra.agregar("Hola");
palabra.agregar("Como estas");
palabra.agregar("Chau");
palabra.mostrarFila();
const animales: FilaElementos<Animal> = new FilaElementos<Animal>();
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