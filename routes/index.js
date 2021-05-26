var express = require('express');
var router = express.Router();
const adminController=require("../controller/adminController")
const {upload}=require("../middleware/multer")

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post("/create-event" ,upload,adminController.creteEvent)
router.get("/event",adminController.viewEvent)
router.delete("/delete-event/:id",adminController.deleteEvent)

module.exports = router;
