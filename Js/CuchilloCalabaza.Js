const contenedorCalabaza = document.getElementById("JuegoCalabaza");
const V_MIN = Math.min(window.innerWidth, window.innerHeight);
const DOT_DISTANCE = V_MIN / 80;

document.getElementById('sfxCut').currentTime = 1;

let cut = [];
let isMouseDown = false;

function init() {
    const cursor = document.getElementById('cursor');
        
    contenedorCalabaza.addEventListener("pointerdown", handlePointerDown);
    contenedorCalabaza.addEventListener("pointerup", stopCutting);
    contenedorCalabaza.addEventListener("pointermove", handlePointerMove);

    // ✅ Botón "Borrar cortes"
    const resetButton = document.getElementById("resetCuts");
    resetButton.addEventListener("click", () => {
        // Elimina los agujeros y fragmentos cortados
        document.querySelectorAll(".hole, .cutout").forEach(el => el.remove());
        
        // Reinicia las variables de estado
        cut = [];
        isMouseDown = false;

        // Detiene y resetea el sonido de corte
        const sfxCut = document.getElementById('sfxCut');
        sfxCut.pause();
        sfxCut.currentTime = 1;
    });

    function handlePointerDown(e) {
        e.target.releasePointerCapture(e.pointerId);

        // ✅ Coordenadas relativas al contenedor
        const rect = contenedorCalabaza.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        setElementPosition(cursor, relX, relY);
        isMouseDown = true;
    }

    function handlePointerMove(e) {
        // ✅ Calculamos coordenadas relativas al contenedor
        const rect = contenedorCalabaza.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        // ✅ El cuchillo sigue al ratón correctamente
        setElementPosition(cursor, relX, relY);

        if (!isMouseDown) return;

        const mask = document.getElementById('mask');
        if (e.target !== mask) {
            stopCutting();
            return;
        }

        const newPoint = { x: relX, y: relY };

        if (cut.length) {
            const distanceToFirst = calculateDistance(cut.at(0), newPoint);

            if (cut.length > 3 && distanceToFirst < DOT_DISTANCE * 1.5) {
                drawHole();
                stopCutting();
                return;
            }

            const distanceToPrevious = calculateDistance(cut.at(-1), newPoint);
            if (distanceToPrevious < DOT_DISTANCE) return;
        }

        const dot = createDivWithClass("dot");

        // ✅ Dibuja el punto en la posición relativa correcta
        setElementPosition(dot, relX, relY);
        contenedorCalabaza.appendChild(dot);

        document.getElementById('sfxCut').play();

        cut.push(newPoint);
    }
}

function drawHole() {
    const hole = createDivWithClass("hole");
    const cutout = createDivWithClass("cutout");

    const clipPoints = cut.map((p) => `${p.x}px ${p.y}px`).join(", ");
    const clipPath = `polygon(${clipPoints})`;
    hole.style.clipPath = clipPath;
    cutout.style.clipPath = clipPath;

    const firstPoint = cut.at(0);
    cutout.style.transformOrigin = `${firstPoint.x}px ${firstPoint.y}px`;

    // ✅ Esta línea estaba bien: mantenla así
    contenedorCalabaza.appendChild(hole); 
    contenedorCalabaza.appendChild(cutout);

    document.getElementById('sfxHole').currentTime = 0;
    document.getElementById('sfxHole').play();

    setTimeout(() => {
        cutout.remove();
    }, 1000);
}

function stopCutting() {
    document.getElementById('sfxCut').pause();
    document.getElementById('sfxCut').currentTime = 1;
    isMouseDown = false;
    document.querySelectorAll(".dot").forEach((el) => el.remove());
    cut = [];
}

function createDivWithClass(className) {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
}

function setElementPosition(el, x, y) {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
}

function calculateDistance(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y);
}

window.addEventListener('load', init);
