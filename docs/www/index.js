"use strict";

var botui = new BotUI('my-botui-app');

var user1 = {
    firstname: "",
    password: "lvmh2020",
    location: "Rome",
    nDisconnect: 0,
    nConnect: 0,
    taskDone: false,
    passed: {},
    completed: {},
    transfered: {},
    differed: {}
};

var user2 = {
    firstname: "John",
    lastname: "Fender",
    url: "https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/user2.jpg"
};

var bot = {
    designer: "https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/team.png"
};

var collaborators = ["Abbott Eden", "Adams Aloïs", "Adamson Emrys", "Adcock August", "Addams Basil", "Adhams Emil", "Aindreis Elie", "Allan Elias", "Allen Félix", "Allison Liam", "Alyn Hugh", "Ambrose Henry", "Anderson Adriel", "Andrés Eliel", "Andrew Ezéchiel", "Andrews Zachary", "Anew Cameron", "Anthony Malone", "Apple Lenny", "Archdeacon Leon", "Archer Leonard", "Ash Lewis", "Ashley Orion", "Atcock Levi", "Austen Archibald", "Austin Jasper", "Aylen Caspar", "Aylin Roman", "Ayling Caleb", "Baker Abel", "Bannerman Chad", "Baptist Owen", "Barber Derek", "Barry Charles", "Bartholomew Charlie", "Beadle Adam", "Bearnard Sacha", "Beef Tybalt", "Bennet Théodore", "Benson James", "Berkelay Dennis", "Berkeley Leander", "Bernard Alexander", "Bernardson Jackson", "Bigg Isaac", "Bigs Mia", "Bird Emma", "Bishop Sofia", "Black Hannah", "Blacks Emilia", "Blackson Anna", "Booth Marie", "Bowers Mila", "Bowman Lina", "Bridges Leah", "Bridgestone Ben", "Brook Paul", "Brooks Jonas", "Brown Elias", "Brythe Leon", "Bull Finn", "Burgess Noah", "Busby Louis", "Bushby Lucas", "Bush Felix", "Bushnell Amelia", "Butcher Ava", "Cannon Ella", "Carlton Emily", "Carthew Isabella", "Castle Isla", "Chaplain Jessica", "Charles Mia", "Charley Olivia", "Cheesmann Poppy", "Chicken Charlie", "Clerk George", "Coalman Harry", "Colin Jack", "Colins Jacob", "Cook Noah", "Cooper Oliver", "Cordell Oscar", "Crossman Thomas", "Curtis Williams", "Dalton Azra", "Daniels Defne", "Danielson Ecrin", "Davidson Elif", "Davis Eylül", "Davy Hiranur", "Dawkins Miray", "Dawson Nehir", "Deacon Zehra", "Deakin Zeynep", "Dean Ahmet", "Driver Ayaz", "Earl Berat", "Eastwood Eymen", "Elder Hamza", "Ells Mehmet", "Fatt Miraç", "Field Mohamad", "Fish Mustafa", "Fishman Ömer", "Fitzmartin Yunus Emre", "Flanders Yusuf", "Fleming Alexandra", "Forest Alisa", "Forester Anastasia", "Francis Anna", "Frank Daria", "Franklin Elizaveta", "Frederick Maria", "Freeman Polina", "French Sophia", "Frent Victoria", "Friend Alexander", "Fuller Andrey", "Gardner Artyom", "Garrison Cyril", "Gibert Daniil", "Gilson Dmitry", "Goldsmith Egor", "Grabriel Iwan", "Greggson Maxim", "Griggs Mikhail", "Hadcock Eden", "Harry Aloïs", "Henry Emrys", "Hepburn August", "Hudson Basil", "Huggins Emil", "Jacobson Elie", "Johnson Elias", "Jones Félix", "Josephs Liam", "Kane Hugh", "King Henry", "Kitchener Adriel", "Knight Eliel", "Lambertson Ezéchiel", "Lauwrence Zachary", "Lawford Cameron", "Leigh Malone", "Levinson Lenny", "Levis Leon", "Lindon Leonard", "Little Lewis", "Mac-Mahon Orion", "Mac'Martin Levi", "Marsch Archibald", "Mary Jasper", "Matthew Caspar", "Merill Roman", "Miller Caleb", "Milner Abel", "Mogg Chad", "Monk Owen", "Montgomery Derek", "Moore Charles", "Morrison Charlie", "Nail Adam", "Nightingal Sacha", "Olivier Tybalt", "Parlan Théodore", "Person James", "Peters Dennis", "Potter Leander", "Prescott Alexander", "Priest Jackson", "Robbins Isaac", "Roberson Mia", "Robertson Emma", "Robinson Sofia", "Roman Hannah", "Rosebury Emilia", "Russel Anna", "Shepherdson Marie", "Sheppe Mila", "Shields Lina", "Simons Leah", "Simpson Ben", "Skinner Paul", "Slow Jonas", "Smith Elias", "Spears Leon", "Spring Finn", "Stephen Noah", "Stratton Louis", "Strong Lucas", "Tempel Felix", "Thomson Amelia", "Turner Ava", "Wheeler Ella", "Williams Emily", "Wise Isabella", "Wolfe Isla", "Wolff Jessica", "Wood Mia", "Yougman Olivia", "Young Poppy"];
var lastnames = ["Fender"];
var firstnames = ["John"];
var locations = ["Rome"];
var mobiles = ["+390661969084"];
var current = { back: {}, stack: [] };

