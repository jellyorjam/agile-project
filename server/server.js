const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const faker = require("faker");
const {Member, Workspace, Board, List, Card, Activity, Label} = require("./models/models");
const shuffleArray = require("./utils");
const e = require("express");
const keys = require('./config/keys');

const port = process.env.PORT || 8000;

mongoose.connect(keys.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    // app.use(express.static("../client/build"));
  
    // // Express will serve up the index.html file
    // // if it doesn't recognize the route
    // const path = require("path");
    // app.get("*", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // });

    app.use(express.static(path.join(__dirname, '/../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../client/build/index.html'));
      });
  }

// router.get("/generate-fake-data", (req, res, next) => {
//     console.log('Generating fake data');
//     let members = [];
//     for(let a = 0; a < 20; a++) {
//         let member = new Member();
//         let names = faker.name.findName().split(" ");
//         member.login = {
//             username: faker.random.word() + faker.random.word(),
//             password: faker.hacker.phrase().replace(/\s/g, "") + Math.ceil(Math.random() * 100)
//         };
//         member.name = {
//             first: names[0],
//             last: names[1]
//         };
//         member.email = faker.internet.email();
//         member.picture = faker.image.people();
//         member.workspaces = [];
//         member.save((err) => {
//             if (err) throw err;
//         });
//         members.push(member);
//     }
//     for(let b = 0; b < 3; b++) {
//         let workspace = new Workspace();
//         workspace.title = faker.company.companyName();
//         workspace.description = faker.hacker.phrase();
//         let shuffledMembers = shuffleArray(members);
//         let memberCount = Math.ceil(Math.random() * shuffledMembers.length);
//         workspace.members = shuffledMembers.slice(memberCount);
//         workspace.boards = [];
//         let numBoards = Math.ceil(Math.random() * 8);
//         for(let c = 0; c < numBoards; c++) {
//             let board = new Board();
//             board.title = faker.hacker.noun();
//             board.members = workspace.members.slice(Math.floor(Math.random() * shuffledMembers.length));
//             board.lists = [];
//             let numLists = Math.ceil(Math.random() * 9);
//             for(let d = 0; d < 10; d++) {
//                 let label = new Label();
//                 label.title = faker.hacker.abbreviation();
//                 label.color = "blue";
//                 label.save();
//                 board.labels.push(label);
//             };
//             for(let e = 0; e < numLists; e++) {
//                 let list = new List();
//                 list.title = faker.hacker.verb();
//                 list.cards = [];
//                 let numCards = Math.ceil(Math.random() * 10);
//                 for(let f = 0; f < numCards; f++) {
//                     let card = new Card();
//                     card.title = faker.hacker.adjective();
//                     let shuffledBoardMembers = shuffleArray(board.members);
//                     card.members = shuffledBoardMembers.slice(Math.floor(Math.random() * shuffledBoardMembers.length));
//                     let shuffledLabels = shuffleArray(board.labels);
//                     card.labels = Math.random() > .7 ? shuffledLabels.slice(Math.floor(Math.random() * shuffledLabels.length)) : [];
//                     card.activity = [];
//                     let commented = Math.random() > .8;
//                     if(commented) {
//                         let commentCount = Math.ceil(Math.random() * 5);
//                         for(let g = 0; g < commentCount; g++) {
//                             let activity = new Activity();
//                             activity.member = card.members[Math.floor(Math.random * card.members.length)];
//                             activity.activityType = "comment",
//                             activity.comment = {
//                                 text: faker.hacker.phrase(),
//                                 edited: Math.random() > .85 ? true : false
//                             },
//                             activity.date = Date.now();
//                             activity.save();
//                             card.activity.push(activity);
//                         }
//                     }
//                     card.board = board._id;
//                     card.save((err) => {
//                         if (err) throw err;
//                     });
//                     list.cards.push(card);
//                 };
//                 list.save();
//                 board.lists.push(list);
//             }
//             board.save();
//             console.log(board._id);
//             workspace.boards.push(board);
//         }
//         workspace.save((err, workspace) => {
//             if (err) throw err;
//             for(let g = 0; g < workspace.members.length; g++) {
//                 let member = workspace.members[g];
//                 member.workspaces.push(workspace);
//                 setTimeout(() => {
//                     member.save((err) => {
//                         if (err) throw err;
//                     });
//                 }, 1000)
//             };
            
//         });
        
//     }
//     console.log('Data loading complete');
//     res.end();
// });

router.param("memberID", function(req, res, next, memberID) {
    Member.findById(memberID, (err, member) => {
        if(err) {
            res.status(500).send("There was an error with the format of your request");
            throw err;
        };
        if(!memberID) {
            res.status(404).send("Member not found");
        } else {
            req.member = member;
            next();
        }
    });
});

