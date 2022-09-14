const valid = function (value) {
    if (typeof value == "number" || typeof value == "undefined" || value.length == 0 || value == null) { return false }
    if (typeof value == "string") { return true }
    return false
}

const regForName = function (value) { return (/^[A-Za-z]+$\b/).test(value) }

const regForFullName = function (value) { return (/\s+/g, " ").test(value) }

const regForLink = function (value) {
    return (/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi).test(value)
}

const regForEmail = function (value) { return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(value) }



//=====================Module Export=====================//
module.exports = { valid, regForName, regForFullName, regForLink, regForEmail }