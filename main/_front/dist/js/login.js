const login = document.querySelector('#login input');
const password = document.querySelector('#password input');

const title = document.querySelector('#title');
const btn_submit = document.querySelector('#submit');
const btn_logout = document.querySelector('#logout');
const form_not_true = document.querySelector('#form-not-true');

let isAdmin = false;

const addAdminPanel = () => {
	if (isAdmin) {
		header_nav.insertAdjacentHTML('afterbegin',`
                <a href="/admin" class="header__link">Панель администратора</a>
		`)
	}
}

btn_submit.addEventListener('click', (e) => {
	if (login.value !== "" && password.value !== "") {
		fetch('http://localhost:4444/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"login": String(login.value),
				"password": String(password.value)
			})
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.token){
					localStorage.setItem('authToken', data.token);
					window.location.href = '/'
				}else {
					form_not_true.classList.remove('hide');
				}
			})
	}
})

document.addEventListener("DOMContentLoaded", function() {
	fetch('http://localhost:4444/auth/authorized', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
			'Content-Type': 'application/json'
		}
	})
		.then(res => res.json())
		.then(data => {
			if (data.message === true) {
				title.textContent = "Вы уже вошли в панель администратора"
				isAdmin = true;
				addAdminPanel();
				login.parentElement.classList.add('hide');
				password.parentElement.classList.add('hide');
				btn_submit.classList.add('hide');
				btn_logout.classList.remove('hide');
				btn_logout.addEventListener('click', (e) => {
					localStorage.removeItem('authToken');
					window.location.reload()
				})
			}
			document.querySelector('.form').classList.remove('hide');
	})
})