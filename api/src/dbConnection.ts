import mongoose from "mongoose";

export const getDbUrl = () => `mongodb://0.0.0.0/${process.env.NODE_ENV === "test" ? "todolist_test" : "todolist"}`;

function databaseConnection() {
    mongoose.connect(getDbUrl());
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    return db;
}

export default databaseConnection;
