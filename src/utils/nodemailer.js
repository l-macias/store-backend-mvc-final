import { createTransport } from "nodemailer";

import config from "../configs/config.js";

const transporter = createTransport(config.nodemailer);

export default transporter;
