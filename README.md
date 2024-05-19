# Prueba técnica BBVA Memory Cards

[https://bbvaengineering.github.io/challenges/memory/](https://bbvaengineering.github.io/challenges/memory/)

## Requisitos propuestos
- [x] La aplicación deberá contener funcionalmente, como mínimo, las instrucciones detalladas en el enunciado.
- [x] El código debe ser público.
- [x] Se deberán realizar tests unitarios de las vistas y de los componentes de la aplicación.
- [x] Se podrá utilizar cualquier infraestructura de alojamiento pública como, por ejemplo, **Vercel**, Netlify o Github Pages.
  URL de la app: [https://memory-cards-theta.vercel.app/](https://memory-cards-theta.vercel.app/)
- [x] Se debe subir un fichero README.md al repositorio con las instrucciones para hacer funcionar la aplicación en local. Puedes añadir cualquier otro dato que consideres necesario.

## Además:
- [x] Se ha utilizado un linter para mantener la calidad del código, "eslint".
- [x] Se ha usado un formateador de código para mantener la calidad del código, "prettier".
- [x] Se ha implementado un pre-commit para lanzar el linter antes de realizar un commit.
<!-- - [x] Se ha incluido la librería [sinon.js](https://www.npmjs.com/package/sinon) para simular (mock), espiar (spy) y sustituir (stub) las funciones en el código que se está probando. -->

## Decisiones tomadas respecto a la implementación  
- La aplicación se ha implementado con "npm init @open-wc" porque es una forma rápida y fácil de configurar un proyecto moderno de componentes web con todas las herramientas y configuraciones necesarias para un desarrollo eficiente y de alta calidad.
- Cada componente esta en una carpeta en el cual se encuentran tres ficheros (logica de negocio, estilos y test), para facilitar su mantenimiento y lectura,
- Se ha optado por @vaadin/router para poder crear una SPA con sus rutas.

## Tecnologías utilizadas

- **Web Components**: Utilizando la especificación de Web Components para crear componentes reutilizables y encapsulados.
- **LitElement**: Una biblioteca ligera para la creación de componentes web con HTML y JavaScript moderno.
- **Lit HTML**: Una biblioteca para escribir templates HTML de forma más legible y eficiente.
- **ES Modules**: Utilizando módulos de JavaScript para organizar y reutilizar el código de manera modular.
- **Rollup**: Una herramienta de bundling que permite empaquetar los módulos de JavaScript en un único archivo para producción.
- **Karma**: Un test runner para ejecutar los tests de unidad en diferentes navegadores.
- **ESLint**: Herramienta de linting para mantener consistencia en el código JavaScript y detectar errores potenciales.
- **Prettier**: Formateador de código para mantener un estilo de código consistente y legible.
- **Webpack Dev Server**: Servidor de desarrollo para probar y trabajar en la aplicación localmente durante el desarrollo.

## Instalación y uso

### Requisitos
- Instalar [GIT](https://git-scm.com/downloads) en tu sistema. Puedes descargar la versión más reciente de Git desde su sitio oficial o utilizar un gestor de paquetes propio de tu sistema operativo (por ejemplo, apt en Ubuntu, brew en macOS, choco en Windows).
- [NodeJS](https://nodejs.org/en/download/) instalado en el sistema, versión 10 con npm 6 o superior.

Para comenzar a usar este proyecto en local, sigue estos pasos:

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/jagogon/memory-cards
    ```
2. Navega a la carpeta del proyecto clonado:
    ```bash
    cd memory-cards
    ```
3. Instala las dependencias del proyecto utilizando npm o yarn:
    ```bash
    npm install
    ```
4. Ejecuta el servidor de desarrollo para comenzar a trabajar en tu aplicación:
    ```bash
    npm start
    ```
5. Abre tu navegador y visita [http://localhost:8000](http://localhost:8000).

### Ejecutar los tests

```bash
npm run test
```
Puedes velo de forma gráfica en el enlace proporcionado al ejecutar los test coverage\lcov-report\index.html. 

## Licencia
Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).
