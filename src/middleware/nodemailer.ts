import nodemailer from "nodemailer";

//Create anaccount for a transporter
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "bailee.steuber49@ethereal.email",
        pass: "h17GMnMYUecfp7zxee"
    }
});

//Callback func
// transporter.verify((error, success)=> {
//     if(error){
//         console.log(error);
//     }else {
//         console.log("Server is ready to take our messages");
//     };
// });

(async () => {
    const info = await transporter.sendMail({
        from: '"Bailee Steuber" <bailee.steuber49@ethereal.email>',
        to: "petermaina.dev@gmail.com",
        subject: "You Are A Genius Bro",
        text: "Show the world what you gat",
        html: "Show the world what you gat"
    });
    console.log("Message Sent: ", info.messageId);
})();