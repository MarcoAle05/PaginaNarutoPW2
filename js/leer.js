const zonas = [
    {
        x: 1032, // Kakashi (arriba)
        y: 192,
        radio: 100,
        url: "/paginas/kakashi.html",
        nombre: "Zona Kakashi",
    },
    {
        x: 1272, // Iruka (arriba derecha)
        y: 276,
        radio: 100,
        url: "/paginas/iruka.html",
        nombre: "Zona Iruka",
    },
    {
        x: 960, // Sasuke (izquierda)
        y: 444,
        radio: 100,
        url: "/paginas/sasuke.html",
        nombre: "Zona Sasuke",
    },
    {
        x: 1176, // Naruto (centro frente)
        y: 564,
        radio: 100,
        url: "/paginas/naruto.html",
        nombre: "Zona Naruto",
    },
    {
        x: 1380, // Sakura (derecha)
        y: 504,
        radio: 100,
        url: "/paginas/sakura.html",
        nombre: "Zona Sakura",
    },
];

const imagen = document.getElementById("miImagen");
const coordenadasSpan = document.getElementById("coordenadas");

imagen.addEventListener("click", function (evento) {
    // Obtener las dimensiones reales de la imagen (naturales)
    const anchoNatural = imagen.naturalWidth;
    const altoNatural = imagen.naturalHeight;

    // Obtener las dimensiones mostradas en pantalla
    const anchoMostrado = imagen.clientWidth;
    const altoMostrado = imagen.clientHeight;

    // Calcular el factor de escala
    const escalaX = anchoNatural / anchoMostrado;
    const escalaY = altoNatural / altoMostrado;

    // Obtener la posición del clic relativa a la imagen mostrada
    const rect = imagen.getBoundingClientRect();
    const xClic = evento.clientX - rect.left;
    const yClic = evento.clientY - rect.top;

    // Convertir a coordenadas de la imagen original
    const xOriginal = Math.round(xClic * escalaX);
    const yOriginal = Math.round(yClic * escalaY);

    // Mostrar las coordenadas
    coordenadasSpan.textContent = `X: ${xOriginal}, Y: ${yOriginal}`;

    console.log(`Clic en coordenadas originales: (${xOriginal}, ${yOriginal})`);

    // Verificar si el clic está dentro de alguna zona
    for (const zona of zonas) {
        const distancia = Math.sqrt(
            Math.pow(xOriginal - zona.x, 2) + Math.pow(yOriginal - zona.y, 2)
        );

        if (distancia <= zona.radio) {
            console.log(`Clic en ${zona.nombre}! Redirigiendo a ${zona.url}`);

            // Redirigir a la URL de la zona
            window.location.href = zona.url;
            return;
        }
    }

    console.log("Clic fuera de cualquier zona interactiva");
});

//Cambiar el cursor cuando pasa sobre una zona interactiva
imagen.addEventListener("mousemove", function (evento) {
    const anchoNatural = imagen.naturalWidth;
    const altoNatural = imagen.naturalHeight;
    const anchoMostrado = imagen.clientWidth;
    const altoMostrado = imagen.clientHeight;
    const escalaX = anchoNatural / anchoMostrado;
    const escalaY = altoNatural / altoMostrado;

    const rect = imagen.getBoundingClientRect();
    const xClic = evento.clientX - rect.left;
    const yClic = evento.clientY - rect.top;

    const xOriginal = xClic * escalaX;
    const yOriginal = yClic * escalaY;

    let enZona = false;
    for (const zona of zonas) {
        const distancia = Math.sqrt(
            Math.pow(xOriginal - zona.x, 2) + Math.pow(yOriginal - zona.y, 2)
        );
        if (distancia <= zona.radio) {
            enZona = true;
            break;
        }
    }

    imagen.style.cursor = enZona ? "pointer" : "crosshair";
});
