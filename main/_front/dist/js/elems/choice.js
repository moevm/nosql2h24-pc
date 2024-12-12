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
					// console.log(choice.dataset.value);
				}else {
					choice.classList.remove("active");
				}
			});
		});
	});
})

const choiceChange = (list, value) => {
	const items = list.querySelectorAll(".choice__elem");
	items.forEach((item) => {
		if (item.dataset.value === value) {
			item.classList.add("active");
			list.dataset.value = value;
		}else {
			item.classList.remove("active");
		}
		console.log(item.dataset.value === value);
	})
}


const change_parameter = document.querySelector("#change_parameter");
console.log(change_parameter);
change_parameter.addEventListener("click", (e) => {
	choiceChange(document.querySelector("#type"), "gpu");
})
 