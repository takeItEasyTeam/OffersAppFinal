class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    // add fName, lName, email, phone, country, town, address, offers, image
    }

    get username() {
        return this._username;
    }
    set username(value) {
        // validation
        this._username = value;
    }

    get password() {
        return this._password;
    }
    set password(value) {
        // validation
        this._password = value;
    }
}

module.exports = User;
