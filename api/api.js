let dbQueries = require('./dbQueries')

const initRestApi = (router) => {
    router.get('/', function (req, res) {
        res.json({ data: 'API is working' });
    });
	
    router.route('/loginUser')
        .get((req, res) => {
            dbQueries.loginUser((response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/createUser')
        .post((req, res) => {
            dbQueries.createUser((response) => {
                res.json({
                    data: response
                });
            })
        });
    router.route('/updateUserCapital')
        .post((req, res) => {
            dbQueries.updateUserCapital((response) => {
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