import bcrypt from "bcrypt";
import logger from "./logger.js";
const hashPassword = async (password, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);

        return await bcrypt.hash(password, salt);
    } catch (error) {
        logger.error(`Hubo un problema en el método hashPassword: ${error}`);
    }

    return null;
};

const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        logger.error(`Hubo un problema en el método comparePassword: ${error}`);
        console.log(error);
    }

    return false;
};

export { hashPassword, comparePassword };
