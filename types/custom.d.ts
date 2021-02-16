declare namespace Express {
	interface Request {
		user?: import('../src/common/models/user/IUser').IUser;
	}
}
