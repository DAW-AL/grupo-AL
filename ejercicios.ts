/* Ejercicio n°1 */

interface Animal {
    nombre: string;
    gritar(): string;
}

/* Ejercicio n°2 */

class Perro implements Animal {
    nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    gritar(): string {
        return "guau";
    }
}

class Gato implements Animal {
    nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre
    }

    gritar(): string {
        return "uwu"
    }
}

class Vaca implements Animal {
    nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    gritar(): string {
        return "muuu"
    }
}

/* Ejercicio n°3 */

function describirAnimal (animal: Animal): void {
    console.log (`${animal.nombre} hace ${animal.gritar()}`);
}

/* Ejercicio n°4 */

const perro: Perro  = new Perro ("Chicho")
const gato: Gato = new Gato ("Pumba")
const vaca: Vaca = new Vaca ("Lola")

/* Ejercicio nª5 */

console.log (describirAnimal(perro))
console.log (describirAnimal(gato))
console.log (describirAnimal(vaca))

/* Ejercicio n°6 */

enum DiasSemanas {
    Lu = "Lunes",
    Ma = "Martes",
    Mi = "Miercoles",
    Ju = "Jueves",
    Vi = "Viernes",
    Sa = "Sabado",
    Do = "Domingo"
}


/* Ejercicio nª7 */

let lionel: string | number
lionel = "Messi"
lionel = 10

/* Ejercicio nª8 */

interface Fila<T> {
    agregar(elemento: T): void;
    remover(): T|undefined;
}

class generic<T> implements Fila<T> {
    contenido: T[]= [];

    agregar(elemento: T): void {
        this.contenido.push(elemento);
    }

    remover(): T | undefined {
        return this.contenido.shift();
    }
}

/* Ejercicio nª9 */

const numeros: number[] = [1, 2];
const texto: string[] = ["Racing"]
const animalitos: Animal[] = []

/* Ejercicio nª10 */

numeros.push(3, 4, 5);
texto.push("Hola", "Juan", "Pepe")
animalitos.push(perro, gato, vaca)

numeros.shift()
texto.shift()
animalitos.shift()