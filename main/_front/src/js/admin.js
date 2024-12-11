const btn_download = document.querySelector('#download');
const btn_submit = document.querySelector('#submit');
const input_file = document.querySelector('#db_file');

let fileAdd = false;

btn_download.addEventListener('click', (e) => {
	fetch('http://localhost:4444/components/json')
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
			console.log(jsonContent);
			try {
				const response = await fetch('http://localhost:4444/components/json',{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: jsonContent
				})
				console.log(response)
			}catch (e) {
				console.log(`Какая-то ошибка: ${e}`)
			}
		}
		reader.readAsText(file);
	}
})