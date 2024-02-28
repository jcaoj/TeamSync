import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "teamsync"
})

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    const image = req.file.filename;
    const sql = "INSERT INTO `posts`(`projectId`, `title`, `caption`, `image`) VALUES (1, ?, ?, ?)";

    db.query(sql, ["testPost", "testCaption", image], (err, result) => {
        if(err) return res.json({Message: err});

        return res.json({Status: "Success"});
    })
})

app.get('/getPosts', (req, res) => {
    const sql = "select * from posts";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})

app.listen(8081, () => {console.log("Running")})

