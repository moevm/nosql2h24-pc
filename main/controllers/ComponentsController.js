import ComponentsModel from "../models/Components.js";
import path from "path";
const __dirname = import.meta.dirname;
import fs from "fs";
import {Parser} from "json2csv";

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

export const update = async (req, res) => {
	try {
		const componentId = String(req.params.id);
		const components = await ComponentsModel.find({name: req.body.name});
		const components2 = await ComponentsModel.find({_id: componentId});
		const object = {
			name: req.body.name,
			type: req.body.type,
			price: req.body.price,
			count: req.body.count,
			main_properties: req.body.main_properties,
			other_properties: req.body.other_properties
		}
		if (components.length <= 1) {
			console.log("here")
			if (components.length === 0 || components._id === components2._id){
				console.log("here2")
				await ComponentsModel.updateOne(
					{_id: componentId},
					{ $set: object },
				)
					.then(updatedComponent => {
						res.json({success: true});
					})
					.catch(e => {
						console.warn(e);
						res.status(500).json({
							message: "Не удалось обновить компонент"
						})
					})
			}
		}
	}catch (e) {
		console.warn(e);
		res.json({
			message: "Не удалось обновить компонент"
		})
	}
}
 
export const deleteElem = async (req, res) => {
	try {
		const componentId = String(req.params.id);
		await ComponentsModel.deleteOne({_id: componentId})
			.then(() => {
				res.json({success: true});
			})
			.catch((e) => {
				console.warn(e);
				res.json({
					message: "Не удалось удалить компонент"
				});
			});
	}catch (e) {
		console.warn(e);
		res.json({
			message: "Не удалось удалить компонент"
		});
	}
}

export const exportToClient = async (req, res) => {
	try {
		let items;
		await ComponentsModel.find().lean()
			.then(value => {
				console.log(value);
				items = value;
			});
		if (items.length === 0) {
			return res.status(404).json({
				message: "Нет данных для экспорта"
			})
		}

		// const parser = new Parser();
		// const csv = parser.parse(items, {delimiter: ";"});
		// console.log(csv);
		res.json({
			components: items
		})
	}catch (e) {
		console.warn(`Ошибка при экспорте данных: ${e}`);
		res.status(500).json({
			message: "Ошибка при экспорте данных"
		});
	}
}

export const importFromClient = async (req, res) => {
	try {
		console.log(req.body);
		if (req.body.components){
			const components = req.body.components;
			for (const component of components){
				const component_from_db = await ComponentsModel.find({name: req.body.name});
				if (!component_from_db[0]){
					const doc = new ComponentsModel({
						name: component.name,
						type: component.type,
						price: component.price,
						count: component.count,
						main_properties: component.main_properties,
						other_properties: component.other_properties
					})
					const post = await doc.save();
				}
			}
		}
		res.json({
			message: "Данные получены"
		})
	}catch (e) {
		console.warn(e);
		res.json({
			message: `Какая-то ошибка: ${e}`
		})
	}
}