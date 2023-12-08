// Definición de tasas de interés //
const tasasDeInteres = {
    baja: { 6: 0.03 },
    media: { 12: 0.05 },
    alta: { 24: 0.12 },
};

// Función para calcular el monto total a pagar //
function calcularMontoTotal(montoPrestado, tasaInteres, plazoMeses) {
    const interesSimple = montoPrestado * tasaInteres * plazoMeses;
    return montoPrestado + interesSimple;
}

// Función para mostrar la tabla de tasas de interés //
function mostrarTablaTasas() {
    alert('$$$ TASAS DE INTERESES $$$');
    for (const tipo in tasasDeInteres) {
        const duraciones = Object.keys(tasasDeInteres[tipo]).join(', ');
        alert(`${tipo}: ${duraciones} meses - Tasa: ${tasasDeInteres[tipo][duraciones] * 100}%`);
    }
}

// Función para mostrar todos los préstamos realizados en la consola //
function mostrarPrestamos() {
    const prestamos = JSON.parse(localStorage.getItem('prestamos')) || [];
    console.log('=== Préstamos Realizados ===');
    if (prestamos.length === 0) {
        console.log('No hay préstamos realizados.');
    } else {
        prestamos.forEach((prestamo, index) => {
            console.log(`${index + 1}. Monto prestado: $${prestamo.montoPrestado}, Tasa de interés: ${prestamo.tasaInteres * 100}%, Plazo en meses: ${prestamo.plazoMeses}, Monto total a pagar: $${prestamo.montoTotal.toFixed(2)}`);
        });
    }
}

// Función principal del simulador //
function simuladorPrestamo() {
    // Presentación
alert('¡Bienvenido al Simulador de Préstamos! \n todo lo que necesitas esta aqui. claridad y honestidad !!! \n COMENCEMOS ');

    // Mostrar la tabla de tasas de interés //
    mostrarTablaTasas();

    // Solicitar información al usuario //
    const montoPrestado = parseFloat(prompt('Ingrese el monto a prestar:'));
    if (isNaN(montoPrestado) || montoPrestado <= 0) {
        alert('Monto inválido. Por favor, ingrese un monto válido.');
        return;
    }

    const tipoTasa = prompt('Seleccione el tipo de tasa (baja, media, alta):');
    if (!tasasDeInteres.hasOwnProperty(tipoTasa)) {
        alert('Tipo de tasa inválido. Por favor, seleccione una tasa válida.');
        return;
    }

    const plazoMeses = parseInt(prompt('Ingrese el plazo en meses:'));
    if (isNaN(plazoMeses) || plazoMeses <= 0) {
        alert('Plazo inválido. Por favor, ingrese un plazo válido.');
        return;
    }

    // Validar que el tipo de tasa y el plazo coincidan
    if (!tasasDeInteres[tipoTasa].hasOwnProperty(plazoMeses)) {
        alert('La combinación de tipo de tasa y plazo no es válida. Por favor, seleccione valores compatibles.');
        return;
    }

    // Obtener la tasa de interés en función de la duración
    const tasaInteres = tasasDeInteres[tipoTasa][plazoMeses];

    // Mostrar las tasas de interés seleccionadas al usuario
    alert(`Tasa de interés seleccionada: ${tasaInteres * 100}% (Tasa para ${plazoMeses} meses)`);

    // Calcular el monto total a pagar
    const montoTotal = calcularMontoTotal(montoPrestado, tasaInteres, plazoMeses);

    // Mostrar los resultados
    alert(`Monto prestado: $${montoPrestado}\nPlazo en meses: ${plazoMeses}\nMonto total a pagar: $${montoTotal.toFixed(2)}`);
    

    // Mostrar los préstamos realizados
    mostrarPrestamos();
}

// Ejecutar el simulador al cargar la página
simuladorPrestamo();