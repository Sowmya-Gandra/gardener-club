const Datastore = require('nedb-promises')
let activitiesDB = Datastore.create('./activities.db')
let membersDB=Datastore.create('./members.db')

const activities = require('./activities.json');
const members= require('./clubUsersHash.json')
// We let NeDB create _id property for us.
async function initActivitiesmembers() {
try{
let temp = await activitiesDB.remove({});
console.log(`After remove: ${JSON.stringify(temp)}`);
let tempn = await membersDB.remove({});
console.log(`After remove: ${JSON.stringify(tempn)}`);
temp = await activitiesDB.insert(activities);
console.log(`After insert: ${JSON.stringify(temp)}`);

tempn = await membersDB.insert(members);
console.log(`After insert: ${JSON.stringify(tempn)} `);

} catch(e) {
    console.log(`error: ${e}`);
}

};

initActivitiesmembers();