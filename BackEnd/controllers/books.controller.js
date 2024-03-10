const createBook = (req, res, next) => {
    try {
        res.status(200).send('Libro creado');
    } catch (error) {
        res.status(500).send(error);
    }
    
}

const getBook = (req, res, next) => {
    try {
        res.status(200).send('Libro obtenido');
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateBook = (req, res, next) => {
    try {
        res.status(200).send('Libro actualizado');
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteBook = (req, res, next) => {
    try {
        res.status(200).send('Libro eliminado');
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const getBooksByCategory = (req, res, next) => {
    try {
        res.status(200).send('Libros por categoria');
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createBook,
    getBook,
    updateBook,
    deleteBook,
    getBooksByCategory
}