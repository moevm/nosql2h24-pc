import HelloModel from "../models/Hello.js"

export const postHello = async (req, res) => {
	try {
		const msgs = await HelloModel.find().limit(5).exec();
		if (msgs && msgs.length > 0){

			res.json({
				message: "Записи в таблице уже есть"
			})
		}else {
			const doc = new HelloModel({
				msg: `Тестовое сообщение, DateTime: ${new Date().toString()}`
			})
			const hello = await doc.save();
			res.json({
				message: "Элемент создан"
			})
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось создать элемент',
		})
	}
}

export const getHello = async (req, res) => {
	try {
		const msgs = await HelloModel.find().limit(5).exec();
		if (!msgs || msgs.length === 0){
			res.json({
				message: "Тестовое сообщение еще не создано"
			});
		}else {
			res.json({
				message: msgs.map(obj => obj.msg)[0]
			});
		}

	} catch (err) {
		console.log(err)
		res.status(500).json({
			msg: 'Не удалось получить элемент'
		})
	}
}

export const removePost = async (req, res) => {
	try {
		const msgs = await HelloModel.find().limit(5).exec();
		if (msgs && msgs.length > 0){
			HelloModel.deleteMany({})
				.then(() => {
						res.json({
							message: "Все элементы удалены"
						})
				})
		}else {
			res.json({
				message: "Нечего удалять"
			})
		}
	}catch (err) {
		console.log(err)
		res.status(500).json({
			msg: 'Не удалось удалить элемент'
		})
	}
}