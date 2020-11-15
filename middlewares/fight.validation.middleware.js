const { fight } = require('../models/fight');
const { FightRepository } = require('../repositories/fightRepository');

function testFieldsList(reqList) {
    let errText = "";
    let fieldsUser = Object.keys(fight);
    let fieldsBody = Object.keys(reqList);
    let errTextA = "";
    for (let i=1; i < fieldsUser.length; i++)
        if (fieldsBody.indexOf(fieldsUser[i]) < 0) errTextA += fieldsUser[i]+" ";
    if (errTextA != "") errText = "No fields in request : "+errTextA+"\n";
    errTextA = "";
    let errTextB = "";
    for (let i=0; i < fieldsBody.length; i++) {
        if (fieldsUser.indexOf(fieldsBody[i]) < 0) errTextA += fieldsBody[i]+" ";
        if (reqList[fieldsBody[i]] == "") errTextB += "\n --- "+ fieldsBody[i];
    }
    if (errTextA != "") errText += "Extra fields in request : "+errTextA+"\n";
    if (errTextB != "") errText += "Empty fields in request : "+errTextB+"\n";
    return errText;
}

const createFightValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    try {
        if (req.body) {
            let errText= testFieldsList(req.body);
            if (errText != "") {
                res.data = { error: true, message:errText, status:400 };
                next();
            }
            res.data = { error: false, data: "", status: 200 };
        } else res.data = { error: true,  message: 'No data in request !', status: 404 };
        next();
    } catch(error) {
        res.data = { error: true, message: error, status: 404 };
        next();
    }
}

const updateFightValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    try {
        let id = req.params.id;
        if (req.body) {
            let errText= testFieldsList(req.body);
            if (errText != "") {
                res.data = { error: true, message:errText, status:400 };
                next();
            }
            res.data = { error: false, data: id, status: 200 };
        } else res.data = { error: true,  message: 'No data in request !', status: 404 };
        next();
    } catch(error) {
        res.data = { error: true, message: error, status: 404 };
        next();
    }

}

exports.createFightValid = createFightValid;
exports.updateFightValid = updateFightValid;