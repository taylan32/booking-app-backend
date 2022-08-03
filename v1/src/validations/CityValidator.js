const joi = require("joi")

const cityValidator = joi.object({
    name:joi.string().required().min(3)
})

module.exports = {
    cityValidator
}