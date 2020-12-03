// var style = document.createElement('link');
// style.rel = 'icon';
// style.type = 'image/png';
// style.href = chrome.extension.getURL('logo.png');
// document.getElementsByTagName('head')[0].appendChild(style);

/****ПРОПУЩЕННЫЕ ЗАНЯТИЯ****/

/*Смена цвета текста "Всего пропущено занятий: */
const div = document.querySelector(".span9");
const color_red = "#E87D7D";

const index = div.innerHTML.indexOf("\nВсего пропущено занятий:");
if (index >= 0) {
	const propusk = div.innerHTML.substring(index);
	div.innerHTML = div.innerHTML.substring(0, index);
	const newDiv = document.createElement('div');
	newDiv.style.color = color_red;
	newDiv.innerHTML = propusk;
	div.appendChild(newDiv);
}

/*ОБЪЯВЛЕНИЯ*/
/*сомнительный костыль отступов между абзацами, можно доработать.
СКРИПТ МЕНЯЕТ ТАКЖЕ И РАЗДЕЛ "СООБЩЕНИЯ ОТ ПРЕПОДАВАТЕЛЕЙ", ЧТО ДЕЛАЕТ ЕГО ЕЩЕ БОЛЕЕ СОМНИТЕЛЬНЫМ.
*/
const lis = document.querySelectorAll("body > div.container > div > div.span9 > ul > li");
lis.forEach(li => {
    li.querySelectorAll("br").forEach(x => { 
    const new_br = document.createElement('br');
    li.append(new_br);
    li.insertBefore(new_br, x);
    });
});
