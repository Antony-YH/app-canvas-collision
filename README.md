<div align="center">

# ✨ Simulador de Colisiones 2D

*Un laboratorio interactivo de física y cinemática directamente en tu navegador.*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

</div>

---

## 📌 Sobre el Proyecto

Aplicación web interactiva diseñada para demostrar de forma visual y atractiva los principios básicos de la física 2D mediante el uso de la API **Canvas de HTML5**. 

El simulador está dividido en tres escenarios independientes que se ejecutan simultáneamente a 60 FPS, permitiendo observar las diferencias matemáticas y visuales entre el movimiento continuo, la detección de intersecciones y las colisiones elásticas reales. Todo esto envuelto en una interfaz moderna con efecto **Glassmorphism** (cristal esmerilado).

<br>

## 🚀 Características Principales

### 🎛️ Control en Tiempo Real
> Un control deslizante global permite inyectar o eliminar partículas (de 2 a 50 círculos) ajustando el ecosistema de las tres simulaciones al vuelo, sin necesidad de recargar la página.

### 🟢 Simulación 1: Movimiento Simple
Los círculos se desplazan a una velocidad constante calculada mediante vectores aleatorios. Rebotan de manera perfectamente elástica contra los límites del lienzo, ignorando por completo la existencia de otros elementos.

### 🔵 Simulación 2: Detección de Colisión
Implementación del teorema de Pitágoras para medir la distancia entre los centros de cada partícula. Si la distancia es menor a la suma de sus radios, el sistema detecta un traslape y los círculos cambian a color **rojo fuego** instantáneamente.

### 🟠 Simulación 3: Rebote Físico Fotorrealista
El escenario más complejo. Las partículas no solo detectan la colisión, sino que resuelven la superposición y calculan el intercambio de energía. Intercambian sus vectores de velocidad (eje X e Y) dependiendo del ángulo de impacto y destellan en **amarillo neón** al chocar.

<br>

## 📂 Estructura del Código

```text
/
├── index.html              # Estructura principal, Grid de Bootstrap y UI Glassmorphism
└── assets/
    ├── css/
    │   └── styles.css      # Variables, animaciones y filtros de desenfoque
    ├── img/
    │   └── fondo.jpg       # Imagen abstracta de fondo (opcional)
    └── js/
        ├── main.js         # Lógica vectorial del Escenario 1
        ├── main_colision.js# Algoritmo de distancia y color del Escenario 2
        └── main_rebote.js  # Matemáticas de trigonometría y colisión elástica del Escenario 3
```

## ⚙️ Instalación y Despliegue

Este proyecto no requiere de dependencias complejas, Node.js ni bases de datos. Es **100% Frontend Client-Side**.

1. **Clona el repositorio** o descarga el código fuente:

   ```bash
   git clone [https://github.com/tu-usuario/simulador-colisiones-2d.git](https://github.com/tu-usuario/simulador-colisiones-2d.git)

## 👨‍💻 Autor
Diseñado y desarrollado por Antonio Yáñez Hernández | © 2026
Materia de Graficacion - ITP

<div align="center">


<i>Si este proyecto te ha resultado útil o interesante, ¡no olvides dejar una ⭐ en el repositorio!</i>
</div>


### ¿Qué hace a este diseño más elegante?

1.  **Etiquetas `<div>` centradas:** Usa HTML dentro del Markdown para centrar el título, subtítulo y las insignias, dándole un aspecto de "página de aterrizaje" (landing page).
2.  **Insignias (Badges):** Incorporé escudos de *shields.io* para HTML5, CSS3, JS y Bootstrap que le dan un toque visual muy profesional a tu stack tecnológico.
3.  **Bloques de Cita (`>`):** Útiles para destacar información importante, como la función del control deslizante.
4.  **Espaciado (`<br>`):** Ayuda a que la información respire y no se vea amontonada.

¿Te gustaría que ahora preparemos los comandos o los pasos exactos para subir este proyecto a GitHub