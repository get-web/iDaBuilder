# Gulp builder by Vitalii P.

## Особенности

- Используется gulp 4
- Используется postcss
- Минимум абстракций, только чистый нативный код
- Возжность использовать самые современные css свойства к которым будут
  применены _autoprefixer_ и _прогрессивное улучшение_
- Используется транспайлер Babel для поддержки современного JavaScript (ES6) в
  браузерах
- Используется browser-sync для просмотра изменений в реальном времени

## Установка:

- Установите NodeJS (если требуется) и NPM
- Скачайте сборку любым удобным для вас способом, например в консоли с помощью
  Git: `git clone https://github.com/get-web/iDaBuilder.git`
- Перейдите в скачанную папку со сборкой: `cd iDaBuilder`
- Скачайте необходимые зависимости: `npm i`
- Чтобы начать работу, введите команду: `npm run dev` (режим разработки, рабочая
  папка `dev`)
- Чтобы собрать проект, введите команду `npm run prod` (режим сборки c
  оптимизацией, рабочая папка `prod`)
- Если все сделали правильно, собранная страница откроется в браузере
  автоматически и за файлами начнется наблюдение. В консоли будут указаны адреса
  для просмотра сайта

## commands:

`npm run dev ` - Сборка в режиме разработки, отслеживание изменений без сжатия и
оптимизации (рабочая папка **_dev_**)

`npm run prod` - Сборка для продакшена. Минификация стилей, скриптов и
изображений. Отслеживание изменений так же работает, то есть можно продолжать
разработку как и в режиме DEV (рабочая папка **_prod_**)

`npm run create {name}` или `npm run create {name} section` - Создание новых
секций. В папке **_parts_** будет создана новая папка с названием {name}

`npm run create {name} block` - Создание новых блоков. В папке **_parts_** будет
создана новая папка с названием {name}

### Подробнее:

**npm run dev** - Сборка в режиме разработки. Отслеживание изменений без сжатия
и оптимизации

**npm run prod** - Сборка для продакшена. Минификация стилей, скриптов и
изображений. Отслеживание изменений так же работает, то есть можно продолжать
разработку как и в режиме DEV, но скорость сборки соответственно медленне за
счет большего количества процессов.

**npm run create {name}** или **npm run create {name} section** или **npm run
create {name} block** - Создание новых секций. В папке **_src/template/parts_**
будет создана новая папка с названием _{name}_ (имя которое вы дадите новой
секции/блоку). В папке _{name}_ будут созданы:

- файл {name}.html с разметкой по умолчанию
- папка images внутри которой будет создана папка {name}
- папка css внутри которой будет создан файл {name}.css. Путь к файлу {name}.css
  будет автоматически добавлен в конец файла main.css
- папка js внутри которой будет создан файл {name}.js (Подключение js файлов
  осуществляется в ручную в _./cfg/paths.js_ в массиве _template.js.src_)

Пример структуры для команды **npm run create example**:

![](https://raw.githubusercontent.com/get-web/Examples/main/other/gulp-builder.jpg)

### Пример подключения секций/блоков:

```

<!-- inject:../parts/header/header.html -->
<!-- endinject -->

<!-- inject:../parts/footer/footer.html -->
<!-- endinject -->
```

Подробнее [тут](https://www.npmjs.com/package/gulp-inject)

## Страницы:

- Страницы создаются в папке **_src/template/pages_** они автоматически будут
  включены в сборку

## Favicon:

- Иконка автоматически генерируется из **_src/images/favicon/favicon.png_**
  любого размера, но чем больше тем лучше

## CSS:

- в файле **_src/css/\_mixin.css_** находятся миксины
- в файле **_src/css/\_media.css_** находятся брейкпоинты
- в файле **_src/css/\_variables.css_** находятся глобальные css переменные
- в файле **_src/css/normalize.css_** задаются свойства по умолчанию
- в файле **_main.css_** подключаются все необходимые файлы css, которые попадут
  в сборку

## JS:

- в файл **_src/js/main.js_** подключаются все файлы js, которые попадут в
  сборку (_Требуется перезагрузка сборки в ручную_)

## Media:

- В папке **_src/template/parts_** находятся блоки, в каждом блоке находится
  папка images внутри которой находится папка с изображениями, название папки
  соответствует названию блока. Все изображения и другие медиа файлы будут
  добавлены в сборку автоматически.
- Остальные, общие изображения находятся в папке **_src/images_**

## Fonts:

- Шрифты находятся в папке **_src/fonts/_**, они будут добавлены в сборку
  автоматически, без изменений в соответствующую папку

## Подключаемые библиотеки:

- В папке **_src/libs_** находятся любые билиотеки, которые необходимо
  подключить отдельно от сборки, все файлы из этой папки будут перенесены
  автоматически без изменений в соответсвующую паку **libs**

## :open_file_folder: Файловая структура

```
gulp-pug-starter
├── cfg
├── dev
├── modules
├── prod
├── src
│   ├── css
│   ├── fonts
│   ├── images
│   ├── js
│   ├── libs
│   ├── template
|       ├── pages
│       └── parts
├── gulpfile.js
├── index.js
├── package-lock.json
├── package.json
├── .npmrc.js
└── .gitignore
```
