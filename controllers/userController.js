const User = require('../models/user')

const response = require('../helper/responseHelper')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    const data = null;
    const { name, email, password } = req.body
    const passwordStr = String(password)

    try {
        let user = await User.findOne({ where: { email:email }})

        if(user) {
            const data = {
                username : name,
                email: email,
                created_at: user.createdAt,
            }
            response (200, data, 'Alamat email sudah terdaftarkan!', res)
        }
        
        // Hash password dan simpan user baru
        const hashedPassword = await bcrypt.hash(passwordStr, 10)

        const newUser = await User.create({
            name, email, password: hashedPassword            
        })

        // Array untuk akun baru
        const data = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt
        }

        response (200, data, 'Berhasil melakukan registrasi akun!', res)
    } catch (error) {
        response (500, data, `Terjadi kesalahan pada server : ${error.message}`, res)
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email:email }})

        if (!user) { response(404, null, "Email atau password tidak sesuai!", res) }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) { response(404, null, "Email atau password tidak sesuai!", res)}

        const payload = {
            userId: user.id,
            email: user.email
        }

        const secretKey = process.env.SECRET_KEY
        const options = {
            expiresIn: "1h"
        }

        const token = jwt.sign(payload, secretKey, options)

        const data = {
            tokenType: "Bearer",
            expiresIn: "1h",
            token: token,
        }

        response (200, data, 'Login berhasil!', res)

    } catch (error) {
        response (500, null, `Terjadi kesalahan pada server : ${error.message}`, res)
    }
}

exports.getUser = async (req, res) => {
    const data = null
    try {
        const user = req.user;
        const get_user = await User.findOne({ where : { id:user.userId }})

        if(!get_user) response(200, data, 'Data user tidak ditemukan!', res)

        const data = {
            id: get_user.id,
            name: get_user.name,
            email: get_user.email,
            createdAt: get_user.createdAt
        }

        response (200, data, 'Berhasil mendapatkan akun user!', res)
    } catch (error) {
        response (500, data, `Terjadi kesalahan pada server : ${error.message}`, res)
    }
}