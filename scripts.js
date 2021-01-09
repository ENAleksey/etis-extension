// Load and apply Theme
function detectColorScheme() {
	if (localStorage.getItem("theme")) {
		if (localStorage.getItem("theme") == "dark") {
			return true;
		}
	} else if (!window.matchMedia) {
		return false;
	} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return true;
	}
}

darkTheme = detectColorScheme();
if (darkTheme) {
	document.documentElement.setAttribute("theme", "dark");
} else {
	document.documentElement.setAttribute("theme", "light");
}


// Style
document.addEventListener("DOMContentLoaded", function(event) { 
	setIcon();
	stylePages();
});


// Set Icon
function setIcon() {
	const icon = document.createElement('link');
	icon.rel = 'icon';
	icon.type = 'image/png';
	icon.href = chrome.extension.getURL('logo.png');
	document.querySelector('head').appendChild(icon);
}


// Switch and save Theme
function switchTheme(e) {
	darkTheme = !darkTheme;
    if (darkTheme) {
    	localStorage.setItem('theme', 'dark');
		document.documentElement.setAttribute('theme', 'dark');
		e.srcElement.innerHTML = e.srcElement.innerHTML.replace('Светлая', 'Темная');
    } else {
    	localStorage.setItem('theme', 'light');
		document.documentElement.setAttribute('theme', 'light');
		e.srcElement.innerHTML = e.srcElement.innerHTML.replace('Темная', 'Светлая');
    }    
}


