const createLibro = (req, res, next) => {
    try {
        res.status(200).send('Libro creado');
    } catch (error) {
        res.status(500).send(error);
    }
    
}

const getLibro = (req, res, next) => {
    try {
        res.status(200).send('Libro obtenido');
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateLibro = (req, res, next) => {
    try {
        res.status(200).send('Libro actualizado');
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteLibro = (req, res, next) => {
    try {
        res.status(200).send('Libro eliminado');
    }
    catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createLibro,
    getLibro,
    updateLibro,
    deleteLibro
}