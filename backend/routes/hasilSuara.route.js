const router = require('express').Router()
const hasilSuaraController = require('../controllers/hasilSuara.controller')
const middleware = require("../utils/middleware");

//public data route
router.post('/:id/upload-bukti',
	hasilSuaraController.upload.single('bukti_foto'),
	hasilSuaraController.uploadBuktiFoto
);

router.get('/', hasilSuaraController.getAllHasilSuara);

//not public
router.use(middleware.tokenExtractor)
router.post('/', hasilSuaraController.createNewHasilSuara);
router.get('/:id', hasilSuaraController.getHasilSuaraById)
router.put('/:id', hasilSuaraController.updateHasilSuara);
router.delete('/:id', hasilSuaraController.deleteHasilSuara)

module.exports = router