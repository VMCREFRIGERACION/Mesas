let personas = [];

// Cargar el archivo CSV
fetch('mesas.csv')
  .then(response => response.text())
  .then(data => {
    const filas = data.trim().split('\n').slice(1); // salta encabezado
    personas = filas.map(linea => {
      const [dni, nombre, mesa] = linea.split(',');
      return { dni: dni.trim(), nombre: nombre.trim(), mesa: mesa.trim() };
    });
  });

function buscarMesa() {
  const dniInput = document.getElementById("dni").value.trim();
  const persona = personas.find(p => p.dni === dniInput);
  const resultado = document.getElementById("resultado");

  if (persona) {
    // Buscar compañeros de la misma mesa (excluyendo al usuario)
    const companeros = personas
      .filter(p => p.mesa === persona.mesa && p.dni !== persona.dni)
      .map(p => p.nombre);

    // Generar el texto con los nombres separados por " - "
    const listaCompaneros = companeros.join(' - ');

    resultado.innerHTML = `
      <div class="nombre">Hola ${persona.nombre}, tu mesa es la N°${persona.mesa}</div>
      <div class="companeros">
        Compartís la mesa con:<br>
        <span style="display:inline-block; margin-top:8px;">${listaCompaneros}</span>
      </div>
    `;
  } else {
    resultado.innerHTML = `<div class="mesa">DNI no encontrado. Verificá que esté correcto.</div>`;
  }
}
