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

/*Скругление краев таблицы*/
const radius_medium = "8px"
const headers = document.querySelectorAll(".slimtab_nice th");
headers[0].style = "border-radius: " + radius_medium + " 0px 0px 0px !important;";
headers[headers.length-1].style = "border-radius: 0px " + radius_medium + " 0px 0px !important;";

const stringsOfTable = document.querySelectorAll(".slimtab_nice tr");
const lastString = stringsOfTable[stringsOfTable.length-1].children;

lastString
lastString[0].style = "border-radius: 0px 0px 0px  " + radius_medium + "!important;";
lastString[lastString.length-1].style = "border-radius: 0px 0px  " + radius_medium + " 0px !important;";
