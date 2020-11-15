const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    get(req, res, next) {
        try {
            let users = UserRepository.getAll();
            res.data = { error:false, data: users, status: 200 };
        } catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }
    }

    getId(req, res, next) {
        try {
            let id = req.params.id;
            let user = UserRepository.getOne((item)=>{ return (item.id == id) });
            if (user) res.data = { error: false, data: user, status:200 }
            else res.data = { error:true, message: "No such user ...", status: 400 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    delete (req, res, next) {
        try {
            let id = req.params.id;
            let user = UserRepository.getOne((item)=>{ return (item.id == id) });
            if (!user) {
                res.data = { error: true, message: "No such user found !", status: 400 };
                next();                
            }
            user = UserRepository.delete(id);
            res.data = { error: false, data: user, status:200 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    post(req, res, next) {
        try {
            if (!res.data.error) {
                let newUser = UserRepository.create(req.body);
                res.data.data = newUser;
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
                let id = res.data.data;
                let updUser = UserRepository.update(id, req.body);
                res.data.data = updUser;
            }    
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }
}

module.exports = new UserService();