// start
start();
//init1();

function start() {
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    var mode = getUrlParameter("mode");

    if (mode == "init") {
        init();
    } else {
        connection();
    }
}

var lvmh = {};
lvmh.handle_action_button = function (button) {
    if (current.waitingPassword) {}

    return true;
};

lvmh.handle_action_text = function (action) {

    if (current.waitingPassword) {
        var password = action.text.value;
        action.text.value = "•".repeat(password.length);
        current.waitingPassword = false;
        current.password = password;
    }
    return true;
};

lvmh.handle_action_select = function (action, labels) {
    if (labels && labels.length == 0) {
        labels = ["..."];
    }

    return true;
};

function addImage(opts) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            $("<div class=\"botui-message\">\n                <div class=\"botui-message-content image " + opts.cssClass + "\"><img class=\"botui-message-content-image\" src=\"" + opts.url + "\" /></div>\n            </div>").hide().appendTo("div.botui-messages-container").fadeIn(500);
            resolve();
        }, 500);
    });
}

function saveChanges() {
    var storage = localStorage;

    storage.setItem("user1", JSON.stringify(user1));
    storage.setItem("user2", JSON.stringify(user2));
    storage.setItem("bot", JSON.stringify(bot));

    console.log("saved!");
}

function load() {
    var storage = localStorage;

    user1 = JSON.parse(storage.getItem("user1"));
    user2 = JSON.parse(storage.getItem("user2"));
    bot = JSON.parse(storage.getItem("bot"));
    if (!user1.differed) user1.differed = {};
}

function reset() {
    localStorage.clear();
}

function setDefault() {
    user1.password = "lvmh2020";
    user1.location = "Rome";

    user2.firstname = "John";
    user2.lastname = "Fender", user2.url = "https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/user2.jpg";

    bot.designer = "https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/team.png";

    saveChanges();
}

function init() {
    var data = localStorage.getItem("user1");
    if (!data) {
        init1();
    } else {
        init2();
    }
}

function init2() {
    var texts = ["Start demo with default values?"];

    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function () {
        return botui.action.button({
            action: [{
                text: 'yes',
                value: 'yes'
            }, {
                text: 'no, change values',
                value: 'no'
            }, {
                text: 'no, reset',
                value: 'reset'
            }, {
                text: 'back to home',
                value: 'back'
            }]
        });
    }).then(function (response) {
        switch (response.value) {
            case "yes":
                setDefault();
                window.location = "home.html";
                break;
            case "no":
                init3();
                break;
            case "reset":
                reset();
                init();
                break;
            case "back":
                window.location = "home.html";
                break;
        }
    });
}

