const router = require("express").Router();
const controller = require("../controllers/index")

router.post("/sendMail",controller.mailController.sendMails);
router.get("/checkSendedId/:id",controller.mailController.checkSendedId);
router.get("/fetchSendedMailRecords/:type",controller.mailController.fetchSendedMailRecords);

module.exports = router;