// register 
app.use('/healthcheck', require('./routes/healthcheck.routes'));


// healthcheck
import express from 'express';

const router = express.Router({});
router.get('/', async (_req, res, _next) => {
	// optional: add further things to check (e.g. connecting to dababase)
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
});
// export router with all routes included
module.exports = router;


// healthcheck.spec.js (services like Pingdom or Freshping do a similar approach to check whether your server is healthy)
describe('Healthcheck', () => {

	it('returns 200 if server is healthy', async () => {
		const res = await get(`/healthcheck`, null)
			.expect(200);
		expect(res.body.uptime).toBeGreaterThan(0);
	});

});