function init1() {
    var text = "The first name of the recipient...";

    botui.message.add({
        delay: 1000,
        loading: true,
        content: text
    }).then(function () {
        return botui.action.text({
            action: {
                datatype: "firstname",
                placeholder: 'Type here'
            }
        });
    }).then(function (res) {
        // will be called when it is submitted.
        var resValue = res.value;

        user1.firstname = resValue;

        init2();
    });
}

function init3() {
    var texts = ["Bot initialization: please enter values ​​for this demo", "The location of the recipient in Italy (city)"];

    sendTexts(texts, function () {
        botui.action.text({
            action: {
                datatype: "location",
                icon: "map-marker",
                placeholder: 'Enter the location'
            }
        }).then(function (res) {
            // will be called when it is submitted.
            var resValue = res.value;

            user1.location = resValue;

            var texts1 = ["The first name of one of his collaborators..."];

            botui.message.add({
                delay: 1000,
                loading: true,
                content: texts1[0]
            }).then(function () {
                return botui.action.text({
                    action: {
                        datatype: "firstname",
                        placeholder: 'Enter the first name'
                    }
                });
            }).then(function (res) {
                var resValue = res.value;

                user2.firstname = resValue;

                return botui.message.add({
                    delay: 1000,
                    loading: true,
                    content: "The last name of this collaborator please…"
                });
            }).then(function () {
                return botui.action.text({
                    action: {
                        datatype: "lastname",
                        placeholder: 'Enter the last name'
                    }
                });
            }).then(function (res) {
                var resValue = res.value;
                user2.lastname = resValue;

                return botui.message.add({
                    delay: 1000,
                    loading: true,
                    content: "And a picture of this collaborator…"
                });
            }).then(function (res) {
                return botui.action.photo({
                    cssClass: "s1", // photo
                    action: [{ // show only one button
                        text: 'yes',
                        value: 'yes'
                    }, {
                        text: 'no',
                        value: 'no'
                    }]
                });
            }).then(function (response) {
                switch (response.value) {
                    case "yes":
                        user2.url = response.url;
                        break;

                    case "no":
                        // TODO
                        break;
                }
                return botui.message.add({
                    delay: 1000,
                    loading: true,
                    content: "And to finish a small photo of the team of designers"
                });
            }).then(function (res) {
                return botui.action.photo({
                    cssClass: "s1", // photo
                    action: [{ // show only one button
                        text: 'yes',
                        value: 'yes'
                    }, {
                        text: 'no',
                        value: 'no'
                    }]
                });
            }).then(function (response) {
                switch (response.value) {
                    case "yes":
                        bot.designer = response.url;
                        break;
                    case "no":
                        // TODO
                        break;
                    case "default":
                        break;
                }

                init4();
            });
        });
    });
}

function init4() {
    var texts = ["Start demo with updated values?"];

    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function () {
        return botui.action.button({
            action: [{ // show only one button
                text: 'yes',
                value: 'yes'
            }, { // show onlyesy one button
                text: 'no, change values',
                value: 'no'
            }]
        });
    }).then(function (response) {
        switch (response.value) {
            case "yes":
                saveChanges();
                break;
            case "no":
                init3();
                break;
        }
        window.location = "home.html";
    });
}

function connection() {
    load();
    user1.nConnect++;
    if (!user1) window.location = "home.html?mode=init";

    var firstRun = user1.nConnect == 1;

    if (firstRun) {
        connection1(); // TODO
    } else {
        user1.taskDone = (user1.completed.no62 || user1.transfered.no62) && (user1.completed.no64 || user1.transfered.no64);
        if (user1.taskDone || user1.wrongPerson) {
            connection3();
        } else {
            connection2();
        }
    }
}

function connection1() {
    var texts = ["Hello " + user1.firstname + ",", 'Happy to be able to exchange with you a few moments.', "According to my information, you are a Store Planner for Italy, with Emilia Prescci."];
    if (user1.passed.connection1) texts = [texts[2]];

    sendTexts(texts, function () {
        user1.passed.connection1 = true;
        botui.action.button({
            action: [{
                text: 'confirm',
                value: 'confirm'
            }, {
                text: 'revise',
                value: 'revise'
            }]
        }).then(function (response) {
            if (response.value == "confirm") {
                check2();
            } else {
                current.back.answerAnyway = connection1;
                answerAnyway();
            }
        });
    });
}

