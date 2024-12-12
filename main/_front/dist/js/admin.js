const btn_download = document.querySelector('#download');
const btn_submit = document.querySelector('#submit');
const input_file = document.querySelector('#db_file');

let fileAdd = false;

let isAdmin = false;

const addAdminPanel = () => {
	if (isAdmin) {
		header_nav.insertAdjacentHTML('afterbegin',`
                <a href="/admin" class="header__link active">Панель администратора</a>
		`)
	}
}

btn_download.addEventListener('click', (e) => {
	fetch('http://localhost:4444/components/json', {
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
			'Content-Type': 'application/json',
		}
	})
		.then(res => {
			if (!res.ok) {
				throw new Error("Ошибка при скачивании JSON");
			}
			return res.blob();
		})
		.then(blob => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = "data.json";
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
		})
		.catch(e => {
			console.error(e.message);
		})
})

input_file.addEventListener('change', (e) => {
	fileAdd = true;
})

btn_submit.addEventListener('click', async (e) => {
	if (fileAdd){
		const file = input_file.files[0];
		const reader = new FileReader();
		reader.onload = async e => {
			const jsonContent = e.target.result;
			// console.log(jsonContent);
			try {
				const response = await fetch('http://localhost:4444/components/json',{
					method: 'POST',
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
						'Content-Type': 'application/json',
					},
					body: jsonContent
				})
				console.log(response)
				alert("Данные успешно загрузились")
				input_file.value = ""
			}catch (e) {
				console.log(`Какая-то ошибка: ${e}`)
			}
		}
		reader.readAsText(file);
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
				isAdmin = true;
				addAdminPanel()
			}else {
				window.location.replace("/login");
			}
		})
})
