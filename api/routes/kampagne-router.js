const express = require('express');

const KampagneCtrl = require('../controllers/kampagne-ctrl');

const router = express.Router();

router.post('/create', KampagneCtrl.createKampagne);
router.get('/kampagnen', KampagneCtrl.getKampagne);
router.post('/reset', KampagneCtrl.reset);

module.exports = router;
