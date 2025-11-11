let datos = {};

// Cargar el CSV al iniciar la página
fetch("mesas.csv")
  .then(response => response.text())
  .then(text => {
    const filas = text.trim().split("\n").slice(1); // quitar encabezado
    filas.forEach(fila => {
      const [dni, mesa] = fila.split(",");
      datos[dni.trim()] = mesa.trim();
    });
  });

function buscarMesa() {
  const dni = document.getElementById("dni").value.trim();
  const resultado = document.getElementById("resultado");

  if (dni === "") {
    resultado.textContent = "Por favor ingresá tu DNI.";
    resultado.style.color = "red";
    return;
  }

  const mesa = datos[dni];

  if (mesa) {
    resultado.textContent = `Tu mesa es la número ${mesa}.`;
    resultado.style.color = "white";
  } else {
    resultado.textContent = "DNI no encontrado. Verificá que esté correcto.";
    resultado.style.color = "red";
  }
}
