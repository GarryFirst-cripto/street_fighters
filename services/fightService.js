const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
    // OPTIONAL TODO: Implement methods to work with fights

    get(req, res, next) {
        try {
            let fights = FightRepository.getAll();
            res.data = { error:false, data: fights, status: 200 };
        } catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }
    }

    getId(req, res, next) {
        try {
            let id = req.params.id;
            let fight = FightRepository.getOne((item)=>{ return (item.id == id) });
            if (fight) res.data = { error: false, data: fight, status:200 }
            else res.data = { error:true, message: "No such fight ...", status: 400 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    delete(req, res, next) {
        try {
            let id = res.data.userid;
            let fight = FightRepository.delete(id);
            res.data = { error: false, data: fight, status:200 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    post(req, res, next) {
        try {
            if (!res.data.error) {
                let newFight = FightRepository.create(req.body);
                res.data.data = newFight;
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
                let updFight = FightRepository.update(id, req.body);
                res.data.data = updFight;
            }    
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }

}

module.exports = new FightersService();