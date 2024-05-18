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
- [x] Se ha utilizado un pre-push para lanzar los test antes de realizar un push.

## Decisiones tomadas respecto a la implementación
  ### Tecnologias
- Se ha utilizado lit-element para la creación de componentes web, ya que es una librería que permite la creación de componentes web de forma sencilla.
- Se ha optado por @vaadin/router para poder crear una spa con sus rutas


### Decisiones especificas

- Los test están ubicados a la altura del mismo componente para facilitar su mantenimiento y lectura.


## Tecnologias utilizadas

- **lit-element**: para la creación de componentes web.
que se suban test fallidos, y se mantenga la calidad del código".
- **rollup**: para empaquetar la aplicación.
- **karma**: para las pruebas unitarias.
-  **eslint**: para mantener la calidad del código.
- **prettier**: para formatear el código.

 

## Instalación y Uso

Para comenzar a usar este proyecto, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
```bash
git clone https://github.com/jagogon/memory-cards
```
2. Instala las dependencias del proyecto utilizando npm o yarn.
```bash
npm install
```
3. Ejecuta el servidor de desarrollo para comenzar a trabajar en tu aplicación.
```bash
npm start
```
4. Abre tu navegador y visita http://localhost:8000.


### para lanzar los tests

```bash
npm run test
```


<!-- <p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## Open-wc Starter App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Quickstart

To get started:

```bash
npm init @open-wc
# requires node 10 & npm 6 or higher
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `public` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project
- `format` fixes linting and formatting errors

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files. -->