router.param("workspaceID", function(req, res, next, workspaceID) {
    Workspace.findById(workspaceID, (err, workspace) => {
        if(err) {
            res.status(500).send("There was an error with the format of your request");
            throw err;
        };
        if(!workspace) {
            res.status(404).send("Workspace not found");
        } else {
            req.workspace = workspace;
            next();
        }
    });
});

router.param("boardID", function(req, res, next, boardID) {
    Board.findById(boardID, (err, board) => {
        if(err) {
            res.status(500).send("There was an error with the format of your request");
            throw err;
        };
        if(!board) {
            res.status(404).send("Board not found");
        } else {
            req.board = board;
            next();
        }
    });
});

router.param("listID", function(req, res, next, listID) {
    List.findById(listID, (err, list) => {
        if(err) {
            res.status(500).send("There was an error with the format of your request");
            throw err;
        };
        if(!list) {
            res.status(404).send("List not found");
        } else {
            req.list = list;
            next();
        }
    });
});

router.param("cardID", function(req, res, next, cardID) {
    Card.findById(cardID, (err, card) => {
        if(err) {
            res.status(500).send("There was an error with the format of your request");
            throw err;
        };
        if(!card) {
            res.status(404).send("Card not found");
        } else {
            req.card = card;
            next();
        }
    });
});

router.param("activityID", function(req, res, next, activityID) {
    Activity.findById(activityID, (err, activity) => {
        if(err) {
            res.status(500).send("There was an error with the format of your request");
            throw err;
        };
        if(!activity) {
            res.status(404).send("Activity not found");
        } else {
            req.activity = activity;
            next();
        }
    });
});
router.param("labelID", function(req, res, next, labelID) {
    Label.findById(labelID, (err, label) => {
        if(err) {
            res.status(500).send("There was an error with the format of your request");
            throw err;
        };
        if(!label) {
            res.status(404).send("Label not found");
        } else {
            req.label = label;
            next();
        }
    });
});

router.get("/members/:memberID", (req, res, next) => {
    console.log("Member found");
    res.status(200).send(req.member);
});

router.get("/workspaces/:workspaceID", (req, res, next) => {
    console.log("Workspace found");
    res.status(200).send(req.workspace);
});

router.get("/boards/:boardID", (req, res, next) => {
    console.log("Board found");
    res.status(200).send(req.board);
});

router.get("/lists/:listID", (req, res, next) => {
    console.log("List found");
    res.status(200).send(req.list);
});

router.get("/cards/:cardID", (req, res, next) => {
    console.log("Card found");
    res.status(200).send(req.card);
});

router.get("/activities/:activityID", (req, res, next) => {
    console.log("Actvity found");
    res.status(200).send(req.activity);
});

router.get("/labels/:labelID", (req, res, next) => {
    console.log("Label found");
    res.status(200).send(req.label);
});

router.post("/members/:memberID/workspaces", (req, res, next) => {
    if(req.body.title && req.body.description) {
        let workspace = new Workspace();
        workspace.title = req.body.title;
        workspace.description = req.body.description;
        workspace.members = [req.member._id];
        workspace.save((err, workspace) => {
            if(err) throw err; 
            req.member.workspaces.push(workspace);
            req.member.save();
            res.status(200).send(`Workspace ${workspace.title} has been added to ${req.member.name.first}'s workspaces`);
        });
    } else {
        res.status(400).send("Workspace must have both a title and a description");
    }
});

router.post("/workspaces/:workspaceID/boards", (req, res, next) => {
    if(req.body.title) {
        let board = new Board();
        board.title = req.body.title;
        board.members = req.workspace.members.slice();
        board.save((err, board) => {
            if(err) throw err;
            req.workspace.boards.push(board);
            req.workspace.save(err => {
                if(err) throw err;
                res.status(200).send("Board added to workspace");
            });
        });
    } else {
        res.status(400).send("Board must have a title");
    }
});

router.post("/boards/:boardID/lists", (req, res, next) => {
    if(req.body.title) {
        let list = new List();
        list.title = req.body.title;
        list.save((err, list) => {
            if(err) throw err;
            req.board.lists.push(list);
            req.board.save(err => {
                if(err) throw err;
                res.status(200).send(`List ${list.title} sucessfully added to board ${req.board.title}`);
            });
        });
    } else {
        res.status(400).send("List must have a title");
    }
});

router.post("/boards/:boardID/lists/:listID/cards", (req, res, next) => {
    if(req.body.title) {
        if(req.board.lists.includes(req.list._id)) {
            let card = new Card();
            card.title = req.body.title;
            card.board = req.board._id;
            card.save((err, card) => {
                if(err) throw err;
                req.list.cards.push(card);
                req.list.save(err => {
                    if(err) throw err;
                    res.status(200).send(`Card ${card.title} successfully added to ${req.list.title} on the ${req.board.title} board`);
                });
            });
        } else {
            res.status(400).send("Requested list does not belong to requested board");
        }
    } else {
        res.status(400).send("Card must have a title");
    }
});

