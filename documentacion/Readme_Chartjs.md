# Documentación/Demo Chart JS

## ¿Qué es Chart.js?

Chart.js es una librería de `JavaScript` simple pero flexible para crear gráficos en la web. Es compatible con varios tipos de gráficos y se puede personalizar ampliamente.

<aside>
💡  Es de `código abierto`, licenciado bajo MIT, y mantenido por una comunidad activa

</aside>

<aside>
💡 Chart.js fue creado y anunciado en 2013, pero ha evolucionado mucho desde entonces.

</aside>

## Características Principales

- **Tipos de Gráficos:** Ofrece varios tipos de gráficos integrados y soporta gráficos mixtos.
- **Personalización:** Altamente personalizable mediante plugins para anotaciones, zoom, y más.
- **Configuraciones Predeterminadas:** Viene con configuraciones predeterminadas sólidas y animaciones activadas por defecto.
- **Integraciones:** Compatible con React, Vue, Svelte, Angular, y tiene tipados de TypeScript. https://www.chartjs.org/docs/latest/getting-started/integration.html

<aside>
💡 Chart.js viene con una configuración predeterminada sólida, lo que facilita mucho el inicio y permite obtener una aplicación lista para producción. Es probable que obtengas un gráfico muy atractivo incluso si no especificas ninguna opción. Por ejemplo, Chart.js tiene animaciones activadas por defecto, por lo que puedes atraer instantáneamente la atención hacia la historia que estás contando con los datos.

</aside>

## Instalación de Chart.js

- **npm**

Para instalar Chart.js usando npm:

```bash
npm install chart.js
```

Puedes encontrar los archivos compilados de Chart.js en:

