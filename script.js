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

  // Reinicia la animación en cada búsqueda
  resultado.innerHTML = "";
  void resultado.offsetWidth;

  if (persona) {
    const companeros = personas
      .filter(p => p.mesa === persona.mesa && p.dni !== persona.dni)
      .map(p => `<span>${p.nombre}</span>`)
      .join("");

    const nombre = persona.nombre.split(" ")[0];

    resultado.innerHTML = `
      <div class="saludo">¡Hola ${nombre}! Tu mesa es la</div>
      <div class="numero-mesa"><span>${persona.mesa}</span></div>
      ${companeros ? `
        <div class="titulo-companeros">Compartís la mesa con</div>
        <div class="lista-companeros">${companeros}</div>` : ""}
    `;
  } else {
    resultado.innerHTML = `
      <div class="no-encontrado">
        No encontramos ese DNI 😕<br>Revisalo o consultá en la entrada.
      </div>`;
  }
}