module.exports = callback => (req, res, next) =>
        Promise.resolve(callback(req, res, next)
        .catch(err => {
            console.error(err);
            next(err);
        }));
