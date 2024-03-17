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
    db.query(sql, [req.query.teamId, req.query.name, req.query.description, req.query.status, new Date(), req.query.username], (err, result) => {
        if(err) return res.json({Message: err});
        return res.json({Status: result});
    })
})

app.post('/editProject', (req, res) => {
    const sql = "UPDATE `projects` SET `teamId` = ?, `name` = ?, `description` = ?, `status` = ?, `modified` = ?, `modifiedBy` = ? WHERE `id` = ?";
    db.query(sql, [req.query.teamId, req.query.name, req.query.description, req.query.status, new Date(), req.query.username, req.query.id,], (err, result) => {
        if(err) return res.json({Message: err});
        return res.json({Status: result});
    })
})

app.post('/deleteProject', (req, res) => {
    const sql = "DELETE FROM `projects` WHERE `id` = ?";
    db.query(sql, [req.query.projectId], (err, result) => {
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

app.get('/getProjectById', (req, res) => {
    const sql = "SELECT p.id, p.teamId, p.name, p.description, p.status, p.created, p.createdBy, p.modified, p.modifiedBy, EXISTS(SELECT id FROM userFollowingProject WHERE userId=? and projectId=p.id) as followed FROM teamsync.projects as p where id=?;";
    db.query(sql, [req.query.userId, req.query.projectId], (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})

app.get('/getProjectByUserId', (req, res) => {
    var sql = "SELECT p.id, p.teamId, p.name, p.description, p.status, p.created, p.createdBy, p.modified, p.modifiedBy, EXISTS(SELECT id FROM userFollowingProject WHERE userId=? and projectId=p.id) as followed FROM teamsync.projects as p where teamId in (select teamId from usersInTeam where userId=?) and ";

    if (req.query.archived) {
        sql += "status='ARCH';"
    }
    else {
        sql += "NOT status='ARCH';"
    }

    db.query(sql, [req.query.userId, req.query.userId], (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})

app.post('/followProject', (req, res) => {
    const sql = "INSERT INTO `userFollowingProject`(`userId`, `projectId`) VALUES (?, ?)";
    db.query(sql, [req.query.userId, req.query.projectId], (err, result) => {
        if(err) return res.json({Message: err});
        return res.json({Status: result});
    })
})

app.post('/unfollowProject', (req, res) => {
    const sql = "DELETE FROM `userFollowingProject` WHERE `userId` = ? AND `projectId` = ?";
    db.query(sql, [req.query.userId, req.query.projectId], (err, result) => {
        if(err) return res.json({Message: err});
        return res.json({Status: result});
    })
})

//#endregion

//#region Teams
app.post('/uploadTeam', (req, res) => {
    const { name, description, username, userIds } = req.body;
    const sqlInsertTeam = "INSERT INTO `teams`(`name`, `description`, `created`, `createdBy`) VALUES (?, ?, ?, ?)";

    db.query(sqlInsertTeam, [name, description, new Date(), username], (err, teamResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ Message: "Error inserting team", err });
        }

        if (userIds && userIds.length > 0) {
            const teamId = teamResult.insertId; 
            const sqlAssignUsers = "INSERT INTO `usersInTeam`(`userId`, `teamId`) VALUES ?";
            const usersValues = userIds.map(userId => [userId, teamId]);
      
            db.query(sqlAssignUsers, [usersValues], (assignErr, assignResult) => {
              if (assignErr) {
                console.error(assignErr);
                return res.status(500).json({ Message: "Error assigning users to team", assignErr });
              }
      
              res.json({ Status: "Team created and users assigned", teamId: teamId });
            });
        }   else {
             res.json({ Status: "Team created", teamId: teamResult.insertId });
            }

    });   
});


app.get('/getTeams', (req, res) => {
    const sql = "select * from teams where id in (select teamId from usersInTeam where userId=?)";
    db.query(sql, [req.query.userId], (err, result) => {
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

//#region User
app.post('/signUp', (req, res) => {
    const sql = "INSERT INTO `users`(`username`, `password`) VALUES (?, ?)";
    db.query(sql, [req.query.username, req.query.password], (err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})

app.get('/getUserByUsername', (req, res) => {
    const sql = "select * from users where username=?";
    db.query(sql, [req.query.username],(err, result) => {
        if(err) return res.json({Message: err});
        return res.json(result);
    })
})

app.get('/getUsers', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ message: 'Error fetching users', error: err });
        } else {
            res.json(results);
        }
    });
});



//#endregion
app.listen(8081, () => {console.log("Running")})

