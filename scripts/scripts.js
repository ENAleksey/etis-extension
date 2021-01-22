let titles = {
	'stu.teach_plan': 'Учебный план',
	'stu.tpr': 'Оставить отзыв',
	'stu.teachers': 'Преподаватели',
	'stu.sc_portfolio': 'Портфолио',
	'stu.timetable': 'Расписание',
	'stu.change_pass_form': 'Изменить пароль',
	'stu.change_pass': 'Изменить пароль',
	'stu_email_pkg.change_email': 'Изменить почту',
	'stu.announce': 'Объявления',
	'stu.teacher_notes': 'Сообщения',
	'est_pkg.show_list': 'Обратная связь',
	'stu.signs': 'Оценки',
	'stu.absence': 'Пропущенные',
	'stu.orders': 'Приказы',
	'stu_jour.group_tt': 'Журнал посещений',
	'stu.ses': 'Образовательный стандарт',
	'stu.electr': 'Электронные ресурсы',
	'stu.about': 'О ресурсе',
	'cert_pkg.stu_certif': 'Заказ справок',
	'stu.term_test': 'Анкетирование',
	'stu.special_est_list': 'Опросы',
	'stu.fcl_choice': 'Факультативы',
};

// Set Theme
let theme = 'auto';
let prefersColorSchemeMedia = false;
if (window.matchMedia) {
	prefersColorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
}

function setDarkTheme(e) {
	document.documentElement.setAttribute('theme', e.matches ? 'dark' : 'light');
}

function setSystemThemeDetection() {
	if (window.matchMedia) {
		prefersColorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
		document.documentElement.setAttribute('theme', prefersColorSchemeMedia.matches ? 'dark' : 'light');
		prefersColorSchemeMedia.addEventListener('change', setDarkTheme);
	}
}

function removeSystemThemeDetection() {
	if (window.matchMedia) {
		prefersColorSchemeMedia.removeEventListener('change', setDarkTheme);
	}
}

function detectTheme() {
	if (localStorage.getItem('theme')) {
		theme = localStorage.getItem('theme');
		if (theme == 'auto') {
			setSystemThemeDetection();
		} else {
			document.documentElement.setAttribute('theme', theme);
		}
	} else {
		theme = 'auto';
		setSystemThemeDetection()
	}
}

function switchTheme(e) {
	if (theme == 'auto') {
		theme = 'light';
		e.srcElement.innerHTML = e.srcElement.innerHTML.replace('Системная', 'Светлая');
		document.documentElement.setAttribute('theme', theme);
		removeSystemThemeDetection();
	} else if (theme == 'light') {
		theme = 'dark';
		e.srcElement.innerHTML = e.srcElement.innerHTML.replace('Светлая', 'Темная');
		document.documentElement.setAttribute('theme', theme);
	} else if (theme == 'dark') {
		theme = 'auto';
		e.srcElement.innerHTML = e.srcElement.innerHTML.replace('Темная', 'Системная');
		setSystemThemeDetection();
	}

	localStorage.setItem('theme', theme);
}

detectTheme();

function insertMeta() {
	const meta = document.createElement('meta');
	meta.name = 'viewport';
	meta.content = 'width=device-width, initial-scale=1';
	document.getElementsByTagName('head')[0].appendChild(meta);
}

function changeTitle() {
	let text = 'ЕТИС';
	const page = window.location.pathname.split('/').pop();
	if (page in titles) {
		text += ' - ' + titles[page];
	}
	const title = document.querySelector('title');
	title.textContent = text;
}

// Style
document.addEventListener("DOMContentLoaded", function(event) { 
	if (chrome.runtime.getManifest().stylesInPage){
		const styles = chrome.runtime.getURL('styles.css');
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = styles;
		document.head.append(link);
	}
	insertMeta();
	setIcon();
	changeTitle();
	stylePages();
});

// Set Icon
function setIcon() {
	const icon = document.createElement('link');
	icon.rel = 'icon';
	icon.type = 'image/svg+xml';
	icon.href = chrome.runtime.getURL('icon.svg');
	document.querySelector('head').appendChild(icon);
}

