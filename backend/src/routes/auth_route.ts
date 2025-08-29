import express from "express";
import { signup } from "../Controller/signup.auth.controller";
import { request_for_otp } from "../Controller/request_send.auth.controller";
import { verify_otp } from "../Controller/otpVerification.auth.controller";
export const router = express.Router();   


router.post('/signup', signup);
router.post('/request_otp', request_for_otp);
router.post('/verify_otp', verify_otp);
