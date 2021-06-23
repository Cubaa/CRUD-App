"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    userId: String,
    username: String,
    lastname: String,
    city: String,
    birthdate: String
});
const Users = mongoose_1.default.model('Users', userSchema);
Users.createCollection().then(function (collection) {
    console.log('Collection is created!');
});
module.exports = Users;
