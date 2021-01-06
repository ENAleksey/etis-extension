// Set Icon
var style = document.createElement('link');
style.rel = 'icon';
style.type = 'image/png';
style.href = chrome.extension.getURL('logo.png');
document.getElementsByTagName('head')[0].appendChild(style);


// Select Theme
var darkTheme = false;
function detectColorScheme(){
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") {
            darkTheme = true;
        }
    } else if (!window.matchMedia) {
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        darkTheme = true;
    }

    if (darkTheme) {
		document.documentElement.setAttribute("theme", "dark");
	} else {
		document.documentElement.setAttribute("theme", "light");
	}
}
detectColorScheme();


function switchTheme(e) {
	darkTheme = !darkTheme;
    if (darkTheme) {
    	localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('theme', 'dark');
    } else {
    	localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('theme', 'light');
    }    
}


// Style Pages
var login = document.querySelector('body > div.login');
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
			loginContainer.insertBefore(errorMessage, loginContainer.childNodes[0]);
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
	const nav = document.querySelector('div.span3 > ul:nth-child(4)');
	const el1 = document.createElement("li");
	const el2 = document.createElement("a");
	el2.appendChild(document.createTextNode("Настройки расширения"));
	el1.appendChild(el2);
	nav.insertBefore(el1, nav.childNodes[0]);
	el1.addEventListener('click', switchTheme, false);
	
	const span9 = document.querySelector('div.span9');
	const page = window.location.pathname.split('/').pop();
	
	switch (page) {
		case 'stu.teach_plan':
			el = document.querySelector('div.span9 > div:nth-child(2)');
			el.className = 'teach-plan';
			
			el = document.querySelector('div.span9 > div:nth-child(2) > div > a');
			el.className = 'icon-button icon-feedback';
			el.text = 'Оставить отзыв';
			
			break;
			
		case 'stu.tpr':
			el = document.querySelector('div.span9 > a');
			el.className = 'icon-button icon-feedback';
			el.text = 'Оставить отзыв';
			
			break;
			
		case 'stu.teachers':
			el = document.querySelector('div.span9 > a');
			el.className = 'icon-button icon-analytics';
			
			const descriptions = document.querySelectorAll('.teacher_desc');
			descriptions.forEach(desc => {
				const name = desc.querySelector('.teacher_name');
				btn = document.createElement('a');
				btn.className = 'icon-button2';
				btn.text = 'today';
				img = name.querySelector('img');
				btn.onclick = img.onclick;
				btn.title = img.title;
				img.remove();
				name.appendChild(btn);
				
				const chair = desc.querySelector('.chair');
				btn = document.createElement('a');
				btn.className = 'icon-button2';
				btn.text = 'today';
				img = chair.querySelector('img');
				btn.onclick = img.onclick;
				btn.title = img.title;
				img.remove();
				chair.appendChild(btn);
			});
			
			break;
			
		case 'stu.timetable':
			const buttonbar = document.createElement('div');
			buttonbar.className = 'timetable-buttonbar';
			span9.insertBefore(buttonbar, span9.childNodes[0]);
			
			el = document.querySelector('div.span9 > div:nth-child(6)');
			el.className = 'timetable-btn consultations';
			buttonbar.appendChild(el);
			
			el = document.querySelector('div.span9 > a.estimate_tt');
			el.className = 'timetable-btn icon-button icon-feedback';
			el.text = 'Оставить отзыв';
			buttonbar.appendChild(el);
			
			el = document.querySelector('div.span9 > a:nth-child(5)');
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
			form.insertBefore(items, form.childNodes[0]);
			form.insertBefore(document.querySelector('div.span9 > h3'), form.childNodes[0]);
			
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
			changeEmailForm.insertBefore(changeEmailItems, changeEmailForm.childNodes[0]);
			changeEmailForm.insertBefore(document.querySelector('div.span9 > div'), changeEmailForm.childNodes[0]);
			changeEmailForm.insertBefore(document.querySelector('div.span9 > h3'), changeEmailForm.childNodes[0]);

			const emailLabel = changeEmailForm.querySelector('label');
			const emailInput = changeEmailForm.querySelector("#email");
			emailInput.placeholder = ' ';
				
			const changeEmailItem = document.createElement('div');
			changeEmailItem.className = "item";
			changeEmailItem.appendChild(emailInput);
			changeEmailItem.appendChild(emailLabel);
			changeEmailItems.appendChild(changeEmailItem);
			
			break;
	}
}
