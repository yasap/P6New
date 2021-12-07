const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controller/sauces');

router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/',auth, multer, saucesCtrl.createsauces);
router.get('/:id', auth, saucesCtrl.getOnesauces);
router.put('/:id', auth,multer, saucesCtrl.modifysauces);
router.delete('/:id', auth, saucesCtrl.deletesauces);
router.post('/:id/like', auth, saucesCtrl.likeSauces);

module.exports = router;