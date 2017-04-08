"use strict";

/**
 * Created by Павел on 08.04.2017.
 */
//Функция addSparkline(pizzeria, rating, ticksNumber) доб авляет Искрографи в соответствующую ячейку.
//Ей передаются три параметра: первый - это название пиццерии, второй - массив с данными по рейтингам
//за прошедшие недели, причем начало массива должно совпадать с прошлой неделей, второй элемент - с
//позапрошлой и т. д., третий параметр - количество столбцов в искрографике, не должно превышать 16.
//Если второй параметр не я вляется массивом, то в консоль выводится ошибка с названием пиццерии,
//с которой переданы не верные параметры. Третий парамтр является необязательным
//и по умолчанию принимает значение длины массива с данными. Так же addSparkline() выделяет столбики, разница значений
//которых с предыдущей неделей равна или больше 13, этим столбикам добавляется класс "sparkline__tick_alert"

function addSparkline(pizzeria, rating, ticksNumber) {
    var $target = $("tr .test-table__pizzeria:contains(" + pizzeria + ")").siblings(".test-table__totals").html(""),
        $sparkline = $("<div class='sparkline'>").appendTo($target);
    if (Array.isArray(rating) === false) {
        rating = [];
        console.error("\u0420\u0435\u0439\u0442\u0438\u043D\u0433\u0438 \u0434\u043B\u044F " + pizzeria + " \u043D\u0435 \u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u043C\u0430\u0441\u0441\u0438\u0432\u043E\u043C");
    }
    if (ticksNumber === undefined || ticksNumber < 1) ticksNumber = rating.length;
    if (ticksNumber > 16) ticksNumber = 16;
    for (var i = 0; i < ticksNumber; i++) {
        var $newTick = $("<div class='sparkline__tick'>");
        if (rating[i] > 100) {
            console.error("Значение рейтинга не должно быть больше ста. ", rating[i], $newTick);
            rating[i] = 100;
        }
        if (rating[i] < 0) {
            console.error("Значение рейтинга не должно быть меньше ноля. ", rating[i], $newTick);
            rating[i] = 0;
        }
        $newTick.height(parseInt(rating[i] / 100 * 17)).prependTo($sparkline).attr("title", "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 = " + rating[i]);
        if (i !== ticksNumber - 1 && rating[i + 1] - rating[i] > 12) $newTick.addClass("sparkline__tick_alert").attr("title", "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 = " + rating[i] + ". \u0420\u0430\u0437\u043D\u0438\u0446\u0430 \u0441 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0439 \u043D\u0435\u0434\u0435\u043B\u0435\u0439 -" + (rating[i + 1] - rating[i]));
    }
    $sparkline.children("div:last-child").addClass("sparkline__tick_active");
    $sparkline.children().mouseenter(function () {
        $sparkline.children().removeClass("sparkline__tick_active");
        $(this).addClass("sparkline__tick_active");
    });
    $sparkline.mouseleave(function () {
        $sparkline.children().removeClass("sparkline__tick_active");
        $sparkline.children("div:last-child").addClass("sparkline__tick_active");
    });
}
$(document).ready(function () {
    addSparkline("Тольятти-2", [100, 99, 34, 54, 65, 77, 88, 99, 32, 67, 43, 67, 89, 45, 56, 43, 87, 65]);
    addSparkline("Вельск-1", [100, 100, 32, 67, 43, 67, 89, 45, 56, 43, 87, 65]);
    addSparkline("Волжский-1", [96, 97, 94, 64, 65, 77, 88, 99, 32, 67, 43, 67, 89, 45, 56, 43, 87, 65], 11);
    addSparkline("Зеленоград-1", [81, 95, 72, 67, 83, 67, 89, 95, 46, 43, 87, 65], 10);
    addSparkline("Московский-1", [100, 100, 94, 64, 65, 77, 88, 99, 32, 67, 43, 67, 89, 45, 56, 43, 87, 65], 6);
    addSparkline("Сыктывкар-5", [100, 97, 72, 67, 83, -67, 89, 95, 46, 43, 87, 65], 10);
});