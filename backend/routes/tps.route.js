const router = require('express').Router()
const tpsController = require('../controllers/tps.controller')

router.post('/', tpsController.createNewTps);
router.get('/', tpsController.getAllTps);
router.get('/:id', tpsController.getTpsById)
router.put('/:id', tpsController.updateTps);
router.delete('/:id', tpsController.deleteTps)

module.exports = router