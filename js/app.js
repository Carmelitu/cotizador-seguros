// Constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// Realiza cotización
Seguro.prototype.cotizar = function () {
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */

    let cantidad;
    const base = 2000;

    // Leer Marca
    switch (this.marca){
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;

        case '3':
            cantidad = base * 1.35;
            break;
        
        default: 
            break;
    }

    // Leer año
    const diferencia = new Date().getFullYear() - this.year;
    // Cada año que la diferencia es mayor le quita un 3% al valor
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    // Leer Tipo

    /*
        Basico: 30% adicional
        Completo: 50% adicional
    */

    if (this.tipo === 'basico'){
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    return cantidad;
}


function UI(){

}

// Llena opciones de años
UI.prototype.llenarOpciones =  () => {
    const max = new Date().getFullYear(),
          min = max - 20;


    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// Mostrar Alertas en pantalla

UI.prototype.mostrarMensaje = function (mensaje, tipo){
    const div = document.createElement('div');
    if (tipo === 'error'){
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Mostrar resultado
UI.prototype.mostrarResultado = function (seguro, total) {
    const {marca, year, tipo} = seguro;

    // Crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    // Pasar marca a texto
    let textoMarca;

    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;

        case '2':
            textoMarca = 'Asiatico';
            break;

        case '3':
            textoMarca = 'Europeo';
            break;

        default:
            break;
    }

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year} </span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo} </span></p>
        <p> </p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total} </span></p>
    `

    const resultadoDiv = document.querySelector('#resultado');
    
    // Mostrar Spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);
}

// Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
})

// Event Listeners

eventListeners();

function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}


// Funciones

function cotizarSeguro(e){
    e.preventDefault();

    // Leer marca
    const marca = document.querySelector('#marca').value;

    // Leer año
    const year = document.querySelector('#year').value;

    // Leer tipo cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === ''){
        const resultados = document.querySelector('#resultado div');
        if (resultados !== null){
            resultados.remove();
        }
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'correcto');

    // Ocultar cotizacion previa
    const resultados = document.querySelector('#resultado div');
    if (resultados !== null){
        resultados.remove();
    }

    // Instanciar seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizar();

    // Muestra resultado
    ui.mostrarResultado(seguro, total);
}











