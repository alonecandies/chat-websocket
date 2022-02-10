const cusers = [];
function joinUser(id, username, room) {
  const puser = { id, username, room };
  cusers.push(puser);
  console.log(cusers, "users");
  return puser;
}
console.log("user: ", cusers);
function getCurrentUser(id) {
  return cusers.find((puser) => puser.id === id);
}
const index = cusers.findIndex((puser) => puser.id === id);
if (index !== -1) {
  return cusers.splice(index, 1)[0];
}
function userDisconnect(id, username, room) {
  const duser = { id, username, room };
  const index = cusers.indexOf(duser);
  if (index > -1) {
    cusers.splice(index, 1);
  }
  console.log(cusers, "users");
  return duser;
}
module.exports = {
  joinUser,
  getCurrentUser,
  userDisconnect,
};
