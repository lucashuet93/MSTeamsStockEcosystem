let dbQueries = require('./dbQueries')

const initRestApi = (router) => {
    router.get('/', function (req, res) {
        res.json({ data: 'API is working' });
    });
	
    router.route('/loginUser')
        .post((req, res) => {
            dbQueries.loginUser(req.body.username, req.body.password, (response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/createUser')
        .post((req, res) => {
            dbQueries.createUser(req.body, (response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/updateUserCapital')
        .post((req, res) => {
            dbQueries.updateUserCapital(req.body, (response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/createCompany')
        .post((req, res) => {
            dbQueries.createCompany(req.body, (response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/buyNewShares')
        .post((req, res) => {
            dbQueries.buyNewShares((response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/sellAllShares')
        .post((req, res) => {
            dbQueries.sellAllShares((response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/updateShares')
        .post((req, res) => {
            dbQueries.updateShares((response) => {
                res.json({
                    data: response
                });
            })
        });
}

module.exports = initRestApi;