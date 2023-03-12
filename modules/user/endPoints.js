const roles = {
    Admin:"Admin",
    User:"User",
    HR:"HR"
}
const endPoints = {
    Profile:[roles.Admin,roles.User],
    updateName:[roles.HR]
}
module.exports = endPoints