function connection2() {
    var texts = ["Welcome back " + user1.firstname + ","];
    sendTexts(texts, function () {
        if (user1.enterPass) {
            var texts1 = ["Please enter your password"];
            sendTexts(texts1, function () {
                current.waitingPassword = true;
                return botui.action.text({
                    action: {
                        placeholder: 'Enter your password'
                    }
                }).then(function (response) {
                    if (current.password == user1.password) {
                        intro();
                    } else {
                        check2();
                    }
                });
            });
        } else {
            check2();
        }
    });
}

function connection3() {
    $(".botui-messages-container").css("padding-bottom", "10vh");
    var texts = ["Good news! The remaining points around Rome Etoile store were handled by " + user2.firstname + " " + user2.lastname + "!", "No more delayed questions", "\uD83D\uDC51"];
    sendTexts(texts, function () {
        exit0({ type: 3 });
    });
}

function check2() {
    var text = "For security reasons, can you enter your geographical location?";

    botui.message.add({
        delay: 1000,
        loading: true,
        content: text
    }).then(function () {
        return botui.action.text({
            action: {
                datatype: "location",
                icon: "map-marker",
                placeholder: 'Enter your location here'
            }
        });
    }).then(function (res) {
        // will be called when it is submitted.
        console.log(res.value); // will print whatever was typed in the field.

        if (res.value == user1.location) {
            check5();
        } else {
            check3();
        }
    });
}

function check3() {
    var texts = ["Sorry, but the location saved for you does not match.", "Try a second time"];

    sendTexts(texts, function () {
        botui.action.text({
            action: {
                datatype: "location",
                icon: "map-marker",
                placeholder: 'Enter the location here'
            }
        }).then(function (res) {
            // will be called when it is submitted.
            console.log(res.value); // will print whatever was typed in the field.

            if (res.value == user1.location) {
                check5();
            } else {
                check4();
            }
        });
    });
}

function check4() {
    var texts = ["I advise you to contact the assistance."];

    sendTexts(texts, function () {
        botui.action.button({
            action: [{ // show only one button
                text: 'Assistance',
                value: 'assistance'
            }]
        }).then(function (response) {
            if (response.value == "assistance") {
                current.back.assistance = function () {
                    exit0({ type: 3 });
                };
                current.wrongPassword = true;
                assistance();
            }
        });
    });
}

function check5() {
    var texts = ["Thank you for this confirmation!", "Please enter a password to save time on your next connections"];

    sendTexts(texts, function () {
        current.waitingPassword = true;
        botui.action.text({
            action: {
                placeholder: 'Type here'
            }
        }).then(function (res) {
            // will be called when it is submitted.
            user1.password = current.password;
            user1.enterPass = true;
            saveChanges();

            intro();
        });
    });
}

function intro() {
    var firstRun = user1.nConnect == 1;

    if (firstRun) {
        intro1(); // TODO
    } else {
        user1.taskDone = (user1.completed.no62 || user1.transfered.no62) && (user1.completed.no64 || user1.transfered.no64);

        store1_3();
    }
}

function intro1() {
    $(".botui-messages-container").css("padding-bottom", "10vh");
    addImage({ url: user2.url }).then(function () {
        var texts = ["Your contact was sent to us directly by Emilia Prescci, but also by " + user2.firstname + " " + user2.lastname + " who works with you."];
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: texts.join("<br/>")
        });
    }).then(function () {
        return botui.action.button({
            cssClass: "s2",
            action: [{ // show only one button
                text: 'continue',
                value: 'continue'
            }]
        });
    }).then(function (response) {
        if (response.value == "continue") {
            return addImage({ url: bot.designer });
        }
    }).then(function () {
        var texts1 = ["For my part, I am a bot at your service, as the team who designed me and who can exchange with you if you need assistance."];
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: texts1.join("<br/>")
        });
    }).then(function () {
        return botui.action.button({
            cssClass: "s2",
            action: [{ // show only one button
                text: 'continue',
                value: 'continue'
            }]
        });
    }).then(function (response) {
        if (response.value == "continue") {
            $(".botui-messages-container").css("padding-bottom", "");
            store1_1();
        }
    });
}

