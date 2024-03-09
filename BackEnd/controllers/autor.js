const createAutor = (req, res, next) => {
    try {
        res.status(200).send('Autor creado');
    } catch (error) {
        res.status(500).send(error);
    }
    
}

const getAutor = (req, res, next) => {
    try {
        res.status(200).send('Autor obtenido');
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateAutor = (req, res, next) => {
    try {
        res.status(200).send('Autor actualizado');
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteAutor = (req, res, next) => {
    try {
        res.status(200).send('Autor eliminado');
    }
    catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createAutor,
    getAutor,
    updateAutor,
    deleteAutor
}