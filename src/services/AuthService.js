const bcrypt = require ('bcryptjs')
const UserModel = require ('../models/UserModel')
const FileService = require ('../services/FileService')
const TokenService = require ('../services/TokenService')
const UserDto = require ('../dtos/UserDto')


class AuthService {
    async registration (user, image) {
        const invalidEmail = await UserModel.findOne ({email: user.email})
        const invalidName = await UserModel.findOne ({name: user.name})
        if (invalidEmail || invalidName) {
            throw new Error (`Пользователь с такими email и/или именем уже существует`)
        }
        const avatarName = FileService.saveFile (image, 'avatars')
        const hashPassword = await bcrypt.hash (user.password, 5)

        if (user.secret === process.env.ADMIN_SECRET) {
            const newUser = new UserModel ({
                ...user,
                role: process.env.ADMIN_ROLE, 
                password: hashPassword, 
                avatar: avatarName
            })
            await newUser.save ()
            return { 
                message: `Регистрация прошла успешно`,
                role: newUser.role
            }
        }
        const newUser = new UserModel ({
            ...user, 
            role: process.env.USER_ROLE, 
            password: hashPassword, 
            avatar: avatarName
        })
        await newUser.save ()
        return { 
            message: `Регистрация прошла успешно`,
            role: newUser.role
        }
    }

    async login (email, password) {
        const user = await UserModel.findOne ({ email })
        if (!user) {
            throw new Error ("Неверный email")
        }
        const isPassValid = bcrypt.compareSync (password, user.password)
        if (!isPassValid) {
            throw new Error ("Неверный пароль")
        }
        const userDto = new UserDto (user)
        const tokens = TokenService.generateTokens ({ ...userDto })
        await TokenService.saveRefreshToken (userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw new Error ({ message: 'Вы не авторизованы' })
        }
        const userData = TokenService.validateRefreshToken (refreshToken)
        const tokenFromDB = await TokenService.findToken (refreshToken)
        if (!userData || !tokenFromDB) {
            throw new Error ({ message: 'Вы не авторизованы' })
        }

        const user = await UserModel.findById (userData.id)
        const userDto = new UserDto (user)
        const tokens = TokenService.generateTokens ({...userDto})
        await TokenService.saveRefreshToken (userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout (refreshToken) {
        const data = await TokenService.removeToken (refreshToken)
        return data
    }

    async deleteProfile (userID, avatarName, refreshToken) {
        await UserModel.findByIdAndDelete (userID)
        await FileService.deleteImage (avatarName, 'avatars')
        await TokenService.removeToken (refreshToken)
        return { message: 'Profile was deleted' }
    }
}

module.exports = new AuthService ()