import { Router } from "express";
import { paymentCntroller } from "./payment.controller";

const router = Router();
router.post("/confirmation", paymentCntroller.confirm);

export const paymentRoute = router;