function intro2() {
    var texts = ["👌", "With what will you take back to Rome Etoile store?"];
    var choices = [{
        text: 'Return to the checklist',
        value: 'checklist'
    }];

    if (user1.differed && Object.keys(user1.differed).length > 0) {
        choices.push({
            text: "Consult the questions I've differed",
            value: 'questions'
        });
    }

    sendTexts(texts, function () {
        botui.action.button({
            action: choices
        }).then(function (response) {
            switch (response.value) {
                case "checklist":
                    store1_4();
                    break;
                case "questions":
                    if (user1.differed && user1.differed.no62) {
                        no6_2();
                    } else if (user1.differed && user1.differed.no64) {
                        no6_4();
                    } else {
                        exit0({ "type": 1 });
                    }
                    break;
            }
        });
    });
}

function store1_1() {
    var texts = ["You are currently in charge of LVMH Rome Etoile store, right?"];
    sendTexts(texts, function () {
        botui.action.button({
            action: [{
                text: 'yes',
                value: 'yes'
            }, {
                text: 'no, but I know the right person',
                value: 'no1'
            }, {
                text: 'no, and I don\'t know the right person',
                value: 'no2'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "yes":
                    store1_3();
                    break;

                case "no1":
                case "no2":
                    user1.wrongPerson = true;
                    store1_2();
                    break;
            }
        });
    });
}

function store1_2() {
    var texts = ["Please let us know who he/she is!"];
    sendTexts(texts, function () {
        botui.action.text({
            action: {
                datatype: "collaborator",
                placeholder: 'Type here'
            }
        }).then(function (res) {
            // will be called when it is submitted.

            if (collaborators.includes(res.value)) {
                // found
                exit0({ type: 1 });
            } else {
                // not found
                exit0({ type: 1 });
            }
        });
    });
}

function store1_3() {
    var nPoints = 5;
    if (user1.passed.store14) nPoints = 4;
    var texts = ["Nice!", "Together, we have to investigate " + nPoints + " points of the checklist that have not been covered yet."];
    var choices = [{
        text: "list the " + nPoints + " points pending",
        value: 'list'
    }, {
        text: 'start randomly',
        value: 'startRandom'
    }];

    sendTexts(texts, function () {
        botui.action.button({
            cssClass: "s2",
            action: choices
        }).then(function (response) {
            switch (response.value) {
                case "list":
                    store1_4();
                    break;
                case "startRandom":
                    if (Math.random() > 0.5) {
                        current.back.no6 = store1_4;
                        sendTexts(["#6. Sensors and Timers"], function () {
                            no6();
                        });
                    } else {
                        current.back.not6 = store1_4;
                        not6();
                    }
                    break;
            }
        });
    });
}

function store1_4() {
    var texts = ["I am very strong as a robot to recall lists 😉", "Which point do you wish to address?"];
    var choices = [{
        text: '1 Code of Conduct',
        value: '1'
    }, {
        text: '4 Air tightness',
        value: '4'
    }, {
        text: '6 Sensors and Timers',
        value: '6'
    }, {
        text: '7 Energy management',
        value: '7'
    }, {
        text: '8 Materials and eco-design',
        value: '8'
    }];

    if (user1.passed.store14) {
        texts.shift();
        choices.shift(); // remove code of conduct
    }

    sendTexts(texts, function () {
        user1.passed.store14 = true;
        saveChanges();
        botui.action.button({
            action: choices
        }).then(function (response) {
            switch (response.value) {
                case "6":
                    current.back.no6 = store1_4;
                    no6();
                    break;
                default:
                    current.back.not6 = store1_4;
                    not6();
                    break;
            }
        });
    });
}

function no6() {

    var texts = ["A good part of the effort on power consumption comes from the limitation of the usage that can be planned, programed, or organized.", "I know it as a robot, because you can interrupt me at any time.", "😬"];
    var choices = [];
    if (user1.nDisconnect > 0) {
        texts.splice(2, 0, "... and you already did it elsewhere!");
    }

    sendTexts(texts, function () {
        botui.action.button({
            cssClass: "s2",
            action: [{ // show only one button
                text: 'continue',
                value: 'continue'
            }, { // show only one button
                text: 'stop this bot',
                value: 'stop'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "stop":
                    exit0({ type: 2 });
                    break;
                case "continue":
                    no6_2();
                    break;
                case "...":

                    not6();
                    break;
            }
        });
    });
}

function no6_2() {
    if (user1.completed.no62 || user1.transfered.no62) {
        no6_4();
        return;
    }

    var texts = ["Thank you for keeping me in service!", "We have to check where are the existing sensors (light or presence)"];
    var choices = [];
    if (user1.passed.no62) texts[0] = "Thank you for putting me back into service!";

    sendTexts(texts, function () {
        user1.passed.no62 = true;
        botui.action.form({
            action: {
                placeholder: "I know, they are ...",
                value: '',
                multipleselect: true, // Default: false
                options: [{ value: "backHouse", text: "in the back of house" }, { value: "circulations", text: "in circulations" }, { value: "windows", text: "in the windows" }],
                button: {
                    icon: 'check',
                    label: 'validate'
                },
                readmore: "readmore",
                differ: "differ",
                transfer: "transfer",
                assistance: "assistance"
            }
        }).then(function (response) {
            switch (response.button) {
                case 'validate':
                    user1.completed.no62 = true;
                    no6_3();
                    break;
                case 'readmore':
                    current.back.readmore = no6_2;
                    readmore();
                    break;
                case 'transfer':
                    current.back.transfer = no6_4;
                    current.question = "no62";
                    transfer();
                    break;
                case 'differ':
                    debugger;
                    current.back.differ = no6_2;
                    differ();
                    break;
                case 'assistance':
                    current.back.assistance = no6_2;
                    assistance();
                    break;
            }
        });
    });
}

function no6_3() {
    var texts = ["👍", "Do you need to take a picture of this?"];
    var choices = [];

    sendTexts(texts, function () {
        current.back = no6_3;

        botui.action.button({
            cssClass: "s1",
            action: [{ // show only one button
                text: 'yes',
                value: 'yes'
            }, {
                text: 'no',
                value: 'no'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "yes":
                    addImage({ url: "images/store161.png", cssClass: "human" }).then(function () {
                        no6_4();
                    });
                    break;
                case "no":
                    no6_4();
                    break;
                case 'differ':
                    differ();
                    break;
            }
        });
    });
}

function no6_4() {
    if (user1.completed.no64 || user1.transfered.no64) {
        exit0({ type: 1 });
        return;
    }

    var texts = ["OK! Let's continue with planning and programing", "Is there are some timers to program the extinction of the store?"];
    var choices = [];
    if (user1.passed.no64) texts[0] = "OK! Let's restart about planning and programing";

    sendTexts(texts, function () {
        user1.passed.no64 = true;
        botui.action.form({
            action: {
                placeholder: "I know, they are ...",
                value: '',
                multipleselect: true, // Default: false
                options: [{ value: "openingHours", text: "yes, for opening hours" }, { value: "night", text: "yes, for the night (security cameras)" }, { value: "service", text: "yes, for service (cleaning, preparation)" }],
                button: {
                    icon: 'check',
                    label: 'validate'
                },
                readmore: "readmore",
                differ: "differ",
                transfer: "transfer",
                assistance: "assistance"
            }
        }).then(function (response) {
            switch (response.button) {
                case 'validate':
                    user1.completed.no64 = true;
                    no6_5();
                    break;
                case 'readmore':
                    current.back.readmore = no6_4;
                    readmore();
                    break;
                case 'transfer':
                    current.back.transfer = function () {
                        exit0({ type: 1 });
                    };
                    current.question = "no64";
                    transfer();
                    break;
                case 'differ':
                    current.back.differ = no6_4;
                    differ();
                    break;
                case 'assistance':
                    current.back.assistance = no6_4;
                    assistance();
                    break;
            }
        });
    });
}

function no6_5() {
    var texts = ["👍", "Do you need to take a picture of this?"];
    var choices = [];

    sendTexts(texts, function () {
        botui.action.button({
            cssClass: "s1",
            action: [{ // show only one button
                text: 'yes',
                value: 'yes'
            }, {
                text: 'no',
                value: 'no'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "yes":
                    addImage({ url: "images/store162.jpg", cssClass: "human" }).then(function () {
                        exit0({ "type": 1 });
                    });
                    break;
                case "no":
                    exit0({ "type": 1 });
                    break;
                case 'differ':
                    differ();
                    break;
            }
        });
    });
}

function not6() {
    var texts = ["Sorry, I'm a poor lonesome bot, not yet programed to deepen these points on which I ask you yet!", "😅", "Please try point No.6"];
    var choices = [{
        text: 'Try to complain to the designers',
        value: 'complain'
    }, {
        text: 'OK, go back to the list',
        value: 'back'
    }];
    if (user1.passed.not6) {
        texts = [texts[2]];
        choices = [choices[1]];
    }

    sendTexts(texts, function () {
        user1.passed.not6 = true;
        botui.action.button({
            cssClass: "s2",
            action: choices
        }).then(function (response) {
            switch (response.value) {
                case "complain":
                    current.back.answerAnyway = current.back.not6;
                    answerAnyway();
                    break;
                case "back":
                    current.back.not6();
                    break;
            }
        });
    });
}

function answerAnyway() {
    var texts = ["Sorry, not ready for this task yet.", "Keep in mind that I am a prototype", "🐣"];
    var choices = [{
        text: 'go back',
        value: 'back'
    }];
    if (user1.passed.answerAnyway) {
        texts.shift();
    }

    sendTexts(texts, function () {
        user1.passed.answerAnyway = true;
        botui.action.button({
            cssClass: "s2",
            action: choices
        }).then(function (response) {
            switch (response.value) {
                case "insure":
                    exit0({ type: 2 });
                    break;
                case "back":
                    current.back.answerAnyway();
                    break;

            }
        });
    });
}

function sendTexts(texts, cb) {
    if (texts.length == 0) {
        cb();
        return;
    }
    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function () {
        texts.splice(0, 1);
        sendTexts(texts, cb);
    });
}

function uploadFile(file, cb) {
    // Begin file upload
    console.log("Uploading file to Imgur..");

    // Replace ctrlq with your own API key
    var apiUrl = 'https://api.imgur.com/3/image';
    var apiKey = '70cfd7b28a139cc';

    var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
            Authorization: 'Client-ID ' + apiKey,
            Accept: 'application/json'
        },
        mimeType: 'multipart/form-data'
    };

    var formData = new FormData();
    formData.append("image", file);
    settings.data = formData;

    // Response contains stringified JSON
    // Image URL available at response.data.link
    $.ajax(settings).done(function (response) {
        var link = JSON.parse(response).data.link;
        console.log(link);
        cb(link);
    });
}

function assistance() {
    var texts = ["I'll be the most zealous bot, in connection with a human team.", "We will be able to detail the questions and answers.", "But for now, I'm not willing to help.", "😇"];
    var choices = [{
        text: 'OK, go back',
        value: 'back'
    }];

    if (user1.passed.assistance) {
        texts = ["Remember... No help at the moment.", "😇"];
    }
    if (current.wrongPassword) choices = [{
        text: 'Quit',
        value: 'quit'
    }];

    sendTexts(texts, function () {
        user1.passed.assistance = true;
        botui.action.button({
            cssClass: "s2",
            action: choices
        }).then(function (response) {
            switch (response.value) {
                case "back":
                    current.back.assistance();
                    break;
                case "quit":
                    current.back.assistance();
                    break;
            }
        });
    });
}

function readmore() {
    var texts = ["No read more for now", "🐣"];

    sendTexts(texts, function () {
        botui.action.button({

            action: [{
                text: 'go back',
                value: 'back'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "back":
                    current.back.readmore();
                    break;

            }
        });
    });
}

function differ() {
    var texts = ["You will have to postpone the idea to postpone for this demo!", "⏲️"];

    sendTexts(texts, function () {
        botui.action.button({
            action: [{
                text: 'go back',
                value: 'back'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "back":
                    current.back.differ();
                    break;

            }
        });
    });
}

function transfer() {
    var texts = ["OK!", "Why do you need to hand over?"];

    sendTexts(texts, function () {
        botui.action.button({
            action: [{
                text: "I don't remember / not sure",
                value: 'sure1'
            }, {
                text: "I don't know the answer at all",
                value: 'sure2'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "sure1":
                    transfer2();
                    break;
                case "sure2":
                    transfer2();
                    break;
            }
        });
    });
}

function transfer2() {
    var texts = ["To whom?"];

    sendTexts(texts, function () {
        botui.action.button({
            action: [{
                text: "LVMH collaborator",
                value: 'lvmh'
            }, {
                text: "Provider",
                value: 'provider'
            }, {
                text: "Construction Pilot",
                value: 'pilot'
            }, {
                text: "Design office",
                value: 'design'
            }, {
                text: "Maintenance company",
                value: 'maitenance'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "lvmh":
                    transfer3();
                    break;
                default:
                    transfer4();
                    break;
            }
        });
    });
}

function transfer3() {
    var texts = ["Could you spell the full name?"];

    sendTexts(texts, function () {
        botui.action.text({
            action: {
                datatype: "collaborator",
                placeholder: 'Type here'
            }
        }).then(function (res) {
            // will be called when it is submitted.


            if (collaborators.includes(res.value)) {
                // found
                user1.transfered[current.question] = true;
                transfer5();
            } else {
                // not found
                transfer4();
            }
        });
    });
}

function transfer4() {
    var texts = ["Which information could you provide to transfer?"];

    sendTexts(texts, function () {
        botui.action.button({
            action: [{ // show only one button
                text: 'e-mail address',
                value: 'email'
            }, {
                text: 'mobile number',
                value: 'mobile'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "email":
                    transfer41();
                    break;
                case "mobile":
                    transfer42();
                    break;
            }
        });
    });
}

function transfer41() {
    var texts = ["OK, let me know the e-mail address of the contact"];

    sendTexts(texts, function () {
        botui.action.text({
            action: {
                subtype: "email",
                placeholder: 'Type here'
            }
        }).then(function (res) {
            // will be called when it is submitted.
            user2.email = res.value;

            user1.transfered[current.question] = true;
            if (user1.differed) delete user1.differed[current.question];

            transfer5();
        });
    });
}

function transfer42() {
    var texts = ["OK, let me know the phone number"];

    sendTexts(texts, function () {
        botui.action.text({
            action: {
                datatype: "mobile",
                subtype: "tel",
                pattern: "^\\+[1-9]{1}[0-9]{3,14}$",
                placeholder: '+00 0000000000'

            }
        }).then(function (res) {
            // will be called when it is submitted.

            user2.mobile = res.value;

            user1.transfered[current.question] = true;
            if (user1.differed) delete user1.differed[current.question];

            transfer5();
        });
    });
}

function transfer5() {
    var texts = ["📧", "A photo to give a wink to the one who will help you?"];

    sendTexts(texts, function () {
        botui.action.photo({
            cssClass: "s1", // photo
            action: [{ // show only one button
                text: 'yes',
                value: 'yes'
            }, {
                text: 'no',
                value: 'no'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "yes":

                    exit0({ "type": 1 });
                    break;

                case "no":
                    // TODO
                    exit0({ "type": 1 });
                    break;
            }
        });
    });
}

function exit0(args) {
    var texts = [];
    switch (args.type) {
        case 1:
            texts = ["Thank you! We have no other questions for you at the moment, but I will not fail to contact you for some additional information.", "🤖"];
            break;
        case 2:
            texts = ["I understand... I will do much better next time! Thank you for this exchange.", "🤖"];

            break;
        case 3:
            texts = ["I will not fail to contact you for some additional information. See you soon.", "🤖"];
            break;
    }
    sendTexts(texts, function () {
        botui.action.button({
            cssClass: "s2",
            action: [{
                text: 'Disconnect',
                value: 'disconnect'
            }]
        }).then(function (response) {
            switch (response.value) {
                case "disconnect":
                    user1.nDisconnect++;
                    saveChanges();
                    window.location = "home.html";
                    break;

            }
        });
    });
}