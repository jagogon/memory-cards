# Prueba técnica BBVA Memory Cards

<a href="https://bbvaengineering.github.io/challenges/memory/" target="_blank">https://bbvaengineering.github.io/challenges/memory/</a>

## Requisitos propuestos
- [x] La aplicación deberá contener funcionalmente, como mínimo, las instrucciones detalladas en el enunciado.
- [x] El código debe ser público
- [x] Se deberán realizar tests unitarios de las vistas y de los componentes de la aplicación.
- [x] Se podrá utilizar cualquier infraestructura de alojamiento pública como, por ejemplo, ***Vercel***, Netlify o Github Pages.
  Url App: <a href="https://memory-cards-theta.vercel.app/" target="_blank">https://memory-cards-theta.vercel.app/</a>
- [x] Se debe subir un fichero README.md al repositorio con las instrucciones para hacer funcionar la aplicación en local. Puedes añadir cualquier otro dato que consideres necesario.

## Tambien:
- [x] Se ha utilizado un linter para mantener la calidad del código "eslint".
- [x] Se ha utilizado un formateador de código para mantener la calidad del código "pretier".
- [x] Se ha utilizado un pre-commit para lanzar el linter antes de realizar un commit.


## Decisiones tomadas respecto a la implementación
  ### Tecnologias
- Se ha utilizado lit-element para la creación de componentes web, ya que es una librería que permite la creación de componentes web de forma sencilla.
- Se ha optado por @vaadin/router para poder crear una spa con sus rutas


### Decisiones especificas

- Los test están ubicados a la altura del mismo componente para facilitar su mantenimiento y lectura.


## Tecnologias utilizadas

- **Web Components**: Utilizando la especificación de Web Components para crear componentes reutilizables y encapsulados.
- **LitElement**: Una biblioteca ligera para la creación de componentes web con HTML y JavaScript moderno.
- **Lit HTML**: Una biblioteca para escribir templates HTML de forma más legible y eficiente.
- **ES Modules**: Utilizando módulos de JavaScript para organizar y reutilizar el código de manera modular.
- **Rollup**: Una herramienta de bundling que permite empaquetar los módulos de JavaScript en un único archivo para producción.
- **Karma**: Un test runner para ejecutar los tests de unidad en diferentes navegadores.
- **ESLint**: Herramienta de linting para mantener consistencia en el código JavaScript y detectar errores potenciales.
- **Prettier**: Formateador de código para mantener un estilo de código consistente y legible.
- **Webpack Dev Server**: Servidor de desarrollo para probar y trabajar en la aplicación localmente durante el desarrollo.


 

## Instalación y Uso

Para comenzar a usar este proyecto en local, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
```bash
git clone https://github.com/jagogon/memory-cards
```
2. Navega a la carpeta del proyecto clonado.
```bash
cd memory-cards
```
3. Instala las dependencias del proyecto utilizando npm o yarn.
```bash
npm install
```
4. Ejecuta el servidor de desarrollo para comenzar a trabajar en tu aplicación.
```bash
npm start
```
5. Abre tu navegador y visita http://localhost:8000.


### Lanzar los tests

```bash
npm run test
```

## Licencia
Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).
