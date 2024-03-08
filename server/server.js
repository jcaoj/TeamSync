import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

//#region Setup
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
    host: "teamsync-teamsync.a.aivencloud.com",
    port: "24720",
    user: "ts",
    password: "AVNS__xz8nfEvduI63chSR_L",
    database: "teamsync"
})
//#endregion

//#region Posts
app.post('/uploadPost', upload.array('image'), (req, res) => {
    console.log(req.files);
    const message = req.body.message;
    console.log(message);

    const postSql = "INSERT INTO `posts`(`projectId`, `title`, `caption`, `created`) VALUES (1, ?, ?, ?)";
    const imageSql = "INSERT INTO `imagesInPost`(`postId`, `image`, `caption`) VALUES (?, ?, ?)";

    db.query(postSql, ["testPost", "testCaption", new Date()], (err, result) => {
        if(err) return res.json({Message: err});

        // Upload images using postId from first query
        for(let i = 0; i < req.files.length; i++) {
            db.query(imageSql, [result.insertId, req.files[i].filename, message], (err, result) => {
                if (err) console.log(err);
            })
        }
        return res.json({Status: result});
    })
})

app.get('/getPosts', (req, res) => {
    const sql = "select * from posts";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})
app.get('/getPosts', (req, res) => {
    const sql = "select * from posts where id=?";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})
//#endregion

//#region Projects
app.post('/uploadProject', (req, res) => {
    const sql = "INSERT INTO `projects`(`teamId`, `name`, `description`, `status`, `created`, `createdBy`) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [req.query.teamId, req.query.name, req.query.description, req.query.status, new Date(), "jess"], (err, result) => {
        if(err) return res.json({Message: err});
        return res.json({Status: result});
    })

})

app.get('/getProjects', (req, res) => {
    const sql = "select * from projects";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})
//#endregion

//#region Teams
app.get('/getTeams', (req, res) => {
    const sql = "select * from teams";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})

app.get('/getTeamById', (req, res) => {
    const sql = "select * from teams where id=?";
    db.query(sql, [req.query.teamId], (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})
//#endregion

//#region Statuses
app.get('/getStatuses', (req, res) => {
    const sql = "select * from statuses";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})
//#endregion

app.listen(8081, () => {console.log("Running")})

