import express from 'express'
import categoryQuestion from '../controllers/categoryQue.controller.js';
import clozeQuestion from '../controllers/clozeQue.controller.js';
import compQuestion from '../controllers/compQue.controller.js';

const router = express.Router();

router.post("/category", categoryQuestion);
router.post("/cloze", clozeQuestion);
router.post("/compre", compQuestion);

export default router;