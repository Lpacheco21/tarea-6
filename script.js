const gastos = [
  { descripcion: 'Cena familiar', monto: 120.50, categoria: 'alimentacion' },
  { descripcion: 'Gasolina semanal', monto: 75.00, categoria: 'transporte' },
  { descripcion: 'Libro de programación', monto: 35.20, categoria: 'educacion' },
  { descripcion: 'Café y snacks', monto: 15.80, categoria: 'alimentacion' },
  { descripcion: 'Mantenimiento de auto', monto: 110.00, categoria: 'transporte' },
  { descripcion: 'Curso online', monto: 65.00, categoria: 'educacion' }
];

function calcularTotal(listaGastos) {
  let total = 0;
  for (let i = 0; i < listaGastos.length; i++) {
    let gastoActual = listaGastos[i];
    // Valida explícitamente el tipo de dato antes de operar
    if (typeof gastoActual.monto !== 'number') {
      throw new Error('El monto no es un número válido en: ' + gastoActual.descripcion);
    }
    total = total + gastoActual.monto;
  }
  return total;
}

function calcularPromedio(listaGastos) {
  if (listaGastos.length === 0) {
    throw new Error('El array de gastos está vacío, no se puede calcular el promedio.');
  }
  let total = calcularTotal(listaGastos);
  return total / listaGastos.length;
}

function filtrarPorCategoria(listaGastos, categoriaBuscada) {
  let resultado = [];
  for (let i = 0; i < listaGastos.length; i++) {
    let gastoActual = listaGastos[i];
    if (gastoActual.categoria === categoriaBuscada) {
      resultado[resultado.length] = gastoActual;
    }
  }
  return resultado;
}

function obtenerMayorGasto(listaGastos) {
  if (listaGastos.length === 0) {
    return null;
  }
  let mayor = listaGastos[0];
  for (let i = 1; i < listaGastos.length; i++) {
    if (listaGastos[i].monto > mayor.monto) {
      mayor = listaGastos[i];
    }
  }
  return mayor;
}

function clasificarGasto(monto) {
  if (monto >= 100) {
    return 'Alto';
  } else if (monto >= 50 && monto < 100) {
    return 'Medio';
  } else {
    return 'Bajo';
  }
}

function describirCategoria(categoria) {
  switch (categoria) {
    case 'alimentacion':
      return 'Gastos dedicados a comida y víveres';
    case 'transporte':
      return 'Gastos de movilidad y traslados diarios';
    case 'educacion':
      return 'Inversión en aprendizaje y material de estudio';
    default:
      return 'Categoría general o no especificada';
  }
}

// Implementación de un cierre (closure) para persistir el estado del contador
function crearContadorDeAltos() {
  let contador = 0;
  return function() {
    contador = contador + 1;
    return contador;
  };
}

const esMontoImportante = (monto) => monto > 50;

try {
  let gastosClasificados = [];
  let contarAltos = crearContadorDeAltos();
  let cantidadAltos = 0;

  for (let i = 0; i < gastos.length; i++) {
    let gasto = gastos[i];
    let nivelClasificado = clasificarGasto(gasto.monto);
    let descripcionCat = describirCategoria(gasto.categoria);

    let gastoConDetalle = {
      descripcion: gasto.descripcion,
      monto: gasto.monto,
      categoria: gasto.categoria,
      nivel: nivelClasificado,
      descripcionCategoria: descripcionCat
    };

    gastosClasificados[gastosClasificados.length] = gastoConDetalle;

    if (nivelClasificado === 'Alto') {
      cantidadAltos = contarAltos();
    }
  }

  let totalGastos = calcularTotal(gastos);
  let promedioGastos = calcularPromedio(gastos);
  let mayorGastoObj = obtenerMayorGasto(gastos);
  let gastosTransporte = filtrarPorCategoria(gastos, 'transporte');

  // Construcción dinámica de objeto resumen mediante acumulación de claves
  let resumenPorCategoria = {};
  for (let i = 0; i < gastos.length; i++) {
    let catActual = gastos[i].categoria;
    let montoActual = gastos[i].monto;

    if (resumenPorCategoria[catActual] === undefined) {
      resumenPorCategoria[catActual] = montoActual;
    } else {
      resumenPorCategoria[catActual] = resumenPorCategoria[catActual] + montoActual;
    }
  }

  console.table(gastosClasificados);
  console.log('Total gastado: ' + totalGastos);
  console.log('Promedio de gastos: ' + promedioGastos);
  console.log('Mayor gasto:', mayorGastoObj);
  console.log('Cantidad de gastos altos: ' + cantidadAltos);
  console.log('Gastos de transporte:', gastosTransporte);

  let informe = {
    total: totalGastos,
    promedio: promedioGastos,
    cantidadAltos: cantidadAltos,
    mayorGasto: mayorGastoObj,
    resumenPorCategoria: resumenPorCategoria
  };

  console.log(JSON.stringify(informe, null, 2));

} catch (error) {
  console.error('Ocurrió un error en el programa: ' + error.message);
}

// Prueba controlada independiente requerida para el manejo de excepciones
try {
  calcularPromedio([]);
} catch (errorPrueba) {
  console.error('Error capturado con éxito: ' + errorPrueba.message);
}