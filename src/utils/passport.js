import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { hashPassword, comparePassword } from "./bcrypt.js";

import logger from "./logger.js";

import UserApi from "../services/usersServices.js";
const userApi = new UserApi();

import transporter from "./nodemailer.js";

passport.use(
    "local-login",
    new LocalStrategy(
        { usernameField: "userEmail", passwordField: "password" },
        async (username, password, done) => {
            try {
                let user = await userApi.findUser(username);
                if (!user) {
                    logger.warn("El usuario no ha sido encontrado");
                    return done(null, false);
                }
                let isValidPassword = await comparePassword(
                    password,
                    user.password
                );
                if (!isValidPassword) {
                    logger.warn("Usuario no encontrado");
                    return done(null, false);
                } else {
                    return done(null, user);
                }
            } catch (error) {
                if (error) return done(error);
            }
        }
    )
);

passport.use(
    "local-signup",
    new LocalStrategy(
        {
            usernameField: "userEmail",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const { userAddress, userPhone, userName } = req.body;
            const userPhoto = `${userName}.${req.file.originalname
                .split(".")
                .pop()}`;
            const user = await userApi.ifExist({ userName: userName });
            if (user) {
                logger.warn(`El usuario ${userName} ya existe`);
                return done(null, false);
            }
            let newUser = {
                userEmail: username,
                password: await hashPassword(password),
                userName,
                userPhone,
                userAddress,
                userPhoto,
            };
            let newU = await userApi.add(newUser);
            if (newU) {
                const mailOptions = {
                    from: "Servidor Node.js",
                    to: "chueko@gmail.com",
                    subject: "Nuevo Usuario",
                    html: `<h1 style="color: blue;">New User added: ${newU.userEmail}</h1>
					<p>${newU.userEmail}</p>,
					<p>${newU.userAddress}</p>
					<p>${newU.userPhone}</p>`,
                };
                transporter.sendMail(mailOptions);
                return done(null, newU);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    const user = await userApi.getById(_id);
    done(null, user);
});

export default passport;