router.post("/boards/:boardID/cards/:cardID/activity", (req, res, next) => {
    if(!req.body.activityType || !req.body.member) {
        res.status(400).send("Activity must have a member and a type");
    } else {
        let activity = new Activity();
        activity.activityType = req.body.activityType;
        activity.member = req.body.member;
        activity.date = new Date();
        switch(req.body.activityType) {
            case "comment":
                if(req.body.comment) {
                    activity.comment = req.body.comment;
                } else {
                    res.status(400).send("Activity must have a title");
                }
                break;
            case "add":
                if(req.body.targetListId) {
                    activity.targetListId = req.body.targetListId;
                } else {
                    res.status(400).send("Activity must have a target location");
                }
                break;
            case "move":
                if(req.body.previousListId && req.body.targetListId) {
                    activity.previousListId = req.body.previousListId;
                    activity.targetListId = req.body.targetListId;
                } else {
                    res.status(400).send("Activity must have a starting location and target location");
                }
                break;
            default: 
                res.status(400).send("Activity type is invalid");
        }
        activity.save((err, activity) => {
            if(err) throw err;
            req.card.activity.push(activity);
            req.card.save(err => {
                if(err) throw err;
                res.status(200).send(`Activity of type ${activity.activityType} has been added to card ${req.card.title}`);
            });
        });
    }
});

router.post("/boards/:boardID/cards/:cardID/labels", (req, res, next) => {
    if(req.body.title && req.body.color) {
        Label.findOne({title: req.body.title, color: req.body.color}, function(err, label) {
            if(err) throw err;
            if(label) {
                req.card.labels.push(label);
                req.card.save(err => {
                    if(err) throw err;
                    if(!req.board.labels.includes(label._id)) {
                        res.status(200).send(`Label ${label.title}/${label.color} successfully added to card ${req.card.title}`);
                    } else {
                        req.board.labels.push(label);
                        req.board.save(err => {
                            if(err) throw err;
                            res.status(200).send(`Label ${label.title}/${label.color} successfully added to card ${req.card.title} and board ${req.board.title}`);
                        });
                    }
                });
            } else {
                let label = new Label();
                label.title = req.body.title;
                label.color = req.body.color;
                label.save((err, label) => {
                    if(err) throw err;
                    req.board.labels.push(label);
                    req.board.save(err => {
                        if(err) throw err;
                        req.card.labels.push(label);
                        req.card.save(err => {
                            if(err) throw err;
                            res.status(200).send(`Label ${label.title}/${label.color} successfully created and added to card ${req.card.title} and board ${req.board.title}`);
                        })
                    });
                });
            }
        });
    } else {
        res.status(400).send("Label must have a title and a color");
    }
});


router.put("/members/:memberID", (req, res, next) => {
    for(key in req.body) {
        if(key in req.member) {
            req.member[key] = req.body[key];
        }
    }
    req.member.save((err, member) => {
        if(err) throw err;
        res.status(200).send(`Member ${member._id} updated`);
    });
});

router.put("/workspaces/:workspaceID", (req, res, next) => {
    for(key in req.body) {
        if(key in req.workspace) {
            req.workspace[key] = req.body[key];
        }
    }
    req.workspace.save((err, workspace) => {
        if(err) throw err;
        res.status(200).send(`Workspace ${workspace.title} updated`);
    });
});

router.put("/boards/:boardID", (req, res, next) => {
    for(key in req.body) {
        if(key in req.board) {
            req.board[key] = req.body[key];
        }
    }
    req.board.save((err, board) => {
        if(err) throw err;
        res.status(200).send(`Board ${board.title} updated`);
    });
});

router.put("/lists/:listID", (req, res, next) => {
    for(key in req.body) {
        if(key in req.list) {
            req.list[key] = req.body[key];
        }
    }
    req.list.save((err, list) => {
        if(err) throw err;
        res.status(200).send(`List ${list.title} updated`);
    });
});

router.put("/cards/:cardID", (req, res, next) => {
    for(key in req.body) {
        if(key in req.card) {
            req.card[key] = req.body[key];
        }
    }
    req.card.save((err, card) => {
        if(err) throw err;
        res.status(200).send(`Card ${card.title} updated`);
    });
});

router.put("/activities/:activityID", (req, res, next) => {
    for(key in req.body) {
        if(key in req.activity) {
            req.activity[key] = req.body[key];
        }
    }
    req.activity.save((err, activity) => {
        if(err) throw err;
        res.status(200).send(`Activity ${activity._id} updated`);
    });
});

router.put("/labels/:labelID", (req, res, next) => {
    for(key in req.body) {
        if(key in req.label) {
            req.label[key] = req.body[key];
        }
    }
    req.label.save((err, label) => {
        if(err) throw err;
        res.status(200).send(`Label ${label.title} updated`);
    });
});


app.use(router);

app.listen(port, () => {
    console.log("Node.js listening on port " + port);
});