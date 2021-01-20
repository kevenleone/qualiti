class Shortner {
    index(req, res) {
        res.send({message: "nome"})
    }

    store(req, res) {
        res.send({message: "Cadastrou!"})
    }

    update(req, res) {
        res.send({message: "Atualizou!"})
    }

    remove(req, res) {
        res.send({message: "Removeu!"})
    }

    getOne(req, res) {
        res.send({message: "Pegou o primeiro!"})
    }
}

module.exports = new Shortner();