import express from 'express';
import { signin, emailverify, changepass } from "../controllers/auth.js";

const router = express.Router();

router.post('/signin', signin);
router.post('/emailverify', emailverify);
router.post('/changepass', changepass);

export default router;