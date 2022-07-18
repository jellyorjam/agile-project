const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const faker = require("faker");
const {Member, Workspace, Board, List, Card, Activity, Label} = require("./models/models");
const shuffleArray = require("./utils");
const e = require("express");

mongoose.connect("mongodb://localhost/trello-clone", {
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

router.get("/generate-fake-data", (req, res, next) => {
    console.log('Generating fake data');
    let members = [];
    for(let a = 0; a < 20; a++) {
        let member = new Member();
        let names = faker.name.findName().split(" ");
        member.login = {
            username: faker.random.word() + faker.random.word(),
            password: faker.hacker.phrase().replace(/\s/g, "") + Math.ceil(Math.random() * 100)
        };
        member.name = {
            first: names[0],
            last: names[1]
        };
        member.email = faker.internet.email();
        member.picture = faker.image.people();
        member.workspaces = [];
        member.save((err) => {
            if (err) throw err;
        });
        members.push(member);
    }
    for(let b = 0; b < 3; b++) {
        let workspace = new Workspace();
        workspace.title = faker.company.companyName();
        workspace.description = faker.hacker.phrase();
        let shuffledMembers = shuffleArray(members);
        let memberCount = Math.ceil(Math.random() * shuffledMembers.length);
        workspace.members = shuffledMembers.slice(memberCount);
        workspace.boards = [];
        let numBoards = Math.ceil(Math.random() * 8);
        for(let c = 0; c < numBoards; c++) {
            let board = new Board();
            board.title = faker.hacker.noun();
            board.members = workspace.members.slice(Math.floor(Math.random() * shuffledMembers.length));
            board.lists = [];
            let numLists = Math.ceil(Math.random() * 9);
            for(let d = 0; d < 10; d++) {
                let label = new Label();
                label.title = faker.hacker.abbreviation();
                label.color = "blue";
                label.save();
                board.labels.push(label);
            };
            for(let e = 0; e < numLists; e++) {
                let list = new List();
                list.title = faker.hacker.verb();
                list.cards = [];
                let numCards = Math.ceil(Math.random() * 10);
                for(let f = 0; f < numCards; f++) {
                    let card = new Card();
                    card.title = faker.hacker.adjective();
                    let shuffledBoardMembers = shuffleArray(board.members);
                    card.members = shuffledBoardMembers.slice(Math.floor(Math.random() * shuffledBoardMembers.length));
                    let shuffledLabels = shuffleArray(board.labels);
                    card.labels = Math.random() > .7 ? shuffledLabels.slice(Math.floor(Math.random() * shuffledLabels.length)) : [];
                    card.activity = [];
                    let commented = Math.random() > .8;
                    if(commented) {
                        let commentCount = Math.ceil(Math.random() * 5);
                        for(let g = 0; g < commentCount; g++) {
                            let activity = new Activity();
                            activity.member = card.members[Math.floor(Math.random * card.members.length)];
                            activity.activityType = "comment",
                            activity.comment = {
                                text: faker.hacker.phrase(),
                                edited: Math.random() > .85 ? true : false
                            },
                            activity.date = Date.now();
                            activity.save();
                            card.activity.push(activity);
                        }
                    }
                    card.board = board._id;
                    card.save((err) => {
                        if (err) throw err;
                    });
                    list.cards.push(card);
                };
                list.save();
                board.lists.push(list);
            }
            board.save();
            console.log(board._id);
            workspace.boards.push(board);
        }
        workspace.save((err, workspace) => {
            if (err) throw err;
            for(let g = 0; g < workspace.members.length; g++) {
                let member = workspace.members[g];
                member.workspaces.push(workspace);
                setTimeout(() => {
                    member.save((err) => {
                        if (err) throw err;
                    });
                }, 1000)
            };
            
        });
        
    }
    console.log('Data loading complete');
    res.end();
});

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
        if(!workspaceID) {
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
        if(!boardID) {
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
        if(!listID) {
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
        if(!cardID) {
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
        if(!activityID) {
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
        if(!labelID) {
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

router.get("/activites/:activityID", (req, res, next) => {
    console.log("Actvity found");
    res.status(200).send(req.activity);
});

router.get("/labels/:labelID", (req, res, next) => {
    console.log("Label found");
    res.status(200).send(req.label);
});

app.use(router);

app.listen(8000, () => {
    console.log("Node.js listening on port " + 8000);
});