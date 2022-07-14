const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const faker = require("faker");
const {Member, Workspace, Board, List, Card, Activity, Label} = require("./models/models");
const shuffleArray = require("./utils");

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
            username: faker.random.word() + faker.random.word()
        };
        member.name = {
            first: names[0],
            last: names[1]
        };
        member.email = faker.internet.email;
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
        let shuffledMembers = shuffleArray(members);
        let memberCount = Math.ceil(Math.random() * shuffledMembers.length);
        workspace.members = shuffledMembers.slice(memberCount);
        workspace.boards = [];
        let numBoards = Math.ceil(Math.random() * 15);
        for(let c = 0; c < numBoards; c++) {
            let board = new Board();
            board.title = faker.hacker.noun();
            board.members = workspace.members.slice(Math.floor(Math.random() * shuffledMembers.length));
            board.lists = [];
            let numLists = Math.ceil(Math.random() * 15);
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
                let numCards = Math.ceil(Math.random() * 15);
                for(let f = 0; f < numCards; f++) {
                    let card = new Card();
                    card.title = faker.hacker.adjective();
                    let shuffledBoardMembers = shuffleArray(board.members);
                    card.members = shuffledBoardMembers.slice(Math.floor(Math.random() * shuffledBoardMembers.length));
                    let shuffledLabels = shuffleArray(board.labels);
                    card.labels = Math.random() > .7 ? shuffledLabels.slice(Math.floor(Math.random() * shuffledLabels.length)) : [];
                    card.activity = [];
                    // card.board = board._id;
                    card.save((err) => {
                        if (err) throw err;
                    });
                    list.cards.push(card);
                };
                list.save();
                board.lists.push(list);
            }
            board.save((err) => {
                if (err) throw err;
            });
        }
        workspace.save((err) => {
            if (err) throw err;
        });
        for(let g = 0; g < workspace.members.length; g++) {
            let member = workspace.members[g];
            member.workspaces.push(workspace);
            member.save((err) => {
                if (err) throw err;
            });
        };
    }
    console.log('Data loading complete');
    res.end();
});

app.use(router);

app.listen(8000, () => {
    console.log("Node.js listening on port " + 8000);
});