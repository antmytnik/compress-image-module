# compress-image-module инструкция
Данный модуль сжимает изображения загруженные в input[type=file] и возвращает массив сжатых изображений. Степень сжатия определяется настройками.
>Верстка, стили и файл main.js нужны чтобы продемонстрировать как работает compressor.js
### Как использовать conpressor.js
1. Импортируем js модуль <script src="compressor.js"></script>
2. Вызываем compressAll(input, width, height, quality, param)
> object: input - ссылка на input[type=file]  
> int: width - ширина изображения  
> int: height - высота изображения  
> int: quality - качество изображения.(0-100)  
> string: param - параметры маштабирования. На данный момент только: "stretch" - растягивает изображение на width или height, "contain" - уменьшает высоту и ширину без потери соотношения сторон
3. После вызова compressAll(), возвращает массив со сжатыми изображениями в base64. Вида:
>Array(4)  
>   0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZA...",  
>   1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZA...",  
>   2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZA...",  
>   3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZA..."  