const router = require('express').Router()
const paslonController = require('../controllers/paslon.controller')

router.post('/', paslonController.createNewPaslon);
router.get('/', paslonController.getAllPaslon);
router.get('/:id', paslonController.getPaslonById)
router.put('/:id', paslonController.updatePaslon);
router.delete('/:id', paslonController.deletePaslon)

module.exports = router