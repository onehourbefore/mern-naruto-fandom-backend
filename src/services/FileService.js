const uuid = require ('uuid')
const path = require ('path')
const fs = require ('fs')

class FileService {
    saveFile (file, str) {
        try {
            const fileName = uuid.v4 () + '.jpg'
            let filePath
            if (str === 'avatars') {
                filePath = path.resolve ('src/static/avatars', fileName)
            } else if (str === 'postImages') {
                filePath = path.resolve ('src/static/postImages', fileName)
            }
            file.mv (filePath)
            return fileName
        } catch (e) {
            console. log (e.message)
        }
    }

    async deleteImage (imageName, dir) {
        try {
            fs.stat (`src/static/${dir}/${imageName}`, (err, stats) => {
                if (err) {
                    return console. log (err)
                }
                fs.unlink (`src/static/${dir}/${imageName}`, (err) => {
                    if (err) console. log (err)
                })
            })
        } catch (e) {
            console. log (e.message)
        }
    }
}

module.exports = new FileService ()