const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    
    get(req, res, next) {
        try {
            let fighters = FighterRepository.getAll();
            res.data = fighters;
        } catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }
    }

    getId(req, res, next) {
        try {
            let id = req.params.id;
            let fighter = FighterRepository.getOne((item)=>{ return (item.id == id) });
            if (fighter) res.data = fighter
            else res.data = { error:true, message: "No such fighter ...", status: 404 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    delete(req, res, next) {
        try {
            let id = req.params.id;
            let fighter = FighterRepository.getOne((item)=>{ return (item.id == id) });
            if (!fighter) {
                res.data = { error: true, message: "No such fighter ...", status: 404 };
                next();                
            }            
            fighter = FighterRepository.delete(id);
            res.data = fighter;
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    post(req, res, next) {
        try {
            if (!res.data.error) {
                let newFighter = FighterRepository.create(req.body);
                res.data = newFighter;
            }    
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }

    put(req, res, next) {
        try {
            if (!res.data.error) {
                let id = req.params.id;
                let updFighter = FighterRepository.update(id, req.body);
                res.data = updFighter;
            }    
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }

}

module.exports = new FighterService();