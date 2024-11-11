import jwt from "jsonwebtoken"

export default (req, res, next) => {
	const token = (req.headers.authorization || '')
		.replace(/Bearer\s?/, '');
	const msg = 'Нет доступа';
	if (token){
		try {
			const decoded = jwt.verify(token, 'secret2314');
			req.adminId = decoded.id;
			next();
		} catch (err) {
			return res.status(403).json({
				message: msg
			});
		}
	}else {
		return res.status(403).json({
			message: msg
		});
	}
}