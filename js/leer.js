const zonas = [
    {
        x: 672, // Shikamaru (extremo izquierda)
        y: 420,
        radio: 100,
        url: "/paginas/shikamaru.html",
        nombre: "Zona Shikamaru",
    },
    {
        x: 996, // Sasuke
        y: 420,
        radio: 100,
        url: "/paginas/sasuke.html",
        nombre: "Zona Sasuke",
    },
    {
        x: 1080, // Kakashi (arriba)
        y: 180,
        radio: 100,
        url: "/paginas/kakashi.html",
        nombre: "Zona Kakashi",
    },
    {
        x: 1188, // Naruto (centro frente)
        y: 576,
        radio: 100,
        url: "/paginas/naruto.html",
        nombre: "Zona Naruto",
    },
    {
        x: 1308, // Iruka (arriba centro)
        y: 264,
        radio: 100,
        url: "/paginas/iruka.html",
        nombre: "Zona Iruka",
    },
    {
        x: 1380, // Sakura
        y: 552,
        radio: 100,
        url: "/paginas/sakura.html",
        nombre: "Zona Sakura",
    },
    {
        x: 1572, // Gaara (arriba derecha)
        y: 228,
        radio: 100,
        url: "/paginas/gaara.html",
        nombre: "Zona Gaara",
    },
    {
        x: 1728, // Rock Lee (extremo derecha)
        y: 516,
        radio: 100,
        url: "/paginas/rocklee.html",
        nombre: "Zona Rock Lee",
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
