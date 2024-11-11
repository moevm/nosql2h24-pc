const choiceLists = document.querySelectorAll(".choice");
 
choiceLists.forEach((choiceList) => {
	const choiceItems = choiceList.querySelectorAll(".choice__elem");
	choiceItems.forEach((choice) => {
		if (choice.classList.contains("active")) {
			choiceList.dataset.value = choice.dataset.value;
			// console.log(choice.dataset.value);
		}
		choice.addEventListener("click", (e) => {
			choiceItems.forEach((choice) => {
				if (choice === e.target) {
					choiceList.dataset.value = choice.dataset.value;
					choice.classList.add("active");
					console.log(choice.dataset.value);
				}else {
					choice.classList.remove("active");
				}
			});
		});
	});
})
 
const cards_place = document.querySelector("#cards_place");

let isAdmin = false;

const addCards = () => {
	fetch("http://localhost:4444/components")
		.then(res => res.json())
		.then(data => {
			data.forEach((item) => {
				cards_place.insertAdjacentHTML("beforeend", `
				<div class="card">
					<img src="https://via.placeholder.com/200x200" alt="">
					<div class="card__description">
						<div class="card__name">${item.name}</div>
						<div class="card__price">${item.price} ₽</div>
						<button class="card__button btn">${isAdmin ? "Редактировать" : "Купить"}</button>
						${isAdmin ? `<button class="card__button btn btn-red" style="margin-top: 15px;">Удалить</button>`: ''}
					</div>
				</div>
				`)
			})
		})
}
const btn_add = document.querySelector("#add");

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
				btn_add.parentElement.classList.remove('hide');
			}
			addCards();
		})
})

