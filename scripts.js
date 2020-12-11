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

const login = document.querySelector('.login');

/*Удаление текста и перенос его в другой элемент*/
/*Скрипт выполняется только на двух страницах*/
if (window.location.href === 'https://student.psu.ru/pls/stu_cus_et/stu.login' ||
login) {
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

if (window.location.href.match('https://student.psu.ru/pls/stu_cus_et/stu.timetable')) {
	
	const zoomLogos = document.querySelectorAll("div.span9 > div.timetable table td.pair_info span.aud > a > img");
	zoomLogos.forEach(logo => {
		logo.src = 'https://raw.githubusercontent.com/ENAleksey/etis-extension/dev/zoom.svg';
		logo.style.display = 'initial';
	})
	
	// Добавляем иконки заметок на место иконок журнала старосты
	const noteWrappers = document.querySelectorAll("div.span9 > div.timetable td.pair_jour");
	
	noteWrappers.forEach(noteWrapper => {
		const note = document.createElement('img');
		note.className = 'kittens_note';
		note.src = 'https://raw.githubusercontent.com/ENAleksey/etis-extension/dev/note.svg';
		note.addEventListener('click', () => openNote());
		
		if (noteWrapper.children[0]) {
			noteWrapper.children[0].remove()
			
			noteWrapper.appendChild(note);
		}
		
	})
	
}

/**** СООБЩЕНИЯ ОТ ПРЕПОДАВАТЕЛЕЙ ****/

if (window.location.href.match('https://student.psu.ru/pls/stu_cus_et/stu.teacher_notes')) {
	// Скрывает блок с текстом "Страницы"
	const pagesDiv = document.querySelector('div.span9 > div.week-select > ul > li:nth-child(1)');
	pagesDiv.remove();
	
	// Первое сообщение от преподавателя
	const firstMsg = document.querySelector('div.span9 > ul.nav.msg:nth-child(3)');
	firstMsg.style.marginTop = '3rem';
	
	// Убирает отступы (&nbsp) перед именем преподавателя
	let list_ul = document.querySelectorAll('body > div.container > div > div.span9 > ul')
	list_ul.forEach(li => li.innerHTML = li.innerHTML.replace('&nbsp;&nbsp;&nbsp;', ''));
}