// Style Pages
function stylePages() {
	const page = window.location.pathname.split('/').pop();

	// Style Login Page
	const login = document.querySelector('body > div.login');
	if (login) {
		document.body.innerHTML = '<div class ="login-container">' + document.body.innerHTML + '</div>';
		const loginContainer = document.querySelector('div.login-container');
		
		const loginItems = document.querySelector('#form > div.items');
		const loginActions = document.createElement('div');
		loginActions.className = 'login-actions';
		loginItems.appendChild(loginActions);
		
		if (page != 'stu_email_pkg.send_r_email') {
			document.querySelector('div.choose').remove();
			const psuLogo = document.createElement('div');
			psuLogo.className = 'psu-logo';
			document.getElementById('form').prepend(psuLogo);

			let el = loginItems.querySelector('a');
			el.className = 'forgot-password';
			loginActions.appendChild(el);
		}

		const el = document.getElementById('sbmt');
		loginActions.appendChild(el);
		
		const items = loginItems.querySelectorAll('div.item');
		items.forEach(item => {
			const errorMessage = item.querySelector('div.error_message');
			if (errorMessage) {
				loginContainer.prepend(errorMessage);
				item.remove();
			}

			const input = item.querySelector('input');
			if (input) {
				input.placeholder = ' ';
			}
			const label = item.querySelector('label');
			if (label) {
				item.appendChild(label);
			}
		});
		
		if (page != 'stu_email_pkg.send_r_email') {
			const infoStr = loginItems.textContent.split("\n").slice(-3)[0].trim();
			const loginFooter = document.querySelector('div.header_message');
			loginFooter.className = 'footer';
			loginFooter.innerHTML = '<p>' + loginFooter.innerHTML + '</p><p>' + infoStr + '</p>';
			loginContainer.appendChild(loginFooter);
		}

	} else {
		const sidebar = document.querySelector("div.span3");
		const navbar = document.querySelector('body > div.navbar');
		const container = document.querySelector('body > div.container');

		// Create Profile Card
		const profile = document.createElement('div');
		profile.classList.add('profile');

		const profileHTML = `
			<div class="profile-info">
				<div class="profile-picture">
					<span class="material-icons"></span>
				</div>
				<span class="profile-fullname"></span>
				<span class="profile-email"></span>
				<span class="profile-specialization"></span>
				<div class="ext-settings">
					<span class="ext-settings-icon"></span>
				</div>
			</div>
			<ul class="profile-actions">
				<li class="profile-action-change-password">Смена пароля</li>
				<li class="profile-action-change-email">Указать email</li>
				<li class="profile-action-switch-account">Смена учётной записи</li>
				<li class="profile-action-logout">Выход</li>
			</ul>
		`;

		profile.innerHTML = profileHTML;

		// Wrap content
		if (navbar && container) {
			const fragment = new DocumentFragment();
			const wrapper = document.createElement('div');
			wrapper.classList.add('wrapper');
			fragment.appendChild(wrapper);
			wrapper.appendChild(profile);
			wrapper.appendChild(navbar);
			wrapper.appendChild(container);

			document.body.appendChild(fragment);
		}

		const oldNav = navbar.cloneNode(true);

		// Style Navbar
		if (navbar) {
			document.querySelector('.navbar .container').remove();
			const navbarDoc = new DocumentFragment();

			let menuTitle = 'ЕТИС';
			const page = window.location.pathname.split('/').pop();
			if (page in titles) {
				menuTitle = titles[page];
			}

			const menuDropdown = document.createElement('div');
			menuDropdown.classList.add('navbar-dropdown-menu');
			const menuDropdownIcon = document.createElement('span');
			menuDropdownIcon.classList.add('material-icons');
			menuDropdownIcon.textContent = 'menu';
			menuDropdown.appendChild(menuDropdownIcon);
			const menuDropdownTitle = document.createElement('span');
			menuDropdownTitle.textContent = menuTitle;
			menuDropdown.appendChild(menuDropdownTitle);
			menuDropdown.addEventListener('click', function() {
				if (sidebar) {
					sidebar.toggleAttribute('visible');
				}
			})
			navbarDoc.appendChild(menuDropdown);

			const notifications = document.createElement('div');
			notifications.classList.add('navbar-notifications');
			const notificationsIcon = document.createElement('span');
			notificationsIcon.classList.add('material-icons');
			notificationsIcon.setAttribute('for', 'notifications-toggle');
			notificationsIcon.textContent = 'notifications';
			notifications.appendChild(notificationsIcon);
			navbarDoc.appendChild(notifications);

			const profile = document.createElement('div');
			profile.classList.add('navbar-profile');
			const profileName = document.createElement('span');
			profileName.textContent = 'Жмышенко';
			profile.appendChild(profileName);
			const profileIcon = document.createElement('span');
			profileIcon.classList.add('material-icons', 'outlined');
			profileIcon.textContent = 'account_circle';
			profile.appendChild(profileIcon);
			navbarDoc.appendChild(profile);

			navbar.querySelector('.navbar-inner').appendChild(navbarDoc);
		}

		// Style Sidebar
		if (sidebar) {
			function computeSidebarPosition() {
				const nbrStyle = window.getComputedStyle(navbar.querySelector('.navbar-inner'), null);
				document.documentElement.style.setProperty('--sidebar-margin', nbrStyle.getPropertyValue('margin-left'));
			}
			// Move sidebar to wrapper root
			navbar.after(sidebar);
			computeSidebarPosition();
			window.addEventListener("resize", computeSidebarPosition);

			// Save scroll position for Sidebar on page reload
			const top = sessionStorage.getItem("sidebar-scroll");
			if (top) {
				sidebar.scrollTop = parseInt(top, 10);
			}
			window.addEventListener("beforeunload", () => {
				sessionStorage.setItem("sidebar-scroll", sidebar.scrollTop);
			});

			// Add 'active' class to all active elements in Sidebar
			const asideElements = sidebar.querySelectorAll('.nav.nav-tabs.nav-stacked > li');
			for (let i = 0; i < asideElements.length; i++) {
				const element = asideElements[i];
				const link = element.querySelector('a');
				if (link && link.href === window.location.href) {
					element.classList.add('active');
					break;
				}
			}

			// Style last nav of Sidebar
			const nav = sidebar.querySelector('ul:nth-last-child(1)');
			if (nav) {
				// Add Theme Switcher button in Sidebar
				let el = document.createElement("li");
				nav.prepend(el);
				const themeSwitcher = document.createElement("a");
				themeSwitcher.appendChild(document.createTextNode('Тема: ' + ((theme == 'auto') ? 'Системная' : ((theme == 'dark') ? 'Темная' : 'Светлая'))));
				themeSwitcher.addEventListener('click', switchTheme, false);
				el.appendChild(themeSwitcher);

				// Add icons
				nav.querySelectorAll('li > a').forEach(a => {
					let navIcon = document.createElement('span');
					navIcon.className = 'material-icons';
					a.prepend(navIcon);
					
					switch (a.getAttribute('href')) {
						case null:
							navIcon.innerHTML = 'brightness_6';
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
		}

		// Main page content
		const span9 = document.querySelector('div.span9');
		const urlParams = new URLSearchParams(window.location.search);
		const pageMode = urlParams.get('p_mode');

		const warning = document.querySelector('div.warning');
		if (warning && span9) {
			span9.prepend(warning);
		}
		
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
				
				let el = span9.querySelector('div:nth-child(6)');
				el.className = 'timetable-btn consultations';
				buttonbar.appendChild(el);
				
				el = span9.querySelector('a.estimate_tt');
				el.className = 'timetable-btn icon-button icon-feedback';
				el.text = 'Оставить отзыв';
				buttonbar.appendChild(el);
				
				el = span9.querySelector('a:nth-child(5)');
				el.className = 'timetable-btn icon-button icon-today';
				buttonbar.appendChild(el);

				// Move week header to top
				const fragment = new DocumentFragment();
				const header = document.querySelector('.week-select div:last-child');
				const text = Array.from(header.querySelector('span').childNodes)
					.filter(node => node.nodeType === 3 && node.textContent.trim().length > 1)[0];
				const h3 = document.createElement('h3');
				header.querySelector('span').after(h3);
				h3.appendChild(text);
				header.querySelector('span').remove();
				header.classList.add('week-select-header');
				fragment.appendChild(header);

				document.querySelector('.timetable-buttonbar').prepend(fragment);
				
				
				// const disciplines = span9.querySelectorAll("span.dis > a");
				// disciplines.forEach(dis => {
				// 	dis.text = dis.text.replace('(лек)', '/ лекция');
				// 	dis.text = dis.text.replace('(лаб)', '/ лабораторная');
				// 	dis.text = dis.text.replace('(практ)', '/ практика');
				// });
				
				const pairs = span9.querySelectorAll("div.day > table > tbody > tr");
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
			case 'stu.change_pass':
				const form = span9.querySelector('.form');
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
				const changeEmailForm = span9.querySelector('.form');
				const changeEmailInfo = span9.querySelector('div');
				changeEmailInfo.className = "form-info";
				const changeEmailItems = document.createElement('div');
				changeEmailItems.className = "items";
				changeEmailForm.prepend(changeEmailItems);
				changeEmailForm.prepend(changeEmailInfo);
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
				const weeks = document.querySelector('.weeks');
				weeks.classList.add('message-pages');

				const notes = document.querySelectorAll('.nav.msg');
				notes.forEach(msg => {

					msg.classList.add('message')

					// don't style messages that were sent to teachers
					if (!msg.className.match(/repl_s/)) 
					{
						// create new blocks into message's header
						// and move teacher's name, title, time, discipline to them
						const msgHeader = document.createElement('li');
						msgHeader.className = 'message-header';
						msg.insertBefore(msgHeader, msg.children[0]);

						const teacher = msg.querySelector('b');
						const title = msg.querySelector('font[style="font-weight:bold"]');
						const time = msg.querySelector('font[color="#808080"]');
						time.innerText = time.innerText.substring(0, time.innerText.length - 3);
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

						// remove unnecessary <br> elements from message
						const msgBodyBrElements = msg.querySelectorAll('li > br');
						msgBodyBrElements[0].remove();
						msgBodyBrElements[1].remove();
						msgBodyBrElements[2].remove();
						msgBodyBrElements[msgBodyBrElements.length - 2].remove();
						msgBodyBrElements[msgBodyBrElements.length - 1].remove();

						// remove unnecessary space from message
						const msgBody = msg.querySelectorAll('li')[1];
						msgBody.innerHTML = msgBody.innerHTML.substring('&nbsp;&nbsp;&nbsp;'.length);

						const answerWrapper = document.createElement('li');
						answerWrapper.className = 'answer-wrapper';
						const answerInput = msg.querySelector('input[type="button"]');
						const answerButton = document.createElement('button');

						// replace send input with send button
						answerButton.setAttribute('id', answerInput.id);
						answerButton.setAttribute('onclick', answerInput.getAttribute('onclick'));
						answerButton.innerText = 'Добавить ответ';
						answerButton.addEventListener('click', () => {
							answerButton.remove();
							answerWrapper.remove();

							const listElementsCount = msg.querySelectorAll('li').length;
							const listElementWithPadding = msg.querySelector('li:nth-last-child(3)');
							const listElemenNeedsPadding = msg.querySelector('li:nth-last-child(2)');
							if (listElementsCount > 2) {
								listElementWithPadding.style = 'padding-bottom: 0 !important';
								listElemenNeedsPadding.style.paddingBottom = '3.2rem';
							}
							else {
								listElementWithPadding.style = 'padding-bottom: 1.8rem !important';
							}
						});

						answerInput.remove();
						answerWrapper.appendChild(answerButton);

						msg.appendChild(answerWrapper);
					}
				})

				break;
		}
	}
}