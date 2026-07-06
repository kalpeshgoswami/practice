import httpError from "./httpError.js";

const checkAuth = (req, res, next) => {
    try {
        if (!req.user) {
            return res.render("login");
        }

        next();
    } catch (error) {
        next(new httpError(error.message));
    }
};

export default checkAuth;