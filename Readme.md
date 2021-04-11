# Webpack-config

## Description

Webpack configs for:
- React 
- React + TypeScript 

## Project`s structure

    -/ ProjectFolder
        -/ build
        -/ src
            -/ components
            -/ assets
            -  index.html
            -  index.js
        -/ webpack
        -/ custom_typings
            - import-images.d.ts
        - tsconfig.json  

**`custom_typings` folder and `tsconfig.json` file if you are using TypeScript**        

## Configuration

### Alias

- `@component:` "src/components"
- `@assets:` "src/assets"
- `@img:` "src/assets/images"
- `@styles:` "src/styles"

### devServer
- Live reload
- Default port - 8080
- **Proxies are not configured**

## Getting Started

1. In project and webpack folders run `npm init`
2. In `webpack.config.json` change configuration for yourself
3. Run `npm start` in dev mode

