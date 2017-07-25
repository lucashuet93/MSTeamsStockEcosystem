let dbQueries = require('./dbQueries')

const initRestApi = (router) => {
    router.get('/', function (req, res) {
        res.json({ data: 'API is working' });
    });
    // GET-WEEKS ROUTES ------------------------------------------------------------
    // =============================================================================
    router.route('/allUsers')
        .get((req, res) => {
            dbQueries.getUsers((response) => {
                res.json({
                    data: response
                });
            })
        });
}

module.exports = initRestApi;