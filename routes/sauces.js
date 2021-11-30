const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controller/sauces');

router.get('/api/sauces', auth, saucesCtrl.getAllSauces);
router.post('/api/sauces',auth, multer, saucesCtrl.createsauces);
router.get('/api/sauces/:id', auth, saucesCtrl.getOnesauces);
router.put('/api/sauces/:id', auth,multer, saucesCtrl.modifysauces);
router.delete('/api/sauces/:id', auth, saucesCtrl.deletesauces);
router.post('/api/sauces/:id/like', auth, saucesCtrl.likeSauces);

module.exports = router;