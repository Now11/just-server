export const mochaHooks = {
	beforeAll() {
		return new Promise(resolve => setTimeout(resolve, 5000));
	}
};
