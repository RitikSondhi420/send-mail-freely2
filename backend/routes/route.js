const router = require('express').Router();

router.use('/mail',require("../routes/mailRoutes"))

module.exports = router;