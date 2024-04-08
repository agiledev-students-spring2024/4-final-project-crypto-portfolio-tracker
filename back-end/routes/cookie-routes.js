const express = require("express")

const cookieRouter = () => {
    const router = express.Router()

    router.get("/set", (req, res) => {
        res
            .cookie("foo", "bar")
            .send({
                success: true,
                message: "Sent a cookie to the browser",
            })
    })

    router.get("/get", (req, res) => {
        const numCookies = Object.keys(req.cookies).length
        console.log(`Incoming cookie data: `)
    })
}