- CDNJS: [https://cdnjs.com/libraries/Chart.js](https://cdnjs.com/libraries/Chart.js)
- jsDelivr: [**https://www.jsdelivr.com/package/npm/chart.js?path=dist**](https://www.jsdelivr.com/package/npm/chart.js?path=dist)

## Guía paso a paso

En este ejemplo usaremos Radar chart, explicado más adelante.

Para crear un nuevo proyecto con chart.js:

1. Crear un archivo “package.json”

```json
{
  "name": "chartjs-example",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
  },
  "devDependencies": {
    "parcel": "^2.6.2"
  },
  "dependencies": {
    "@cubejs-client/core": "^0.31.0",
    "chart.js": "^4.0.0"
  }
}
```

2. Instalar las dependencias:

```bash
npm install
```

3. Crear la carpeta “src”
4. Dentro de la carpeta src crear un archivo “index.html”

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Chart.js example</title>
  </head>
  <body>
    <!-- <div style="width: 500px;"><canvas id="dimensions"></canvas></div><br/> -->
    <div style="width: 800px"><canvas id="acquisitions"></canvas></div>

    <!-- <script type="module" src="dimensions.js"></script> -->
    <script type="module" src="acquisitions.js"></script>
  </body>
</html>
```

5. Crear el archivo “acquisitions.js”

```jsx
import Chart from "chart.js/auto"; // Importamos la librería Chart.js

(async function () {
  // Función autoejecutable asincrónica para inicializar el gráfico
  const data = {
    labels: [
      // Etiquetas para cada punto del gráfico
      "Coherencia del modelo de negocio",
      "Conocimiento del cliente",
      "Salud financiera",
      "Alineación en la comunicación interna",
      "Conocimiento del negocio",
    ],
    datasets: [
      {
        label: "Resultados", // Etiqueta del primer conjunto de datos
        data: [2, 1, 2, 2, 3], // Datos correspondientes a cada etiqueta
        fill: true, // Rellenar el área bajo la línea del radar
        backgroundColor: "rgba(153, 102, 255, 0.2)", // Color de fondo del área
        borderColor: "rgb(153, 102, 255)", // Color del borde del área
        pointBackgroundColor: "rgb(153, 102, 255)", // Color de fondo de los puntos
        pointBorderColor: "#fff", // Color del borde de los puntos
        pointHoverBackgroundColor: "#fff", // Color de fondo de los puntos al pasar el cursor
        pointHoverBorderColor: "rgb(153, 102, 255)", // Color del borde de los puntos al pasar el cursor
      },
      {
        label: "Ideal", // Etiqueta del segundo conjunto de datos
        data: [1, 2, 3, 4, 4],
        fill: true,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        pointBackgroundColor: "rgb(255, 159, 64)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 159, 64)",
      },
    ],
  };

  new Chart(document.getElementById("acquisitions"), {
    // Crear una nueva instancia de Chart
    type: "radar", // Tipo de gráfico: radar
    data: data, // Configuración de los datos
    options: {
      // Configuración de las opciones del gráfico
      plugins: {
        // Configuración de los plugins adicionales
        legend: {
          // Configuración de la leyenda
          display: true, // Mostrar la leyenda
          position: "top", // Posición de la leyenda: arriba
        },
        tooltip: {
          // Configuración del tooltip
          callbacks: {
            // Definición de callbacks para el tooltip
            label: function (context) {
              // Función para personalizar la etiqueta del tooltip
              return context.dataset.label + ": " + context.raw; // Mostrar etiqueta y valor del tooltip
            },
          },
        },
        title: {
          // Configuración del título del gráfico
          display: true, // Mostrar el título
          text: "Radar estratégico organizacional", // Texto del título
          font: {
            // Configuración de la fuente del título
            size: 18, // Tamaño de la fuente del título
          },
        },
      },
      elements: {
        // Configuración de los elementos gráficos
        line: {
          // Configuración de las líneas del radar
          borderWidth: 3, // Ancho del borde de las líneas
        },
      },
      scale: {
        // Configuración de la escala del gráfico
        ticks: {
          // Configuración de los ticks (marcas) en los ejes
          beginAtZero: true, // Empezar en cero
          max: 4, // Valor máximo en el eje
          stepSize: 1, // Incremento entre ticks
          font: {
            // Configuración de la fuente de los ticks
            size: 14, // Tamaño de la fuente
          },
        },
      },
      animation: {
        // Configuración de la animación del gráfico
        duration: 2000, // Duración de la animación en milisegundos
        easing: "easeOutBounce", // Tipo de easing para la animación
      },
    },
  });
})();
```

6. Ejecutar:

```bash
npm run dev
```

Navega a `localhost:1234` en tu navegador web para ver el gráfico.

## Aspectos generales de Chart.js

- Accesibilidad
  - Los gráficos de Chart.js se renderizan en elementos canvas, que no son accesibles para lectores de pantalla por defecto.
  - Se puede añadir accesibilidad usando atributos ARIA en el elemento canvas.
- Colores
  Hay tres opciones para personalizar el color
  - Cambia colores de fondo y borde.

    - Cambia el color de la fuente.
    <aside>
    💡 También se puede cambiar el color de fondo del canvas.

    </aside>

    - **Valores por defecto:** Si no se especifican colores, se usan los valores predeterminados de `Chart.defaults`.
    - **Configuración por dataset:** Especifica `backgroundColor` y `borderColor` para cada conjunto de datos.
    - **Formatos de Color:** Hexadecimal, RGB/RGBA, HSL/HSLA.
    - **Patrones y Gradientes:** Puedes usar `CanvasPattern` o `CanvasGradient` para efectos especiales.
- Estructuras de Datos

  - **Propiedad `data` del dataset:** Puede pasarse en varios formatos.
  - **Propiedad `labels`:** Debe contener la misma cantidad de elementos que el dataset con más valores. Etiquetas pueden ser cadenas o números.
  - Formatos de Datos
  - **Array de números:** Asocia valores de `labels` con el eje índice.
  - **Array de objetos:** Cada objeto debe contener `x` e `y` o propiedades personalizadas.
    <aside>
    🧑🏻‍💻 Uso de Typescript: Al usar TypeScript, si deseas usar una estructura de datos que no es la predeterminada, debes pasarla a la interfaz de tipo al instanciar la variable de datos.

    </aside>

- Fuentes
  En Chart.js, se pueden cambiar todas las fuentes de un gráfico usando configuraciones globales en `Chart.defaults.font`. Estas configuraciones globales solo se aplican cuando no se incluyen opciones más específicas en la configuración del gráfico.
  - **Propiedades de Fuentes**
    - family: Familia de fuentes predeterminada para todo el texto (por defecto: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif).
    - size: Tamaño de fuente predeterminado en px (por defecto: 12).
    - style: Estilo de fuente predeterminado (por defecto: 'normal').
    - weight: Peso de la fuente predeterminado (opciones: normal, bold, lighter, bolder, número).
    - lineHeight: Altura de línea individual del texto (por defecto: 1.2).
  - **Problemas Comunes**
    - **Fuentes Faltantes:** Si se especifica una fuente que no existe en el sistema, el navegador no la aplicará.
    - **Cargar Fuentes:** Si una fuente no está en caché y necesita cargarse, los gráficos que la usan deben actualizarse una vez cargada. Esto se puede hacer usando las APIs de Carga de Fuentes.
- Padding
  - **Número:** Aplica el mismo valor de padding a todos los lados (izquierda, arriba, derecha, abajo).
  - **Objeto {top, left, bottom, right}:** Especifica padding para cada lado individualmente. Los valores omitidos son 0 por defecto.
  - **Objeto {x, y}:** Shorthand para definir el mismo padding a izquierda/derecha (x) y arriba/abajo (y).

# Tipos de gráficos

- **Area Chart:**
  - Gráfico de área que muestra la evolución de una variable en el tiempo, con las áreas bajo la línea llenas.
- **Bar Chart:**
  - Gráfico de barras que representa datos categóricos con barras rectangulares.
- **Bubble Chart:**
  - Gráfico de burbujas donde los puntos se representan con burbujas de diferentes tamaños y posiciones.
- **Doughnut and Pie Charts:**
  - Gráficos de dona y pastel que muestran proporciones de un todo, con segmentos que representan partes del total.
- **Line Chart:**
  - Gráfico de líneas que muestra la evolución de una variable continua a lo largo del tiempo.
- **Mixed Chart Types:**
  - Gráficos mixtos que combinan múltiples tipos de gráficos en uno solo, como barras y líneas.
- **Polar Area Chart:**
  - Gráfico de área polar que muestra datos categóricos en un formato circular con áreas proporcionales a los valores.
- **Scatter Chart:**

  - Gráfico de dispersión que muestra la relación entre dos variables mediante puntos en un plano cartesiano.

  # Radar Chart

  ![Untitled](Documentacio%CC%81n%20Demo%20Chart%20JS%2065aa7a2ce7924d48b103e6e1c37977d3/Untitled.png)
  Es una forma de mostrar múltiples puntos de datos y la variación entre ellos. Son útiles para comparar los puntos de dos o más conjuntos de datos diferentes.

  - **Estructura de Datos**

    - **labels**: Etiquetas que describen cada punto de datos.
    - **datasets**: Conjuntos de datos que contienen valores numéricos y configuraciones de visualización como colores y estilos.
      <aside>
      💡 El formato interno de los datos para un gráfico radar consiste en un arreglo de números que corresponden a las etiquetas especificadas.

      </aside>

      ```jsx
      data: {
          labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
          datasets: [{
              data: [20, 10, 4, 2]
          }]
      }
      ```

  - **Propiedades de los Datasets**
    - Permite configurar propiedades específicas para cada conjunto de datos, como color de fondo, borde, y estilos de puntos y líneas.
    - Propiedades como `backgroundColor`, `borderColor`, `pointBackgroundColor`, `pointBorderColor`, entre otras, son configurables para cada conjunto de datos.
      - **backgroundColor**: Color de fondo del área bajo la línea del conjunto de datos.
      - **borderColor**: Color del borde de la línea del conjunto de datos.
      - **borderWidth**: Ancho del borde de la línea del conjunto de datos.
      - **fill**: Define si se debe rellenar el área bajo la línea (`true`, `false` o `'origin'`).
      - **label**: Etiqueta que aparece en la leyenda y tooltips para este conjunto de datos.
      - **pointBackgroundColor**: Color de fondo de los puntos del conjunto de datos.
      - **pointBorderColor**: Color del borde de los puntos del conjunto de datos.
      - **pointBorderWidth**: Ancho del borde de los puntos del conjunto de datos.
      - **pointHoverBackgroundColor**: Color de fondo de los puntos al pasar el cursor sobre ellos.
      - **pointHoverBorderColor**: Color del borde de los puntos al pasar el cursor sobre ellos.
      - **pointHoverBorderWidth**: Ancho del borde de los puntos al pasar el cursor sobre ellos.
      - **pointHoverRadius**: Radio de los puntos al pasar el cursor sobre ellos.
      - **pointRadius**: Radio de los puntos del conjunto de datos.
      - **pointRotation**: Rotación de los puntos en grados.
      - **pointStyle**: Estilo de los puntos (`'circle'`, `'triangle'`, `'rect'`, etc.).
  - Propiedades Generales
    - `clip`: Controla cómo se recorta el gráfico en relación con el área del gráfico.
    - `label`: Etiqueta que aparece en la leyenda y tooltips para identificar el conjunto de datos.
    - `order`: Determina el orden de dibujo del conjunto de datos.
  - Estilo de Puntos
    - Controla el aspecto visual de los puntos, como color de fondo, borde, tamaño y estilo.
      - **pointBackgroundColor**: El color de relleno para los puntos.
      - **pointBorderColor**: El color del borde para los puntos.
      - **pointBorderWidth**: El ancho del borde del punto en píxeles.
      - **pointHitRadius**: El tamaño en píxeles del punto no visible que reacciona a eventos de mouse.
      - **pointRadius**: El radio de la forma del punto. Si se establece en 0, el punto no se renderiza.
      - **pointRotation**: La rotación del punto en grados.
      - **pointStyle**: El estilo del punto.
  - Estilo de Líneas
    - Configura el estilo de las líneas que conectan los puntos, incluyendo color, anchura, y tipo de unión.
      - **backgroundColor**: Color de relleno de la línea.
      - **borderCapStyle**: Estilo del extremo de la línea (`'butt'`, `'round'`, `'square'`).
      - **borderDash**: Patrón de guiones para la línea.
      - **borderDashOffset**: Desplazamiento del patrón de guiones.
      - **borderJoinStyle**: Estilo de la unión entre segmentos de la línea (`'round'`, `'bevel'`, `'miter'`).
      - **borderWidth**: Ancho de la línea en píxeles.
      - **tension**: Tensión de la curva de Bezier que define la línea.
      - **spanGaps**: Indica si se deben dibujar líneas entre puntos con datos nulos (`true` o `false`).
  - Interacciones
    - Define cómo se comportan los puntos al interactuar con ellos, como cambios de color al pasar el mouse sobre ellos.
      - **pointHoverBorderColor**: Color del borde del punto cuando se pasa el cursor sobre él.
      - **pointHoverBorderWidth**: Ancho del borde del punto cuando se pasa el cursor sobre él.
      - **pointHoverRadius**: Radio del punto cuando se pasa el cursor sobre él.
  - Opciones de Escala
    El gráfico radar admite una única escala, configurada en `scales.r`, que permite ajustar propiedades como límites sugeridos y la visualización de líneas de ángulo.
    ```jsx
    options = {
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 50,
          suggestedMax: 100,
        },
      },
    };
    ```
  - Opciones por Defecto
    Se pueden aplicar configuraciones globales a todos los gráficos radar creados, almacenadas en `Chart.overrides.radar`.

## Referencias

https://www.chartjs.org/docs/latest/
