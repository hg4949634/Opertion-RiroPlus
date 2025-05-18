import express from "express";
import path from "path";
import fs from "fs";
const __dirname = path.resolve() + "/project";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("project"));
const port = 3000;
app.get("/", (req,res) => {
    console.log(__dirname)
    res.sendFile(__dirname + "/page2.html");
});
app.listen(port, () => {
    console.log(`server is listening at localhost:3000`);
    console.log(__dirname);
});
app.get("/test", (req,res) => {
    const db = JSON.parse(fs.readFileSync("IYSDB.json"));
    res.json(db);
});
