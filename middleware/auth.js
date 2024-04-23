module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next(user, token)
      } else {
        res.error('Code 401: Request not authenticated')
      }
    },
  }
  