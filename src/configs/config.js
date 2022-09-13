const Config = {
    mongoDB: {
        cnx: process.env.MONGODB_URL,
        secret: process.env.MONGODB_SECRET,
        options: {
            serverSelectionTimeoutMS: 5000,
        },
    },
    nodemailer: {
        service: process.env.NODEMAILER_GMAIL_SERVICE,
        port: process.env.NODEMAILER_GMAIL_PORT,
        auth: {
            user: process.env.NODEMAILER_GMAIL_MAIL,
            pass: process.env.NODEMAILER_GMAIL_PASS,
        },
    },
};
export default Config;
