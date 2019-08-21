/*
The 3 constants below were adding for demo purposes to represent individuals that may be found in various databases
sdn stands for Specially Designated Nationals. 
*/
const sdnNameList = ['JOHN SMITH', 'JANE DOE'];
const socialMatchList = { 'ALISON': '123-45-6789', };
const currentCustomerList = { 'MATT': '987-65-4321', };


///the function below checks the names entered against the list of known high-risk who may be on a blocked persons list;  this would be a red flag 
function passNameLookup(name) {
    if (sdnNameList.indexOf(name) !== -1) {
        return false;
    }
    return true;
}

///the function below checks whether an entered SSN belongs to a different customer; this would be a red flag 
function passSocialLookup(name, social) {
    if (socialMatchList[name]) {
        if (socialMatchList[name] !== social) {
            return false;
        }
    }
    if (!socialMatchList[name]) {
        if (Object.values(socialMatchList).indexOf(social) > -1) {
            return false;
        }
    }
    return true;
}

///the function below checks whether the customer already has accounts in good standing; this would be an indication the customer is low-risk
function passExistingCustomerLookup(name, social) {
    if (currentCustomerList[name] === social) {
        return true;
    }
    return false;
}

export default {
    passNameLookup,
    passSocialLookup,
    passExistingCustomerLookup
};