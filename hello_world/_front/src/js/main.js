window.onload = async () => {
	fetch("http://localhost:4444/is_ok")
		.then(response => response.json())
		.then(data => console.log(data.message))
		.catch(() => console.warn("DB is not ok"))
	;
}

const btn_get = document.querySelector("#get")
btn_get.addEventListener("click", (e) => {
	fetch("http://localhost:4444/hello")
		.then(response => response.json())
		.then(data => console.log(data.message))
		.catch(() => console.warn("DB is not ok"))
	;
})

const btn_post = document.querySelector("#post")
btn_post.addEventListener("click", (e) => {
	fetch("http://localhost:4444/hello", {
		method: "post"
	})
		.then(response => response.json())
		.then(data => console.log(data.message))
		.catch(() => console.warn("DB is not ok"))
	;
})

const btn_delete = document.querySelector("#delete")
btn_delete.addEventListener("click", (e) => {
	fetch("http://localhost:4444/hello", {
		method: "delete"
	})
		.then(response => response.json())
		.then(data => console.log(data.message))
		.catch(() => console.warn("DB is not ok"))
	;
})