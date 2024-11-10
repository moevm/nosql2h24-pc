const socket = document.querySelector("#socket");
const ram_count = document.querySelector("#ram_count");

const getCheckboxValues = (element) => {
	const checkboxes = element.querySelectorAll(".checkbox");
	const values = [];
	checkboxes.forEach(checkbox => {
		const input = checkbox.querySelector("input");
		// console.log(input);
		// console.log(input.checked);
		input.checked? values.push(checkbox.dataset.value) : undefined;
	})
	return values;
}

const getValues = (elemsArray) => {
	const object = {}
	elemsArray.forEach(elem => {
		object[elem.dataset.value] = getCheckboxValues(elem);
	})
	return object;
}

const button = document.querySelector("#checkbox_btn");

button.addEventListener("click", (e) => {
	console.log(getValues([socket,  ram_count]))
})