const main_properties_tilte = document.querySelector("#main_properties_title");
const name = document.querySelector('#name input');
const price = document.querySelector('#price input');
const count = document.querySelector('#count .stepper__value');
const type = document.querySelector('#type');
const main_properties = document.querySelector('#main_properties');
const other_properties = document.querySelector('#properties_list');
const btn_submit = document.querySelector('#submit');
const socket = document.querySelector('#socket');
const ram_count=  document.querySelector('#ram_count');
const ram_type = document.querySelector('#ram_type');

const choiceLists = document.querySelectorAll(".choice");

const href = window.location.href
const query_id = href.split('/').pop();
let id;
if (query_id !== "add-edit"){
	id = query_id.split('=').pop();
}else {
	id = undefined;
}
const isReducting = !!id;


const switchTypeOf = (type_switch) => {
	if (type_switch === "cpu") {
		main_properties_tilte.classList.remove('hide');
		socket.classList.remove('hide');
		ram_count.classList.add('hide');
		ram_type.classList.add('hide');
	}else if (type_switch === "motherboard"){
		main_properties_tilte.classList.remove('hide');
		socket.classList.remove('hide');
		ram_count.classList.remove('hide');
		ram_type.classList.remove('hide');
	}else if (type_switch === "ram"){
		main_properties_tilte.classList.remove('hide');
		socket.classList.add('hide');
		ram_count.classList.add('hide');
		ram_type.classList.remove('hide');
	}else {
		main_properties_tilte.classList.add('hide');
		socket.classList.add('hide');
		ram_count.classList.add('hide');
		ram_type.classList.add('hide');
	}
}

choiceLists.forEach((choiceList) => {
	const isType = choiceList.id === "type";
	const choiceItems = choiceList.querySelectorAll(".choice__elem");
	choiceItems.forEach((choice) => {
		if (choice.classList.contains("active")) {
			choiceList.dataset.value = choice.dataset.value;
		}
		choice.addEventListener("click", (e) => {
			choiceItems.forEach((choice) => {
				if (choice === e.target) {
					choiceList.dataset.value = choice.dataset.value;
					choice.classList.add("active");
				}else {
					choice.classList.remove("active");
				}
			});
			if (isType){
				switchTypeOf(choiceList.dataset.value)
			}
		});
	});
	if (isType){
		switchTypeOf(choiceList.dataset.value)
	}
})

const choiceChange = (list, value) => {
	const isType = list.id === "type";
	const items = list.querySelectorAll(".choice__elem");
	items.forEach((item) => {
		if (item.dataset.value === value) {
			item.classList.add("active");
			list.dataset.value = value;
		}else {
			item.classList.remove("active");
		}
	})
	if (isType){
		switchTypeOf(value)
	}
}


const steppers = document.querySelectorAll('.stepper');
const checkMinDisabled = (element) => {
	return Number(element.textContent) <= 1;
}
const checkMaxDisabled = (element, maxValue) => {
	return Number(element.textContent) >= Number(maxValue);
}
const writeDataValue = (element, value) => {
	element.dataset.value = value;
}

steppers.forEach(stepper => {
	const minus_btn = stepper.querySelector('.stepper__minus');
	const plus_btn = stepper.querySelector('.stepper__plus');
	const value = stepper.querySelector('.stepper__value');
	if (value.textContent) writeDataValue(stepper, value.textContent);

	const max = stepper.dataset.max;

	if (checkMinDisabled(value)){
		minus_btn.disabled = true;
		value.textContent = "1";
	}
	if (checkMaxDisabled(value, max)){
		plus_btn.disabled = true;
		value.textContent = max;
	}

	minus_btn.addEventListener('click', (e) => {
		let count = Number(value.textContent);
		if (count > 1) {
			count--;
			value.textContent = count;
			plus_btn.disabled = false;
			writeDataValue(stepper, value.textContent);
			if (checkMinDisabled(value)){
				minus_btn.disabled = true;
				value.textContent = "1";
			}
		}
	})

	plus_btn.addEventListener('click', (e) => {
		let count = Number(value.textContent);
		if (count < max) {
			count++;
			value.textContent = count;
			minus_btn.disabled = false;
			writeDataValue(stepper, value.textContent);
			if (checkMaxDisabled(value, max)){
				plus_btn.disabled = true;
				value.textContent = max;
			}
		}
	})
})

