const { fighter } = require('../models/fighter');
const { FighterRepository } = require('../repositories/fighterRepository');

function testFieldsList(reqList) {
    let errText = "";
    let fieldsUser = Object.keys(fighter);
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
function testNumberValue(value,minn,maxx,nm) {
    let errText = "";
    let mode = false;
    let len = 0
    let errSimb = "";
    for (let i=0; i < value.length; i++) {
        switch(value.charAt(i)) {
            case "0": 
            case "1": 
            case "2": 
            case "3": 
            case "4": 
            case "5": 
            case "6": 
            case "7": 
            case "8": 
            case "9": 
                break;
            default:
                errSimb = value.charAt(i);
        }
        if (errSimb != "") break;
    }
    if (errSimb != "") errText = '\n incorrect simbol "'+errSimb+'" in '+nm
    else {
        value = Number.parseInt(value);
        if (value > maxx) errText = nm+"\n is too large (mast be in "+minn+" ... "+maxx+")"
        else 
        if (value < minn) errText = nm+"\n is too small (mast be in "+minn+" ... "+maxx+")"
    }
    return errText;
}

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    try {
        if (req.body) {
            let errText= testFieldsList(req.body);
            if (errText != "") {
                res.data = { error: true, message:errText, status:400 };
                next();
            }
            let fighter = FighterRepository.getOne((item)=>{ return (item.name == req.body.name) });
            if (fighter) errText = "\n this fighter is already registered : "+req.body.name
            else {
                errText = testNumberValue(req.body.health,10,100,"health");
                errText += testNumberValue(req.body.power,1,10,"power");
                errText += testNumberValue(req.body.defense,1,10,"defense");
            }
            if (errText == "") res.data = { error: false, data: "", status: 200 };
            else res.data = { error: true, message: errText, status: 400 };
        } else res.data = { error: true,  message: 'No data in request !', status: 404 };
        next();
    } catch(error) {
        res.data = { error: true, message: error, status: 404 };
        next();
    }
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    try {
        if (req.body) {
            let id = req.params.id;
            let fighter = FighterRepository.getOne((item)=>{ return (item.id == id) });
            if (!fighter) {
                res.data = { error: true, message: "No such fighter found !", status: 400 };
                next();                
            }
            let errText= testFieldsList(req.body);
            if (errText != "") {
                res.data = { error: true, message:errText, status:400 };
                next();
            }
            errText = testNumberValue(req.body.health,10,100,"health");
            errText += testNumberValue(req.body.power,1,10,"power");
            errText += testNumberValue(req.body.defense,1,10,"defense");
            if (errText == "") res.data = { error: false, data: id, status: 200 };
            else res.data = { error: true, message: errText, status: 400 };
        } else 
            res.data = { error: true,  message: 'No data in request !', status: 404 };
        next();
    } catch(error) {
        res.data = { error: true, message: error, status: 404 };
        next();
    }
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;