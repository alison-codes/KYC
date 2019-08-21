/*
The 3 constants below were adding for demo purposes to represent individuals that may be found in various databases
sdn stands for Specially Designated Nationals. 
*/
const sdnNameList = ['JOHN SMITH', 'JANE DOE'];
const socialMatchList = { 'ALISON NORRIS': '123-45-6789', 'MATT LASTNAME': '111-11-1111', 'ROY': '222-22-2222', 'YAN': '333-33-3333', };
const currentCustomerList = { 'MATT LASTNAME': '111-11-1111', 'ROY': '222-22-2222', };


//checks the names entered against the list of known high-risk who may be on a blocked persons list; appearance on the list is a red flag 
function passNameLookup(name) {
    if (sdnNameList.indexOf(name) !== -1) {
        return false;
    }
    return true;
}

//checks whether the entered Social Security Number (SSN) belongs to a different customer or if customer has a different SSN on file
function passSocialLookup(name, social) {
    if (socialMatchList[name]) {
        if (socialMatchList[name] !== social) {
            return false;
        }
    }
    else {
        if (Object.values(socialMatchList).indexOf(social) > -1) {
            return false;
        }
    }
    return true;
}

//checks whether the customer currently has accounts in good standing; this would be an indication the customer is low-risk
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