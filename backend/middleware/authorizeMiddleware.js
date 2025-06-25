const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, user not authenticated' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Forbidden: User with role ${req.user.role} is not allowed to access this resource` });
        }
        next();
    };
};

export { authorizeRoles };
