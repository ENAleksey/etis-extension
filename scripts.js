// var style = document.createElement('link');
// style.rel = 'icon';
// style.type = 'image/png';
// style.href = chrome.extension.getURL('logo.png');
// document.getElementsByTagName('head')[0].appendChild(style);

/**** ЗАМЕТКИ ****/

const openNote = () => {
	alert('Ждите в следующих обновлениях!')
}

/****СТРАНИЦА ВХОДА****/
/*Удаление текста и перенос его в другой элемент*/
/*Скрипт выполняется только на двух страницах*/
if (window.location.href === 'https://student.psu.ru/pls/stu_cus_et/stu.login') {
	/*Удаление текста при входе в ЕТИС*/
	const div2 = document.getElementsByClassName("items")[0];
	const index2 = div2.innerHTML.indexOf("По всем вопросам звоните по телефону 2396870. Специалист службы технической поддержки находится в кабинете 245 (бывший кабинет отдела пропусков), расположенном между первым и вторым корпусом на 2 этаже.");
	if (index2 >= 0) {
		const etis_text = div2.innerHTML.substring(index2);
		div2.innerHTML = div2.innerHTML.substring(0, index2);
		const headerMessage = document.getElementsByClassName('header_message')[0];
		headerMessage.innerText = etis_text;
	}
}

/*логин и пароль выделяются красным бордером, если введены неправильно*/
if (window.location.href === 'https://student.psu.ru/pls/stu_cus_et/stu.login'){
	const errorMessage = document.getElementsByClassName('error_message')[0];
	
	if (typeof errorMessage !== 'undefined') {
		const redInputs = document.querySelectorAll(".login .items .item input")
		const redILabels = document.querySelectorAll("div.item > label")
		const colorError = "#D04524";
		redInputs[0].style.border = '2px solid ' + colorError;
		redInputs[1].style.border = '2px solid ' + colorError;
		redILabels[0].style.color = colorError;
		redILabels[1].style.color = colorError;
	}
}

/**** СТРАНИЦА ПРЕПОДАВАТЕЛЕЙ ****/

if (window.location.href === 'https://student.psu.ru/pls/stu_cus_et/stu.teachers') {
	// Удаление элементов br между ссылкой на статистику и карточками преподов
	const brs = document.querySelectorAll('.span9 > br');
	brs.forEach(br => br.remove());
	
	// Добавление иконки расписания (преподавателей и кафедр) вместо исходной
	const scheduleIcons = document.querySelectorAll("div.span9 > table.teacher_info td.teacher_desc > div.teacher_name > img.tooltip, div.span9 > table.teacher_info td.teacher_desc > div.chair > img.tooltip");
	scheduleIcons.forEach(icon => {
		icon.src='https://raw.githubusercontent.com/ENAleksey/etis-extension/dev/schedule.svg'
		icon.style.display = 'initial';
		});
	
}


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

/**** РАСПИСАНИЕ ****/

if (window.location.href === 'https://student.psu.ru/pls/stu_cus_et/stu.timetable') {
	
	// Добавляем иконки заметок на место иконок журнала старосты
	const noteWrappers = document.querySelectorAll("div.span9 > div.timetable td.pair_jour");
	
	noteWrappers.forEach(noteWrapper => {
		
		if (noteWrapper.children[0]) {
			noteWrapper.children[0].remove()
			
			const note = document.createElement('img');
			note.className = 'kittens_note';
			note.src = 'https://raw.githubusercontent.com/ENAleksey/etis-extension/dev/note.svg';
			note.addEventListener('click', () => openNote());
			
			noteWrapper.appendChild(note);
		}
		
	})
	
}