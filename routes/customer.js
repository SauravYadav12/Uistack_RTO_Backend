const express = require("express");
const passport = require("passport");
const customer = require('../controller/customer');
const router = express.Router();

router.get('/view/:id',customer.view);
router.get('/get-all',customer.getAll);

router.post('/create',customer.create);
router.patch('/update/:id',customer.update);
router.patch('/delete/:id',customer.delete);


module.exports = router;