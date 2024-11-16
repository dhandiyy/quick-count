const router = require('express').Router()
const hasilSuaraController = require('../controllers/hasilSuara.controller')

router.post('/', hasilSuaraController.createNewHasilSuara);
router.get('/', hasilSuaraController.getAllHasilSuara);
router.get('/:id', hasilSuaraController.getHasilSuaraById)
router.put('/:id', hasilSuaraController.updateHasilSuara);
router.delete('/:id', hasilSuaraController.deleteHasilSuara)

module.exports = router