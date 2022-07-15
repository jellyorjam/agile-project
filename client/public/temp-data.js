const members = [
    {
        id: 1,
        login: {
            username: "Kirito",
            password: "Elucidator"
        },
        name: {
            first: "Kazuto", 
            last: "Kirigaya"
        },
        email: "kirito@gmail.com",
        picture: "fake-url.com",
        workspaces: [1, 2]
    },
    {
        id: 2,
        login: {
            username: "plaf",
            password: "rocknroll"
        },
        name: {
            first: "Pokey", 
            last: "LaFarge"
        },
        email: "pokey@yahoo.com",
        picture: "fake-url2.com",
        workspaces: [2]
    },
    {
        id: 3,
        login: {
            username: "trixiematel",
            password: "UNHhhh"
        },
        name: {
            first: "Brian", 
            last: "Firkus"
        },
        email: "trixie@roadrunner.com",
        picture: "fake-url3.com",
        workspaces: [1, 2]
    }
];

exports.workspaces = [
    {
        id: 1,
        title: "Workspace 1",
        boards: [1, 2],
        members: [1, 3]
    },
    {
        id: 2,
        title: "Second Workspace",
        boards: [3],
        members: [1, 2, 3]
    },
]

exports.boards = [
    {
        id: 1,
        title: "Board 1",
        lists: [1, 2, 3],
        members: [1, 3],
        labels: [1]
    },
    {
        id: 2,
        title: "Board 2",
        lists: [4, 5],
        members: [3],
        labels: [2, 3]
    },
    {
        id: 3,
        title: "Board 3",
        lists: [6],
        members: [1],
        labels: [4]
    }
]

exports.lists = [
    {
        id: 1,
        title: "List 1",
        cards: [1, 2, 3, 4, 5]
    },
    {
        id: 2,
        title: "List 2",
        cards: [6]
    },
    {
        id: 3,
        title: "List 3",
        cards: [7, 8]
    },
    {
        id: 4,
        title: "List 4",
        cards: []
    },
    {
        id: 5,
        title: "List 5",
        cards: [9]
    },
    {
        id: 6,
        title: "List 6",
        cards: [10, 11]
    },
];

exports.cards = [
    {
        id: 1, 
        description: "dsdglksdsg",
        activity: [],
        members: [1, 3],
        labels: [1],
        board: 1
    },
    {
        id: 2, 
        description: "sadfas",
        activity: [],
        members: [3],
        labels: [1],
        board: 1
    },
    {
        id: 3, 
        description: "asdfas",
        activity: [],
        members: [],
        labels: [],
        board: 1
    },
    {
        id: 4, 
        description: "asdfasdfa",
        activity: [],
        members: [1, 3],
        labels: [],
        board: 1
    },
    {
        id: 5, 
        description: "asdtga f",
        activity: [],
        members: [1],
        labels: [1],
        board: 1
    },
    {
        id: 6, 
        description: "asdfa sdf a",
        activity: [],
        members: [3],
        labels: [],
        board: 1
    },
    {
        id: 7, 
        description: "asd fsd fasda f",
        activity: [],
        members: [1, 3],
        labels: [1],
        board: 1
    },
    {
        id: 8, 
        description: "asdfa sd",
        activity: [],
        members: [],
        labels: [1],
        board: 1
    },
    {
        id: 9, 
        description: "as rrddrawe ",
        activity: [],
        members: [3],
        labels: [2, 3],
        board: 2
    },
    {
        id: 10, 
        description: "gawwelknfaw ",
        activity: [],
        members: [],
        labels: [],
        board: 3
    },
    {
        id: 11, 
        description: "kajsnduina ",
        activity: [],
        members: [1],
        labels: [4],
        board: 3
    },
];