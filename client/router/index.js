const {userController} = require("../controllers/userController")
const {storeItem} = require("../controllers/itemController")

const errorHandler = require("../middlwares/errorHandler");
const authorizationAdmin = require("../middlwares/authorizationAdmin")
const authentication = require("../middlwares/authentication")
const router = require("express").Router();
const upload = require("../middlwares/storage")


router.post("/login", userController.login)
router.post("/register", userController.register)


router.use(authentication);

router.get("/item" , storeItem.getItems)
router.get("/item/:id" , storeItem.getItems)
router.put("/item", storeItem.putItem)
router.delete("/item",storeItem.deleteItem)
router.post("/item", upload.single('photo'), storeItem.createItem)


router.use(errorHandler);

module.exports = router;