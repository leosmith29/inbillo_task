interface Users {
    banknumber : string,
    debit : number
}

let today : string ;

function report(logs : Array<Object>) : Array<Users>{
    let reports : Array<Users>;
    let usersAcct = new Set();
    
    logs.forEach((element)=>{
        if(!usersAcct.has(element['banknumber'])){
            usersAcct.add(element['banknumber']);
            let User : Users;
            User.banknumber = element['banknumber'];
            User.debit = 0.0;
            reports.push(User);            
        }

            if(typeof element['type'] != 'undefined'){
                switch(element['type']){
                    case 'inbound':{
                        reports.map((val ,indx : number)=>{
                            if(val.banknumber == element['banknumber']){
                                reports[indx].debit = (reports[indx].debit - (element['amount']))
                            }
                        })
                    }
                    break;
                    case 'outbound':{
                        reports.map((val ,indx : number)=>{
                            if(val.banknumber == element['banknumber']){
                                reports[indx].debit = (reports[indx].debit + (element['amount']))
                            }
                        })   
                    }
                    break;
                    default:
                        console.error("Financial Operation Type Not Recognized")
                }
            }
        
    })
    return reports;
}

//SQL QUERY 
let sql : string;
today = new Date().toLocaleDateString();
sql = `SELECT fin_operation as type, u.banknumber,logs.amount FROM logTransaction logs LEFT JOIN users u ON u.id = logs.userId WHERE u.id is not null and logs.log_date = ${today}`;
