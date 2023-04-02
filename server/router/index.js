const {userController} = require("../controllers/userController")
const {storeItem} = require("../controllers/itemController")

// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer ({ storage });
// const imageUploadMiddleware = require('../middlwares/imageUpload')

const upload = require("../middlwares/storage");

const errorHandler = require("../middlwares/errorHandler");
const authorizationAdmin = require("../middlwares/authorizationAdmin")
const authentication = require("../middlwares/authentication")
const router = require("express").Router();


router.post("/login", userController.login)
router.post("/register", userController.register)

router.use(authentication);

router.get("/item" , storeItem.getItems)
router.get("/item/:id" , storeItem.getItem)
router.put("/item/:id", storeItem.putItem)
router.delete("/item/:id",storeItem.deleteItem)
// router.post("/item", upload.single('photo'), imageUploadMiddleware, storeItem.createItem);
router.post("/item", upload.single('photo'), storeItem.createItem);


router.use(errorHandler);

module.exports = router;