require('dotenv').config({ path: `${process.cwd()}/.env` })
import fetch from 'node-fetch'
const router = require('express').Router()
const User = require('../db/models/user')

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CALLBACK_URL = "http%3A//localhost:4200/google/callback"
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL
const GOOGLE_OAUTH_SCOPES = [
    "https%3A//www.googleapis.com/auth/userinfo.email",
    "https%3A//www.googleapis.com/auth/userinfo.profile",
]

router.get('/', (req, res) => {
    const state = "some_state"
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ")
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL)
})

router.get('/google/callback', async (req, res) => {
    console.log(req.query)
    const { code } = req.query

    const data = {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: "http://localhost:4200/google/callback",
        grant_type: 'authorization_code'
    }
    console.log(data)

    const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
        method: 'POST',
        body: JSON.stringify(data)
    })

    const access_token_data = await response.json()
    const { id_token } = access_token_data
    console.log(id_token)

    const token_info_response = await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`)
    res.status(token_info_response.status).json(await token_info_response.json())

    const { email,firstName,lastName } = token_info_response
    let user = await User.findOne({ email }).select("-password")
    if(!user) {
        user = await User.create({ email, firstName, lastName })
    }
    const token = user.generateToken()
    res.status(token_info_response.status).json({ user, token })
})