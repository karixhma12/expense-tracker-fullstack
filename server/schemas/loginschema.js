const {z} = require("zod");

const loginSchema = z.object({
    password : z.string().min(6),
    email : z.string().email()
})

module.exports = loginSchema;