// Set Theme
theme = 'auto';
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


// Style
document.addEventListener("DOMContentLoaded", function(event) { 
	setIcon();
	stylePages();
});


// Set Icon
function setIcon() {
	const icon = document.createElement('link');
	icon.rel = 'icon';
	icon.type = 'image/svg+xml';
	icon.href = chrome.extension.getURL('icon.svg');
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

			el = loginItems.querySelector('a');
			el.className = 'forgot-password';
			loginActions.appendChild(el);
		}

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
		
		if (page != 'stu_email_pkg.send_r_email') {
			const infoStr = loginItems.textContent.split("\n").slice(-3)[0].trim();
			const loginFooter = document.querySelector('div.header_message');
			loginFooter.className = 'footer';
			loginFooter.innerHTML = '<p>' + loginFooter.innerHTML + '</p><p>' + infoStr + '</p>';
			loginContainer.appendChild(loginFooter);
		}

	} else {
		// Style Sidebar
		const sidebar = document.querySelector("div.span3");
		if (sidebar) {
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
				el = document.createElement("li");
				nav.prepend(el);
				const themeSwitcher = document.createElement("a");
				themeSwitcher.appendChild(document.createTextNode('Тема: ' + ((theme == 'auto') ? 'Системная' : ((theme == 'dark') ? 'Темная' : 'Светлая'))));
				themeSwitcher.addEventListener('click', switchTheme, false);
				el.appendChild(themeSwitcher);

				// Add icons
				nav.querySelectorAll('li > a').forEach(a => {
					navIcon = document.createElement('span');
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

			// Add point indicators
			sidebar.querySelectorAll('li').forEach(li => {
				a = li.querySelector('a');
				if (a) {
					const href = a.getAttribute('href');
					if (href == 'stu_plus.add_snils' ||
						href == 'ebl_stu.ebl_choice' ||
						li.classList.contains('warn_menu')) {
						const indicator = document.createElement('span');
						indicator.className = 'badge-point';
						a.appendChild(indicator);
					}
				}
			});
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

			case 'cert_pkg.stu_certif':
				el = span9.querySelector('span[style="color:#00b050;font-size:1.2em;font-weight:bold;"]');
				if (el) {
					el.className = 'certificates-info';
				}

				const orders = span9.querySelectorAll('.ord-name');
				orders.forEach(ord => {
					img = ord.querySelector('img');
					if (img) {
						btn = document.createElement('a');
						btn.className = 'icon-button2';
						btn.text = 'description';
						btn.setAttribute('onclick', img.getAttribute('onclick'));
						btn.title = img.title;
						img.remove();
						ord.prepend(btn);
						ord.classList.add('flex-row');
					}
				});

				const fonts = span9.querySelectorAll('font[color="blue"]');
				fonts.forEach(font => {
					img = span9.querySelector('img[src="/etis/pic/text-2.png"]');
					if (img) {
						btn = document.createElement('a');
						btn.className = 'icon-button2';
						btn.text = 'description';
						btn.setAttribute('onclick', img.getAttribute('onclick'));
						btn.title = img.title;
						img.remove();
						font.append(btn);
						font.classList.add('flex-row');
					}
				});

				break;

			case 'stu.signs':
				if (window.location.search.split('&')[0] !== '?p_mode=current') break;

				let tooltipElem

				// create tooltip for a control point
				const renderTooltip = () => {
					const target = event.target

					const tooltipText = target.dataset.tooltip
					if (!tooltipText) return

					tooltipElem = document.createElement('div')
					tooltipElem.className = 'sign-tooltip'
					tooltipElem.innerText = tooltipText
					document.body.appendChild(tooltipElem)

					// position the element
					const coords = target.getBoundingClientRect()

					let right = coords.right + 5;

					let top = coords.top - tooltipElem.offsetHeight;
					// the element mustn't extend beyond the viewport
					if (top < 0) {
						top = coords.top + target.offsetHeight + 5;
					}

					tooltipElem.style.left = right + 'px';
					tooltipElem.style.top = top + 'px';
				}

				const removeTooltip = () => {
					if (tooltipElem) {
						tooltipElem.remove();
						tooltipElem = null;
					}
				}

				document.addEventListener('wheel', removeTooltip)

				const signTables = document.querySelectorAll('table.common')
				signTables.forEach(table => {
					const themes = table.querySelectorAll('a')
					themes.forEach((theme, index) => {
						if (theme.getAttribute('href').split('?')[0] !== 'stu.theme') {
							console.log('Не тема:')
							console.log(theme)
							return
						}
						theme.setAttribute('data-tooltip', theme.innerText)
						theme.innerHTML = 'КТ' + '&nbsp;' + (index + 1)
						theme.addEventListener('mouseover', renderTooltip)
						theme.addEventListener('mouseout', removeTooltip)
					})
				})
				break;
		}
	}
}