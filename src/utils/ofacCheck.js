/*
sdn stands for Specially Designated Nationals. The dummy array contains our list of two individuals who are high-risk
the function below checks the individuals against the list on form submission
*/

const sdnList = ['JOHN SMITH', 'JANE DOE']


function passNameLookup (customer) {
    console.log('checking');
    if (sdnList.indexOf(customer) !== -1 ){
       return false;
    }
    return true;
}

function passSocialLookup(customer) {
    console.log('checking');
    if (sdnList.indexOf(customer) !== -1 ){
       return false;
    }
    return true;
}



export default {
    passNameLookup,
    passSocialLookup,
};