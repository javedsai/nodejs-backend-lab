import Contact from "../models/contact.model.js"

export const getContacts = async (req, res) => {
    const { page=1, limit=5} = req.query
    const options = {
        page:parseInt(page),
        limit:parseInt(limit)
    }
    const result = await Contact.paginate({}, options)
    res.render('home', {result})
}

export const getContact  = async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    res.render('show-contact', {contact})
}

export const addContactPage = (req, res) => {
    res.render('add-contact')
}

export const addContact = async (req, res) => {
    await Contact.create(req.body)
    res.redirect('/')
}

export const updateContactPage = async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    res.render('update-contact', {contact})
}

export const updateContact = async (req, res) => {
    await Contact.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/")
}

export const deleteContact = async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id)
    res.redirect("/")
}