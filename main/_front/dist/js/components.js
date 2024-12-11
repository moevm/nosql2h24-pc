const choiceLists = document.querySelectorAll(".choice");

const choice_components = document.querySelector("#choice_components");

const dialog_delete = document.querySelector("#delete");

const btn_yes = document.querySelector("#dialog_yes");
const btn_no = document.querySelector("#dialog_no");

let global_id_for_dialog;

const header_nav = document.querySelector("#header_nav");

let isAdmin = false;

const addAdminPanel = () => {
	if (isAdmin) {
		header_nav.insertAdjacentHTML('afterbegin',`
                <a href="/admin" class="header__link">Панель администратора</a>
		`)
	}
}

const yes_event_handler = (e) => {
	fetch(`http://localhost:4444/components/${global_id_for_dialog}`,{
		method: "DELETE",
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
			'Content-Type': 'application/json'
		}
	})
		.then(res => res.json())
		.then(data => {
			if (!data.message) {
				window.location.reload();
			}else {
				closeDialog();
			}
		})
}

const no_event_handler = (e) => {
	closeDialog();
}
const closeDialog = () => {
	dialog_delete.classList.remove('show');
	document.body.classList.remove('no-scroll')
	btn_yes.removeEventListener("click", yes_event_handler)
	btn_no.removeEventListener("click", no_event_handler)
}

const openDialog = (name, id) => {
	global_id_for_dialog = id
	dialog_delete.classList.add('show');
	document.body.classList.add('no-scroll')
	const dialog_name = dialog_delete.querySelector(".dialog__name");
	console.log(dialog_name)
	dialog_name.textContent = name;
	btn_yes.addEventListener("click", yes_event_handler)
	btn_no.addEventListener("click", no_event_handler)
}


const addCards = (type) => {
	fetch(`http://localhost:4444/components${type ? "?type=" + type : ""}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			cards_place.replaceChildren();
			data.forEach((item) => {
				cards_place.insertAdjacentHTML("beforeend", `
				<div class="card" data-id="${item._id}">
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
			const card__buttons = document.querySelectorAll(".card__button");
			card__buttons.forEach((card_button) => {
				card_button.addEventListener("click",(e) => {
					const id = card_button.parentElement.parentElement.dataset.id
					const name = card_button.parentElement.parentElement.querySelector(".card__name").textContent
					if (!isAdmin) {
						window.location.href = (`http://localhost:4444/?id=${id}`)
					}else {
						if (card_button.classList.contains("btn-red")){
							openDialog(name, id)
						}else{
							window.location.href = (`http://localhost:4444/add-edit?id=${id}`)
						}
					}
				})
			})
		})
}

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
					console.log("here");
					if (choiceList.id === "choice_components") {
						addCards(choice.dataset.value)
					}
				}else {
					choice.classList.remove("active");
				}
			});
		});
	});
})


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
				addAdminPanel();
				btn_add.parentElement.classList.remove('hide');
			}
			addCards("cpu");
		})
})

