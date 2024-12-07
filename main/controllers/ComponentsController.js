import ComponentsModel from "../models/Components.js";
 
export const addComponent = async (req, res) => {
	try {
		const components = await ComponentsModel.find({name: req.body.name});
		// console.log(components);
		if (components[0]) {
			res.json({
				message: "Такой компонент уже есть"
			})
			return;
		}
		const doc = new ComponentsModel({
			name: req.body.name,
			type: req.body.type,
			price: req.body.price,
			count: req.body.count,
			main_properties: req.body.main_properties,
			other_properties: req.body.other_properties
		})
		const post = await doc.save();
		res.json(post);
	} catch (err) {
		console.warn(err);
		res.status(500).json({
			message: "Не удалось создать компонент"
		})
	}
}
 
export const getAll = async (req, res) => {
	try {
		console.log(req.query);
		let components;
		if (req.query.type){
			components = await ComponentsModel.find({type: req.query.type}).exec();
		}else {
			components = await ComponentsModel.find().exec();
		}
		res.json(components);
	}catch (err){
		console.warn(err);
		res.status(500).json({
			message: "Не удалось получить комплектующие"
		})
	}
}
 
export const getOne = async (req, res) => {
	try {
		const componentId = String(req.params.id);
 
		ComponentsModel.findOne({
			_id: componentId
		}).then(
			(doc, err) => {
				if (err) {
					console.warn(err);
					return res.status(500).json({
						message: "Не удалось получить комплектующие"
					})
				}
				if (!doc){
					return res.status(404).json({
						message: "Компонент не найден"
					})
				}
				res.json(doc);
			}
		).catch(err => {
			console.warn(err);
			res.status(500).json({
				message: "Не удалось получить комплектующие"
			})
		})
	}catch (err){
		console.warn(err);
		res.status(500).json({
			message: "Не удалось получить комплектующие"
		})
	}
}