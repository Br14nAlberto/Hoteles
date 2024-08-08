const filesPayloadExists = (req, res) => {
    if (!req.files) return res.status(400).jason({status: "error", message: "Missing Files"})
}

export   {filesPayloadExists};