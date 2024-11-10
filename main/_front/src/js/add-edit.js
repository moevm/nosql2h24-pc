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

// Начало файла, считай (все выше - скопировано из других для удобства разработки)

const input_property_name = document.querySelector("#property_name>input");
const input_property_value = document.querySelector("#property_value>input");

const properties_list = document.querySelector("#properties_list")

const handleDelete = (e) => {
	e.currentTarget.parentElement.remove();
}

const property_btn = document.querySelector("#property_btn");
property_btn.addEventListener('click', (e) => {
	const name = input_property_name.value;
	const value = input_property_value.value;
	if (name !== "" && value !== "") {
		properties_list.insertAdjacentHTML('beforeend', `
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
		properties_list.querySelectorAll(".property .property__btn").forEach(button => {
			button.removeEventListener("click", handleDelete);
			button.addEventListener("click", handleDelete);
		})
		input_property_name.value = "";
		input_property_value.value = "";
	}
})

