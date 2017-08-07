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
	
    router.route('/loginUserFromTab')
        .post((req, res) => {
            dbQueries.loginUserFromTab(req.body.username, (response) => {
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
    router.route('/buyNewShares')
        .post((req, res) => {
            dbQueries.buyNewShares(req.body, (response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/sellAllShares')
        .post((req, res) => {
            dbQueries.sellAllShares(req.body, (response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/updateShares')
        .post((req, res) => {
            dbQueries.updateShares(req.body, (response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/getPortfolio')
        .post((req, res) => {
            dbQueries.getPortfolio(req.body, (response) => {
                res.json({
                    data: response
                });
            })
        });
}

module.exports = initRestApi;