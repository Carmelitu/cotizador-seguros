// Constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
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
    const tipo = document.querySelector('input[name="tipo":checked]').value;

    if (marca === '' || year === '' || tipo === ''){
        console.log('No paso validación');
    } else {
        console.log('Paso validación');
    }
}











