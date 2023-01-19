const bookModel = require("../models/bookorder")

class BookOrder {

    async add(req, res, next) {

        const { district, date } = req.body

        try {

            const books = await bookModel.find({ district })

            const book = books.filter(item => {
                const serverDate = new Date(item.date)
                serverDate.setHours(0, 0, 0, 0)

                const userDate = new Date(date)
                userDate.setHours(0, 0, 0, 0)

                return serverDate == userDate
            })

            if (book[0]) return res.send({ message: "already added" })

            await bookModel.create(req.body)
        } catch (err) {
            console.log(err.message)
        }

        res.status(201).send({ success: true })
    }

    async getAll(req, res, next) {

        let data
        try {

            data = await bookModel.find() || []
        } catch (err) {
            console.log(err.message)
        }

        res.send(data)
    }

    async deleteBook(req, res, next) {

        try {
            await bookModel.findByIdAndDelete(req.body.id)
        } catch (err) {
            return next(err)
        }

        res.status(200).send({ success: true })
    }
}

module.exports = new BookOrder()