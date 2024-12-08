const name = document.querySelector("#name")
const type = document.querySelector("#type")
const properties = document.querySelector("#properties")
const price = document.querySelector("#price")
// console.log(properties);

const href = window.location.href
const query_id = href.split('/').pop();
const id = query_id.split('=').pop();
const fetchComponent = () => {
	fetch(`http://localhost:4444/components/${id}/`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			name.textContent = data.name;
			switch (data.type) {
				case "cpu":
					type.textContent = "Процессор ";
					break;
				case "motherboard":
					type.textContent = "Материнская плата ";
					break;
				case "gpu":
					type.textContent = "Видеокарта ";
					break;
				case "ram":
					type.textContent = "Оперативная память ";
					break;
				case "rom":
					type.textContent = "Накопитель ";
					break;
				case "power_unit":
					type.textContent = "Блок питания ";
					break;
				case "case":
					type.textContent = "Корпус ";
					break;
				case "cooler":
					type.textContent = "Система охлаждения ";
					break;
			}
			let props = [];
			data.main_properties.forEach((item) => {
				props.push(item);
			})
			console.log(props)
			data.other_properties.forEach((item) => {
				props.push(item);
			})
			props.forEach((item) => {
				properties.insertAdjacentHTML("beforeend", `
					<div class="property">
						<div class="property__text">
							<div class="property__name">${item.name}</div>
							<div class="property__value">${item.value}</div>
						</div>
					</div>				
				`)
			})
			price.textContent = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
		})
}

fetchComponent()
 