# Тестовое задание для Valantis

### 1. Описание задания:

Используя предоставленный апи создать страницу, которая отображает список товаров.
Для каждого товара должен отображаться его id, название, цена и бренд.

- выводить по 50 товаров на страницу с возможностью постраничного перехода (пагинация) в обе стороны.
- возможность фильтровать выдачу используя предоставленное апи по названию, цене и бренду

Если API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются. Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос.

Задание можно выполнять на **React** или на **нативном JS**.
Оцениваться будет правильность работы сайта и качество кода.

### 2. Ссылка на выполненное задание

- ##### https://streltsov-do.github.io/valantis/

### 3. Описание приложения

Сайт представляет собой SPA, написанное на фреймворке React.

- При заходе на сайт начинается загрузка данных и показывается лоадер:

![readme1](./readme/readme1.jpg)

- После успешно выполненного запроса выводятся карточки продуктов с ID товара, названием, ценой и брендом (если он есть)

![readme2](./readme/readme2.jpg)

- Пример карточки с брендом

  ![readme3](./readme/readme3.jpg)

- При неуспешном выполнении запроса в консоль будет выведено сообщение с названием функции, кодом ошибки и сообщением от сервера. При отсутствии сообщения - будет выводиться "нет сообщения от сервера":

  ![readme4](./readme/readme4.jpg)

![readme5](./readme/readme5.jpg)

- Можно отфильтровать товары по выбранному фильтру. Для этого нужно выбрать категорию фильтрации, указать параметр фильтрации и нажать кнопку "Применить":

  ![readme6](./readme/readme6.jpg)

- Пример фильтрации по продукту:

  ![readme7](./readme/readme7.jpg)

- Пример фильтрации по цене:

  ![readme8](./readme/readme8.jpg)

- Пример фильтрации по бренду 

  ![readme9](./readme/readme9.jpg)

- При количестве товаров больше 50 - будет возможность перейти на следующую страницу:

  ![readme10](./readme/readme10.jpg)

  

- При нахождении на последней/первой странице - кнопка перехода вперёд/назад будет заблокирована:

  ![readme11](./readme/readme11.jpg)

- При ширине экрана меньше 685 пикселей - применяется мобильная версия

  ![readme12](./readme/readme12.jpg)

