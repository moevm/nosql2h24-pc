const header_nav = document.querySelector("#header_nav");

let isAdmin = false;

const addAdminPanel = () => {
	if (isAdmin) {
		header_nav.insertAdjacentHTML('afterbegin',`
                <a href="/admin" class="header__link active">Панель администратора</a>
		`)
	}
}

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
				isAdmin = true;
				addAdminPanel()
				// btn_add.parentElement.classList.remove('hide');
			}
			// addCards("cpu");
		})
})
