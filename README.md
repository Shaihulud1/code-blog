# Админ панель стафингового приложения

## Требования
npm >= 7.0 , node >= 16.5.0, yarn >= 1.22.10

### Технологии
-   [vue.js 3](https://v3.vuejs.org/)
-   [PrimeVue](https://www.primefaces.org/primevue/)
-   [apollo vue](https://apollo.vuejs.org/)
-   [typescript](https://www.typescriptlang.org/)

## Запуск
Склонировать репозиторий, зайти в корень прописать yarn install.
Чтобы админка стучалась в нужный бекенд, нужно создать .env файл в конфиг и прописать туда: 
VUE_APP_API_HOST=ВАШ_ХОСТ

### Запуск дев сервера
```
yarn serve
```

### Компиляция боевого сервака
```
yarn build
```
