const createCategoria = (req, res, next) => {
    try {
        res.status(200).send('Categoria creada');
    } catch (error) {
        res.status(500).send(error);
    }
    
}

const getCategoria = (req, res, next) => {
    try {
        res.status(200).send('Categoria obtenida');
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateCategoria = (req, res, next) => {
    try {
        res.status(200).send('Categoria actualizada');
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteCategoria = (req, res, next) => {
    try {
        res.status(200).send('Categoria eliminada');
    }
    catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createCategoria,
    getCategoria,
    updateCategoria,
    deleteCategoria
}