// Style Pages
function stylePages() {
	const login = document.querySelector('body > div.login');
	if (login) {
		document.body.innerHTML = '<div class ="login-container">' + document.body.innerHTML + '</div>';
		const loginContainer = document.querySelector('div.login-container');
		
		const loginItems = document.querySelector('#form > div.items');
		const loginActions = document.createElement('div');
		loginActions.className = 'login-actions';
		loginItems.appendChild(loginActions);
		
		el = loginItems.querySelector('a');
		el.className = 'forgot-password';
		loginActions.appendChild(el);
		
		el = document.getElementById('sbmt');
		loginActions.appendChild(el);
		
		const items = loginItems.querySelectorAll('div.item');
		items.forEach(item => {
			const errorMessage = item.querySelector('div.error_message');
			if (errorMessage) {
				loginContainer.prepend(errorMessage);
				item.remove();
			}

			input = item.querySelector('input');
			if (input) {
				input.placeholder = ' ';
			}
			label = item.querySelector('label');
			if (label) {
				item.appendChild(label);
			}
		});
		
		const infoStr = loginItems.textContent.split("\n").slice(-3)[0].trim();
		const loginFooter = document.querySelector('div.header_message');
		loginFooter.className = 'footer';
		loginFooter.innerHTML = '<p>' + loginFooter.innerHTML + '</p><p>' + infoStr + '</p>';
		loginContainer.appendChild(loginFooter);
		
	} else {
		// Add 'active' class to all active elements in Sidebar
		const asideElements = document.querySelectorAll('.span3 > .nav.nav-tabs.nav-stacked > li');
		for (let i = 0; i < asideElements.length; i++) {
			const element = asideElements[i];
			const link = element.querySelector('a');
			if (link && link.href === window.location.href) {
				element.classList.add('active');
				break;
			}
		}

		// Add Theme Switcher button in Sidebar
		const nav = document.querySelector('div.span3 > ul:nth-last-child(1)');
		if (nav) {
			el = document.createElement("li");
			nav.prepend(el);
			const themeSwitcher = document.createElement("a");
			if (darkTheme) {
				themeSwitcher.appendChild(document.createTextNode("Тема: Темная"));
			} else {
				themeSwitcher.appendChild(document.createTextNode("Тема: Светлая"));
			}
			themeSwitcher.addEventListener('click', switchTheme, false);
			el.appendChild(themeSwitcher);

			nav.querySelectorAll('li > a').forEach(a => {
				navIcon = document.createElement('span');
				navIcon.className = 'material-icons';
				a.prepend(navIcon);
				
				switch (a.getAttribute('href')) {
					case null:
						navIcon.textContent = 'brightness_6';
						break;

					case 'stu.change_pass_form':
						navIcon.innerHTML = 'vpn_key';
						break;

					case 'stu_email_pkg.change_email':
						navIcon.innerHTML = 'alternate_email';
						break;

					case 'stu.change_pr_page':
						navIcon.innerHTML = 'account_box';
						break;

					case 'stu.logout':
						navIcon.innerHTML = 'exit_to_app';
						break;
				}
			});
		}

		// Main page content
		const span9 = document.querySelector('div.span9');
		const page = window.location.pathname.split('/').pop();
		const urlParams = new URLSearchParams(window.location.search);
		const pageMode = urlParams.get('p_mode');
		
		switch (page) {
			case 'stu.teach_plan':

				switch (pageMode) {
					case 'advanced':
						el = span9.querySelector('a:nth-child(2)');
						el.className = 'icon-button icon-feedback';
						el.text = 'Оставить отзыв';

						break;

					case 'short':
					case null:
						el = span9.querySelector('div:nth-child(2)');
						el.className = 'teach-plan';
						
						el = span9.querySelector('div:nth-child(2) > div > a');
						el.className = 'icon-button icon-feedback';
						el.text = 'Оставить отзыв';

						break;
				}
				
				break;
				
			case 'stu.tpr':
				el = span9.querySelector('a');
				el.className = 'icon-button icon-feedback';
				el.text = 'Оставить отзыв';
				
				break;
				
			case 'stu.teachers':
				el = span9.querySelector('a');
				el.className = 'icon-button icon-analytics';
				
				const descriptions = span9.querySelectorAll('.teacher_desc');
				descriptions.forEach(desc => {
					const name = desc.querySelector('.teacher_name');
					btn = document.createElement('a');
					btn.className = 'icon-button2';
					btn.text = 'today';
					img = name.querySelector('img');
					btn.setAttribute('onclick', img.getAttribute('onclick'));
					btn.title = img.title;
					img.remove();
					name.appendChild(btn);
					
					const chair = desc.querySelector('.chair');
					btn = document.createElement('a');
					btn.className = 'icon-button2';
					btn.text = 'today';
					img = chair.querySelector('img');
					btn.setAttribute('onclick', img.getAttribute('onclick'));
					btn.title = img.title;
					img.remove();
					chair.appendChild(btn);
				});
				
				break;

			case 'stu.sc_portfolio':
				const loadDocImgs = span9.querySelectorAll('img[name="load_doc"]');
				loadDocImgs.forEach(img => {
					btn = document.createElement('a');
					btn.className = 'icon-button2';
					btn.text = 'attach_file';
					btn.setAttribute('name', img.getAttribute('name'));
					btn.setAttribute('data-tab', img.getAttribute('data-tab'));
					btn.setAttribute('data-term', img.getAttribute('data-term'));
					btn.setAttribute('data-ttp', img.getAttribute('data-ttp'));
					btn.setAttribute('data-dis', img.getAttribute('data-dis'));
					btn.setAttribute('onclick', 'get_files()');
					img.parentNode.appendChild(btn);
					img.remove();
				});

				break;
				
			case 'stu.timetable':
				const buttonbar = document.createElement('div');
				buttonbar.className = 'timetable-buttonbar';
				span9.prepend(buttonbar);
				
				el = span9.querySelector('div:nth-child(6)');
				el.className = 'timetable-btn consultations';
				buttonbar.appendChild(el);
				
				el = span9.querySelector('a.estimate_tt');
				el.className = 'timetable-btn icon-button icon-feedback';
				el.text = 'Оставить отзыв';
				buttonbar.appendChild(el);
				
				el = span9.querySelector('a:nth-child(5)');
				el.className = 'timetable-btn icon-button icon-today';
				buttonbar.appendChild(el);
				
				
				// const disciplines = document.querySelectorAll("span.dis > a");
				// disciplines.forEach(dis => {
				// 	dis.text = dis.text.replace('(лек)', '/ лекция');
				// 	dis.text = dis.text.replace('(лаб)', '/ лабораторная');
				// 	dis.text = dis.text.replace('(практ)', '/ практика');
				// });
				
				const pairs = document.querySelectorAll("div.day > table > tbody > tr");
				pairs.forEach(pair => {
					const teacher = pair.querySelector('span.teacher');
					if (teacher) {
						const pairTeacher = document.createElement('td');
						pairTeacher.className = 'pair_teacher';
						pairTeacher.innerHTML = teacher.innerHTML;
						pair.appendChild(pairTeacher);
						
						pair.querySelector('td.pair_jour').remove();
						teacher.remove();
					}
				});
				
				break;
			
			case 'stu.change_pass_form':
				const form = document.querySelector('.form');
				const items = document.createElement('div');
				items.className = "items";
				form.prepend(items);
				form.prepend(span9.querySelector('h3'));
				
				const labels = form.querySelectorAll('label');
				const inputs = form.querySelectorAll('input');
				
				for (i = 0; i < inputs.length; i++) {
					inputs[i].placeholder = ' ';
					
					const item = document.createElement('div');
					item.className = "item";
					item.appendChild(inputs[i]);
					item.appendChild(labels[i]);
					items.appendChild(item);
				}
				
				break;
				
			case 'stu_email_pkg.change_email':
				const changeEmailForm = document.querySelector('.form');
				const changeEmailItems = document.createElement('div');
				changeEmailItems.className = "items";
				changeEmailForm.prepend(changeEmailItems);
				changeEmailForm.prepend(span9.querySelector('div'));
				changeEmailForm.prepend(span9.querySelector('h3'));

				const emailLabel = changeEmailForm.querySelector('label');
				const emailInput = changeEmailForm.querySelector("#email");
				emailInput.placeholder = ' ';
					
				const changeEmailItem = document.createElement('div');
				changeEmailItem.className = "item";
				changeEmailItem.appendChild(emailInput);
				changeEmailItem.appendChild(emailLabel);
				changeEmailItems.appendChild(changeEmailItem);
				
				break;

			case 'stu.announce':
				const messages = document.querySelectorAll('.nav.msg');

				messages.forEach(msg => {

					msg.classList.add('message')

					const msgHeader = document.createElement('li');
					msgHeader.className = 'message-header';
					msg.prepend(msgHeader);

					const title = msg.querySelector('font[style="font-weight:bold"]');
					const time = msg.querySelector('font[color="#808080"]');
					time.innerText = time.innerText.substring(0, time.innerText.length - 3);

					// move message's title and date/time to added message's header
					if (title)
						msgHeader.appendChild(title);
					else
						msgHeader.appendChild(document.createElement('font'))
					msgHeader.appendChild(time);

					const msgBodyBrElements = msg.querySelectorAll('li > br');
					msgBodyBrElements[0].remove();
					msgBodyBrElements[1].remove();
				})

				break;
			
			case 'stu.teacher_notes':
				const notes = document.querySelectorAll('.nav.msg');

				notes.forEach(msg => {

					msg.classList.add('message')

					const msgHeader = document.createElement('li');
					msgHeader.className = 'message-header';
					msg.insertBefore(msgHeader, msg.children[0]);

					const teacher = msg.querySelector('b');
					const title = msg.querySelector('font[style="font-weight:bold"]');
					const time = msg.querySelector('font[color="#808080"]');
					const discipline = msg.querySelector('font[title="Показать все сообщения по этой дисциплине"]');

					const mainInfo = document.createElement('div');
					const secondaryInfo = document.createElement('div');

					mainInfo.classList.add('message-info', 'main-info');
					secondaryInfo.classList.add('message-info', 'secondary-info');

					mainInfo.appendChild(teacher);
					if (title)
						mainInfo.appendChild(title);

					secondaryInfo.appendChild(time);
					if (discipline)
						secondaryInfo.appendChild(discipline);

					msgHeader.append(mainInfo, secondaryInfo);

					const msgBodyBrElements = msg.querySelectorAll('li > br');
					msgBodyBrElements[0].remove();
					msgBodyBrElements[1].remove();
					msgBodyBrElements[2].remove();
					msgBodyBrElements[msgBodyBrElements.length - 2].remove();
					msgBodyBrElements[msgBodyBrElements.length - 1].remove();

					const msgBody = msg.querySelectorAll('li')[1];
					msgBody.innerHTML = msgBody.innerHTML.substring('&nbsp;&nbsp;&nbsp;'.length);

					const answerWrapper = document.createElement('li');
					answerWrapper.className = 'answer-wrapper';
					answerWrapper.appendChild(msg.querySelector('input[type="button"]'));
					msg.appendChild(answerWrapper);
				})

				break;
		}
	}
}