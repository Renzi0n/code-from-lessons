# React todo project
npm run dev - запустить проект

## Пример итогового проекта
https://todo-liga-internship.vercel.app/

## Технологии которые используются в проекте

React, React-router-dom, Typescript, MobX, Axios, React Hook Form, Yup
Webpack, eslint, prettier

## Структура шаблона

```
.
├── .vscode                                    # конфигурация под vs-code
├── dist                                       # папка для билда
├── config
│   ├── constants.js                           # константные пути к файлам и папкам
│   ├── css.modules.config.js                  # конфигурация css modules
│   ├── jest.config.js                         # конфигурация jest
│   ├── postcss.config.js                      # конфигурация postcss
│   ├── svgo.config.js                         # конфигурация обработки svg
│   ├── test.config.js                         # конфигурация окружения Jest, React Testing Library
│   ├── webpack.config.cache.js                # конфигурация кеширования окружения webpack
│   ├── webpack.config.dev.js                  # конфигурация dev окружения webpack
│   ├── webpack.config.env.js                  # парсинг .env и проброс переменных в webpack
│   ├── webpack.config.https.js                # конфигурация dev сервера с https
│   ├── webpack.config.js                      # базовый конфиг webpack
│   ├── webpack.config.modules.js              # обработка путей к папкам из tsconfig для webpack
│   ├── webpack.config.prod.js                 # конфигурация сборки
│   └── webpack.config.styles.js               # конфигурация обработчиков css
├── src
│   ├── __mocks__                              # Папка для всех моков
│   ├── app                                    # точка входа, компонент App
│   ├── components                             # папка для компонентов без бизнес-логики (dumb components)
│   ├── constants                              # константы разбитые по файлам
│   ├── domains                                # интерфейсы для бизнес логики. Формат файлов: название сущености.entity.ts
│       ├── task.entity.ts                       # например, файл для сущности task
│   ├── helpers                                # вспомогательные функции, также разбиваем по файлам. Например, delay.ts
│   ├── http                                   # папка для работы с сетью
│       ├── agent                                # агенты, также пофайлово
│       ├── model                                # типы из swagger и их компановка
│   ├── modules                                # Основные компоненты с бизнес-логикой
│       ├── Task                                 # Например, модуль Task, в котором содержится компонент карточки задачи. В этой папке также должны лежать store, стили, внутренние компоненты(папка components), типы. В общем, все что относится к данному модулю
│   ├── pages                                  # Страницы, которые подключаются в роутере
│   ├── router                                 # сам роутер(по сути один файл)
│   ├── index.html                             # корневой html
│   ├── index.tsx                              # точка входа в приложение для webpack
│   ├── react-app-env.d.ts                     # декларация модулей и переменных
├── .browserlistsrc                            # список браузеров для autoprefixer
├── .editorconfig                              # настройки для редакторов
├── .eslintignore                              # игнорирование eslint
├── .eslintrc                                  # Конфиг Eslint
├── .gitignore                                 # Игнор файл для гита
├── .prettierrc                                # Конфиг prettier
├── package.json
├── tsconfig.json                              # Конфиг тайпскрипта
└── README.md
```


