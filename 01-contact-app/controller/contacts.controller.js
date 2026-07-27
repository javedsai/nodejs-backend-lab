import mongoose from "mongoose"
import Contact from "../models/contact.model.js"

export const getContacts = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query
        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }
        const result = await Contact.paginate({}, options)
        return res.render('home', {
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            currentPage: result.page,
            counter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            contacts: result.docs
        })
    } catch (error) {
        return res.status(500).render('500', {
            message: error
        })
    }   
}

// Get Single Contact
export const getContact = async (req, res) => {
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!paramId) {
        return res.status(404).render('404', { message: "Invalid Id" })
    }
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) return res.status(404).render('404', {message: "Contact Not Found"})
        return res.render('show-contact', { contact })
        // res.render('show-contact', { contact }, (err, html) => {
        //     if (err) {
        //         return res.render('500', {
        //             message: err.message
        //         })
        //     }
        //     console.log("Render Successful");
        //     res.send(html)
        // })
    } catch (error) {
        return res.status(500).render('500', {
            message: error
        })
    }
}

export const addContactPage = (req, res) => {
    try {
        return res.render('add-contact')
    } catch (error) {
        return res.status(500).render('500', {
            message: error
        })
    }
}

export const addContact = async (req, res) => {
    try {
        await Contact.create(req.body)
        res.redirect('/')
    } catch (error) {
        return res.status(500).render('500', {
            message: error
        })
    }
}

export const updateContactPage = async (req, res) => {
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!paramId) {
        return res.status(404).render('404', { message: "Invalid Id" })
    }
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) return res.status(404).render('404', {message: "Contact Not Found"})
        return res.render('update-contact', { contact })
    } catch (error) {
        return res.status(500).render('500', {
            message: error
        })
    }    
}

export const updateContact = async (req, res) => {
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!paramId) {
        return res.status(404).render('404', { message: "Invalid Id" })
    }
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body)
        if (!contact) return res.status(404).render('404', {message: "Contact Not Found"})
        res.redirect("/")
    } catch (error) {
        return res.status(500).render('500', {
            message: error
        })
    }
}

export const deleteContact = async (req, res) => {
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!paramId) {
        return res.status(404).render('404', { message: "Invalid Id" })
    }
    try {
        await Contact.findByIdAndDelete(req.params.id)
        res.redirect("/")
    } catch (error) {
        return res.status(500).render(500, {
            message: error
        })
    }
}