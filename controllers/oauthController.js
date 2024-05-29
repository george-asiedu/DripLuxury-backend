require('dotenv').config({ path: `${process.cwd()}/.env` })
const { fetch } = require('node-fetch')
const User = require('../db/models/user')
const catchErrorAsync = require('../utils/catchErrorAsync')

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CALLBACK_URL = "https%3A//dripluxury-clothing.vercel.app" || "http%3A//localhost:4200"
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL
const GOOGLE_OAUTH_SCOPES = [
    "https%3A//www.googleapis.com/auth/userinfo.email",
    "https%3A//www.googleapis.com/auth/userinfo.profile",
]

const googleConsent = catchErrorAsync(async (req, res) => {
    const state = "some_state"
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ")
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL)
})

const handleCallback = catchErrorAsync(async (req, res) => {
    console.log(req.query)
    const { code } = req.query

    const data = {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: "https%3A//dripluxury-clothing.vercel.app" || "http%3A//localhost:4200",
        grant_type: 'authorization_code'
    }
    console.log(data)

    const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    const access_token_data = await response.json()
    const { id_token } = access_token_data
    console.log(id_token)

    const token_info_response = await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`)
    const token_info = await token_info_response.json()
    res.status(token_info.status).json()

    const { email,firstName,lastName } = token_info
    let user = await User.findOne({ email }).select("-password")
    if(!user) {
        user = await User.create({ email, firstName, lastName })
    }
    const token = user.generateToken()
    res.redirect(`https://dripluxury-clothing.vercel.app/login?token=${token}` || `http://localhost:4200/login?token=${token}`)
    res.status(token.status).json({ user, token })
})

module.exports = { googleConsent, handleCallback }