const router = require('express').Router()
const adminController = require('../controllers/admin.controller')

router.post('/', adminController.createNewAdmin);
router.get('/', adminController.getAllAdmin);
router.get('/:id', adminController.getAdminById)
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin)

module.exports = router