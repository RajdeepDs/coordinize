import { Resend } from "resend";
import { keys } from "../keys.js";

export const resend = new Resend(keys().RESEND_TOKEN);
