const { DetailRepository } = require('../repositories/detailRepository');

class DetailService {
    // OPTIONAL TODO: Implement methods to work with fights

    get(req, res, next) {
        try {
            let details = DetailRepository.getAll();
            res.data = { error:false, data: details, status: 200 };
        } catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }
    }

    getId(req, res, next) {
        try {
            let idd = req.params.id;
            let detail = DetailRepository.getOne((item)=>{ return (item.id == idd) });
            if (detail) res.data = { error: false, data: detail, status:200 }
            else res.data = { error:false, data:{ id:idd, source:"" }, status: 200 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    delete(req, res, next) {
        try {
            let id = res.data.userid;
            let detail = DetailRepository.delete(id);
            res.data = { error: false, data: detail, status:200 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    post(req, res, next) {
        try {
            let newDetail = DetailRepository.create(req.body);
            res.data = { error:false, data: newDetail, status: 200 };
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }

    put(req, res, next) {
        try {
            let idd = req.params.id;
            let updDetail = DetailRepository.update(idd, req.body);
            res.data = { error:false, data: updDetail, status: 200 };
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }

}

module.exports = new DetailService();