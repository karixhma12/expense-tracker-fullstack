const {z} = require("zod");

const signupSchema = z.object({
    username : z.string().min(3),
    password : z.string().min(6),
    email : z.string().email()
})

module.exports = signupSchema;