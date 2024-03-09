const createEditorial = (req, res, next) => {
    try {
        res.status(200).send('Editorial creada');
    } catch (error) {
        res.status(500).send(error);
    }
    
}

const getEditorial = (req, res, next) => {
    try {
        res.status(200).send('Editorial obtenida');
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateEditorial = (req, res, next) => {
    try {
        res.status(200).send('Editorial actualizada');
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteEditorial = (req, res, next) => {
    try {
        res.status(200).send('Editorial eliminada');
    }
    catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createEditorial,
    getEditorial,
    updateEditorial,
    deleteEditorial
}