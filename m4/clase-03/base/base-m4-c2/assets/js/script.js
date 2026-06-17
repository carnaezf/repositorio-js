const palabra = document.querySelector("#palabra");
const cantidad = document.querySelector("#cantidad");
const btnRepetir = document.querySelector("#btnRepetir");
const resultadoRepetir = document.querySelector("#resultadoRepetir");

btnRepetir.addEventListener("click", function () {
    const texto = palabra.value;
    const veces = Number(cantidad.value);

    resultadoRepetir.textContent = "";

    for (let i = 0; i < veces; i++) {
        resultadoRepetir.textContent += texto + " ";
    }
});

const color = document.querySelector("#color");
const btnAplicar = document.querySelector("#btnAplicar");
const parrafoColor = document.querySelector("#parrafoColor");

btnAplicar.addEventListener("click", function () {
    parrafoColor.style.backgroundColor = color.value;
});

const numeroUno = document.querySelector("#numeroUno");
const numeroDos = document.querySelector("#numeroDos");
const btnCalcular = document.querySelector("#btnCalcular");
const resultadoCalcular = document.querySelector("#resultadoCalcular");

btnCalcular.addEventListener("click", function () {
    const n1 = Number(numeroUno.value);
    const n2 = Number(numeroDos.value);

    const suma = n1 + n2;
    const resta = n1 - n2;
    const multiplicacion = n1 * n2;
    const division = n1 / n2;
    const total = suma + resta + multiplicacion + division;

    resultadoCalcular.innerHTML = `
        <p>${n1} + ${n2} = ${suma}</p>
        <p>${n1} - ${n2} = ${resta}</p>
        <p>${n1} * ${n2} = ${multiplicacion}</p>
        <p>${n1} / ${n2} = ${division}</p>
        <p>La suma de los resultados es ${total}</p>
    `;
});

const texto = document.querySelector("#texto");
const btnInvertir = document.querySelector("#btnInvertir");
const resultadoInvertir = document.querySelector("#resultadoInvertir");

btnInvertir.addEventListener("click", function () {
    const textoOriginal = texto.value;
    const textoInvertido = textoOriginal.split("").reverse().join("");

    resultadoInvertir.textContent = textoInvertido;
});