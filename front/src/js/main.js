window.onload = async () => {
	fetch("http://localhost:4444/is_ok")
		.then(response => response.json())
		.then(data => console.log(data.message))
		.catch(() => console.warn("DB is not ok"))
	;
}