const stepperChange = (item, value) => {
	const minus_btn = item.querySelector('.stepper__minus');
	const plus_btn = item.querySelector('.stepper__plus');
	const stepper_value = item.querySelector('.stepper__value');

	const max = item.dataset.max;
	stepper_value.textContent = value;

	if (checkMinDisabled(stepper_value)){
		minus_btn.disabled = true;
		stepper_value.textContent = "1";
	}else {
		minus_btn.disabled = false;
	}
	if (checkMaxDisabled(stepper_value, max)){
		plus_btn.disabled = true;
		stepper_value.textContent = max;
	}else {
		plus_btn.disabled = false;
	}
}

// Начало файла, считай (все выше - скопировано из других для удобства разработки)

const input_property_name = document.querySelector("#property_name>input");
const input_property_value = document.querySelector("#property_value>input");

const properties_list = document.querySelector("#properties_list")

const handleDelete = (e) => {
	e.currentTarget.parentElement.remove();
}

const addProperty = (element, name, value) => {
	if (name !== "" && value !== "") {
		element.insertAdjacentHTML('beforeend', `
			<div class="property property-with-delete">
				<div class="property__text">
					<div class="property__name">${name}</div>
					<div class="property__value">${value}</div>
				</div>
				<button class="property__btn">
					<img src="../img/trash.svg" alt="">
				</button>
			</div>
		`)
		element.querySelectorAll(".property .property__btn").forEach(button => {
			button.removeEventListener("click", handleDelete);
			button.addEventListener("click", handleDelete);
		})
	}
}

const property_btn = document.querySelector("#property_btn");
property_btn.addEventListener('click', (e) => {
	const input_name = input_property_name.value;
	const input_value = input_property_value.value;
	if (input_name !== "" && input_value !== "") {
		addProperty(properties_list, input_name, input_value)
		input_property_name.value = "";
		input_property_value.value = "";
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
				if (isReducting) {
					fetch(`http://localhost:4444/components/${id}/`)
						.then(res => res.json())
						.then(data => {
							if (!data.message) {
								btn_submit.textContent = "Редактировать"
								name.value = data.name;
								price.value = data.price;
								choiceChange(type, data.type);
								stepperChange(count.parentElement, data.count);
								if (type.dataset.value === "cpu"){
									const cpu = data.main_properties.find(obj => obj.name === "Сокет (разъем на плате)")
									choiceChange(socket.querySelector(".choice"), cpu.value);
								}else if (type.dataset.value === "motherboard"){
									const cpu = data.main_properties.find(obj => obj.name === "Сокет (разъем на плате)")
									const count_ram = data.main_properties.find(obj => obj.name === "Количество слотов ОЗУ")
									const type_ram = data.main_properties.find(obj => obj.name === "Тип памяти")
									choiceChange(socket, cpu.value);
									choiceChange(ram_count, count_ram.value);
									choiceChange(ram_type, type_ram.value);
								}else if (type.dataset.value === "ram") {
									const type_ram = data.main_properties.find(obj => obj.name === "Тип памяти")
									choiceChange(ram_type, type_ram.value);
								}
								data.other_properties.forEach((item) => {
									addProperty(properties_list, item.name, item.value);
								})
								//
							}else {
								console.log("Значение не получено");
							}
						})
				}
			}else {
				window.location.href = 'login'
			}
		})
})




btn_submit.addEventListener('click', (e) => {

	let otherPropertiesArray = []
	other_properties.querySelectorAll(".property").forEach(property => {
		otherPropertiesArray.push({
			name: property.querySelector(".property__name").textContent,
			value: property.querySelector(".property__value").textContent,
		})
	})
	let mainPropertiesArray = []
	main_properties.querySelectorAll(".add-right__choice").forEach(property => {
		if (property.classList.contains('hide')){
			return;
		}
		mainPropertiesArray.push({
			name: property.querySelector(".add-right__choice-title").textContent,
			value: property.querySelector(".choice").dataset.value
		})
	})
	const object = {
		name: name.value,
		type: type.dataset.value,
		price: price.value,
		count: Number(count.textContent),
		main_properties: mainPropertiesArray,
		other_properties: otherPropertiesArray
	}
	if (name.value !== "" && type.dataset.value !== "" && String(price.value)!== "" && count.textContent!== ""){
		if (isReducting){
			fetch(`http://localhost:4444/components/${id}`, {
				method: 'PATCH',
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(object)
			})
				.then(res => res.json())
				.then(data => {
					if (!data.message){
						window.location.href = '/'
					}
				})
		}else {

			fetch('http://localhost:4444/components', {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(object)
			})
				.then(res => res.json())
				.then(data => {
					if (!data.message){
						window.location.href = '/'
					}
				})
		}

	}
})