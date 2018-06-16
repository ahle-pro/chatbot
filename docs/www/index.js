var botui = new BotUI('my-botui-app');

var user1 = { 
    firstname: "",
    password: "lvmh2020",
    location: "Rome",    
    nDisconnect: 0,
    nConnect: 0,
    taskDone: false
};

var user2 = {
    firstname: "John",
    lastname: "Fender",
    url: "https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/user2.jpg"
}

var bot = {
    designer: "https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/team.png",
}

var current = {back: "", stack: []};
var passed = {};

// start
function start(){
    let params = (new URL(document.location)).searchParams;
    let mode = params.get("mode");

    if(mode=="init"){
        init();
    }
    else{
        connection();
    }

}
start();

var lvmh = {};
lvmh.handle_action_button = function(button){
    if(current.waitingPassword){
        
    }
    
    return true;
}

lvmh.handle_action_text = function(action){
    
    if(current.waitingPassword){
        var password = action.text.value;
        action.text.value = "•".repeat(password.length);
        current.waitingPassword = false;
        current.password = password;
    }
    return true;
}

lvmh.handle_action_select = function(action, labels){
    if(labels && labels.length==0){
        labels = ["..."];
    }
    
    return true;
}

function addImage(opts){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            $(`<div class="botui-message">
                <div class="botui-message-content image ${opts.cssClass}"><img class="botui-message-content-image" src="${opts.url}" /></div>
            </div>`).hide().appendTo("div.botui-messages-container").fadeIn(500);
            resolve();
        }, 1000);
    });
}

function saveChanges(){
    let storage = localStorage;

    storage.setItem("user1", JSON.stringify(user1));
    storage.setItem("user2", JSON.stringify(user2));
    storage.setItem("bot", JSON.stringify(bot));
    
    console.log("saved!");
}

function load(){
    let storage = localStorage;
    
    user1 = JSON.parse(storage.getItem("user1"));
    user2 = JSON.parse(storage.getItem("user2"));
    bot = JSON.parse(storage.getItem("bot"));
}

function reset(){
   localStorage.clear();
}

function setDefault(){
    user1.password = "lvmh2020";
    user1.location = "Rome";
    
    user2.firstname = "John";
    user2.lastname = "Fender",
    user2.url = "https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/user2.jpg";
    
    bot.designer = "https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/team.png";

    saveChanges();
}

function init(){
    let data = localStorage.getItem("user1");
    if(!data){
        init1();
    }
    else{
        init2();
    }
}

function init2(){
    let texts = ["Start demo with default values?"];
    
    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function(){
        return botui.action.button({
            action: [
                {
                    text: 'yes',
                    value: 'yes'
                },
                {
                    text: 'no, change values',
                    value: 'no'
                },
                {
                    text: 'no, reset',
                    value: 'reset'
                }
            ]
            });
    }).then(function(response){
        switch(response.value){
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
        }
    });
}

function init1(){
    let text = "The first name of the recipient...";
    
    botui.message.add({
        delay: 1000,
        loading: true,
        content: text
    }).then(function(){
        return botui.action.text({
            action: {
                placeholder: 'Enter the name here'
            }
        });
    }).then(function (res) { // will be called when it is submitted.
        let resValue = res.value;

        user1.firstname=resValue;

        init2();
    });
}

function init3(){
    let texts = ["Bot initialization: please enter values ​​for this demo", "His or her location in Italy (city)"];
    
    sendTexts(texts, function(){
        botui.action.text({
            action: {
                placeholder: 'Enter the location'
            }
        }).then(function (res) { // will be called when it is submitted.
            let resValue = res.value;

            user1.location=resValue;

            let texts1 = ["The first name of one of his collaborators..."];

            botui.message.add({
                delay: 1000,
                loading: true,
                content: texts1[0]
            }).then(function(){
                return botui.action.text({
                    action: {
                        placeholder: 'Enter the first name'
                    }
                });
            }).then(function(res){
                let resValue = res.value;

                user2.firstname=resValue;

                return botui.message.add({
                    delay: 1000,
                    loading: true,
                    content: "The last name of this collaborator please…"
                });
            })
            .then(function(){
                return botui.action.text({
                    action: {
                        placeholder: 'Enter the last name'
                    }
                });
            })
            .then(function(res){
                let resValue = res.value;
                user2.lastname=resValue;
                
                return botui.message.add({
                    delay: 1000,
                    loading: true,
                    content: "And a picture of this collaborator…"
                });
            })
            .then(function(res){                
                return botui.action.photo({
                    cssClass: "s1",// photo
                    action: [
                        { // show only one button
                            text: 'yes',
                            value: 'yes'
                        },
                        {
                            text: 'no',
                            value: 'no'
                        }
                    ]
                });
            })
            .then(function(response){                
                switch(response.value){
                    case "yes":  
                        user2.url = response.url;
                        break;
                        
                    case "no":// TODO
                        break;
                }
                return botui.message.add({
                    delay: 1000,
                    loading: true,
                    content: "And to finish a small photo of the team of designers"
                });
            })
            .then(function(res){                
                return botui.action.photo({
                    cssClass: "s1",// photo
                    action: [
                        { // show only one button
                            text: 'yes',
                            value: 'yes'
                        },
                        {
                            text: 'no',
                            value: 'no'
                        }
                    ]
                });
            })
            .then(function(response){
                switch(response.value){
                    case "yes":  
                        bot.designer = response.url;
                        break;
                        
                    case "no":// TODO
                        break;
                }                
                saveChanges();
                window.location = "home.html";
            });
        });
    });
}

function init4(){
    let texts = ["Start demo with updated values?"];
    
    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                    text: 'yes',
                    value: 'yes'
                },
                { // show onlyesy one button
                    text: 'no, change values',
                    value: 'no'
                }
            ]
            });
    }).then(function(response){
        switch(response.value){
            case "yes":
                connection();
                break;
            case "no":
                init3();
                break;
        }
    });
}

function connection(){
    load();
    user1.nConnect++;

    let firstRun = user1.nConnect == 1;

    if(firstRun){
        connection1();// TODO
    }
    else{
        
        if(user1.taskDone){
            connection3();
        }
        else{
            connection2();
        }
    }
    
}

function connection1(){
    let texts = [`Hello ${user1.firstname},`, 'Happy to be able to exchange with you a few moments.', `According to my information, you are a Store Planner for Italy, with Emilia Prescci.`];
    sendTexts(texts, function(){
        botui.action.button({
            action: [
                {
                    text: 'confirm',
                    value: 'confirm'
                },
                {
                    text: 'revise',
                    value: 'revise'
                }
            ]
        }).then(function(response){
            if(response.value=="confirm"){
                check2();
            }
        });
    });
   
}

function connection2(){
    let texts = [`Welcome back ${user1.firstname},`,`Please enter your password`];
    sendTexts(texts, ()=>{
        current.waitingPassword = true;
        return botui.action.text({
            action: {
                placeholder: 'Enter your password'
            }
        }).then(function(response){
            if(current.password==user1.password){
                intro();
            }
            else{
                check2();
            }
        });
    });
        
}

function connection3(){
    let texts = [`Good news! The remaining points around Rome Etoile store were handled by ${user2.firstname} ${user2.lastname}!`,`No more delayed questions`,`👑`];
    sendTexts(texts, function(){
        return botui.action.button({
            action: [
                { // show only one button
                text: 'Disconnect',
                value: 'disconnect'
                }
            ]
        }).then(function(response){
            if(response.value=="disconnect"){
                exit0({type: 3});
            }
        });
    });        
}

function check2(){
    let text = "For security reasons, can you enter your geographical location?";
    
    botui.message.add({
        delay: 1000,
        loading: true,
        content: text
    }).then(function(){        
        return botui.action.text({
            action: {
                placeholder: 'Enter your location here'
            }
        });
    }).then(function (res) { // will be called when it is submitted.
        console.log(res.value); // will print whatever was typed in the field.

        if(res.value==user1.location){
            check5();
        }
        else{
            check3();
        }
    });
}

function check3(){
    let texts = ["Sorry, but the location saved for you does not match.","Try a second time"];
    
    sendTexts(texts, function(){
        botui.action.text({
            action: {
                placeholder: 'Enter your location here'
            }
        })
        .then(function (res) { // will be called when it is submitted.
            console.log(res.value); // will print whatever was typed in the field.

            if(res.value==user1.location){
                check5();
            }
            else{
                check4();
            }
        });
    });
}

function check4(){
    let texts = ["I advise you to contact the assistance."];
    
    sendTexts(texts, function(){
        botui.action.button({
            action: [
                { // show only one button
                    text: '💁Assistance',
                    value: 'assistance'
                }
            ]
        })
            .then(function (response) {
                if (response.value == "assistance") {
                    current.back = function(){
                        exit0({type: 3});
                    };
                    assistance();
                }
            });
    });
}

function check5(){
    let texts = ["Thank you for this confirmation! Please enter a password to save time on your next connections"];

    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts.join("<br/>")
    }).then(function(){
        current.waitingPassword = true;
        return botui.action.text({
            action: {
                placeholder: 'Enter your password'
            }
        });
    }).then(function (res) { // will be called when it is submitted.
        user1.password = current.password;
        saveChanges();

        intro();
    });
}
        
function intro(){
    let texts = [`Your contact was sent to us directly by Emilia Prescci, but also by ${user2.firstname} ${user2.lastname} who works with you.`];
    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts.join("<br/>")
    }).then(function(){
        return addImage({url: user2.url});
    }).then(function (res) { // will be called when it is submitted.
        let texts1 = [`For my part, I am a bot at your service, as the team who designed me and who can exchange with you if you need assistance.`];
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: texts1.join("<br/>")
        });
    }).then(function(){
        return addImage({url: bot.designer});
    }).then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                text: 'continue',
                value: 'continue'
                }
            ]
            });
    }).then(function(response){
        if(response.value=="continue"){
            store1_1();
        }
    });
}

function store1_1(){
    let texts = [`You are currently in charge of LVMH Rome Etoile store, right?`];
    sendTexts(texts, ()=>{
        botui.action.button({
            action: [
                { 
                    text: 'yes',
                    value: 'yes'
                },
                { 
                    text: 'no, but I know the right person',
                    value: 'no1'
                },
                {
                    text: 'no, and I don\'t know the right person',
                    value: 'no2'
                }
            ]
            })
        .then(function(response){
            switch(response.value){
                case "yes":
                    store1_3();
                    break;
                case "no1":
                    store1_2();
                    break;
                case "no2":
                    store1_2();
                    break;
            }
        });
    });
}

function store1_3(){
    let nPoints = 5;
    if(passed.store14) nPoints = 4;
    let texts = ["Nice!",`Together, we have to investigate ${nPoints} points of the checklist that have not been covered yet.`];
    let choices = [
        {
            text: `list the ${nPoints} points pending`,
            value: 'list'
        },
        {
            text: 'start randomly',
            value: 'startRandom'
        }
    ];

    sendTexts(texts, ()=>{
        botui.action.button({
            action: choices
        }).then(function(response){
            switch(response.value){
                case "list":
                    store1_4();
                    break;
                case "startRandom":
                    Math.random() > 0.25 ? no6(): not6();
                    break;
            }
        });
    });
}

function store1_4(){
    let texts = ["I am very strong as a robot to recall lists 😉","Which point do you wish to address?"];
    let choices = [
        {
            text: '1 Code of Conduct',
            value: '1'
        },
        {
            text: '4 Air tightness',
            value: '4'
        },
        {
            text: '6 Sensors and Timers',
            value: '6'
        },
        {
            text: '7 Energy management',
            value: '7'
        },
        {
            text: '8 Materials and eco-design',
            value: '8'
        }
    ];

    if(passed.store14){
        texts = [texts[0]];
        choices.shift();// remove code of conduct
    }

    sendTexts(texts, ()=>{
        passed.store14 = true;
        botui.action.button({
            action: choices
        })
        .then(function(response){
            switch(response.value){
                case "6":
                    no6();
                    break;
                default:
                    not6();
                    break;
            }
        });
    });
}

function no6(){    

    let texts = ["A good part of the effort on power consumption comes from the limitation of the usage that can be planned, programed, or organized.",
        "I know it as a robot, because you can interrupt me at any time.",
        "😬"];
    let choices = [];
    
    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    })
    .then(function(){
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: texts[1]+texts[2]
        })
    })    
    .then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                    text: 'stop this bot',
                    value: 'stop'
                },
                { // show only one button
                    text: 'continue',
                    value: 'continue'
                },
                { // show only one button
                    text: '...',
                    value: '...'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "stop":
                exit0({type: 2});
                break;
            case "continue":
                no6_2();
                break;
            case "...":
                not6();
                break;
        }
    });
}

function no6_2(){
    let texts = ["Thank you for keeping me in service!",
        "We have to check where are the existing sensors (light or presence)"];
    let choices = [];

    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function(){
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: texts[1]
        });
    }).then(function(){
        current.back = no6_2;
        return botui.action.form({
            action: {
                placeholder : "I know, they are ...",
                value: '', 
                multipleselect : true, // Default: false
                options : [
                    {value: "backHouse", text : "in the back of house" },
                    {value: "circulations", text : "in circulations" },
                    {value: "windows", text : "in the windows" }
                ],
                button: {
                    icon: 'check',
                    label: 'validate'
                },
                readmore: "readmore",
                differ: "differ",
                transfer: "transfer",
                assistance: "assistance"
            },
        });
    }).then(function(response){
        switch(response.button){    
            case 'validate':
                no6_3();
                break;
            case 'readmore':
                readmore();
                break;
            case 'transfer':
                transfer();
                break;
            case 'differ':
                differ();
                break;
            case 'assistance':
                assistance();
                break;
        }
    });
}

function no6_3(){
    let texts = ["👍","Do you need to take a picture of this?"];
    let choices = [];

    sendTexts(texts, ()=>{
        current.back = no6_3;

        botui.action.button({
            cssClass: "s1",
            action: [
                { // show only one button
                    text: 'yes',
                    value: 'yes'
                },
                {
                    text: 'no',
                    value: 'no'
                }
            ]
        }).then(function(response){
            switch(response.value){
                case "yes":
                    addImage({url: "images/store161.png", cssClass: "human"}).then(function(){
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

function no6_4(){
    let texts = ["OK! Let's continue with planning and programing",
        "Is there are some timers to program the extinction of the store?"];
    let choices = [];

    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function(){
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: texts[1]
        });
    }).then(function(){
        current.back = no6_4;
        return botui.action.form({
            action: {
                placeholder : "I know, they are ...",
                value: '', 
                multipleselect : true, // Default: false
                options : [
                    {value: "openingHours", text : "yes, for opening hours" },
                    {value: "night", text : "yes, for the night (security cameras)" },
                    {value: "service", text : "yes, for service (cleaning, preparation)" }
                ],
                button: {
                    icon: 'check',
                    label: 'validate'
                },
                readmore: "readmore",
                differ: "differ",
                transfer: "transfer",
                assistance: "assistance"
            },
        });
    }).then(function(response){
        switch(response.button){            
            case 'validate':
                no6_5();
                break;
            case 'readmore':
                readmore();
                break;
            case 'transfer':
                transfer();
                break;
            case 'differ':
                differ();
                break;
            case 'assistance':
                assistance();
                break;
        }
    });
}

function no6_5(){
    let texts = ["👍","Do you need to take a picture of this?"];
    let choices = [];

    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function(){
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: texts[1]
        });
    }).then(function(){
        return botui.action.button({
            cssClass: "s1",
            action: [
                { // show only one button
                    text: 'yes',
                    value: 'yes'
                },
                {
                    text: 'no',
                    value: 'no'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "yes":
                addImage({url: "images/store162.jpg", cssClass: "human"}).then(function(){
                    exit0({"type": 1});
                });
                break;
                break;
            case "no":
                exit0({"type": 1});
                break;
            case 'differ':
                differ();
                break;
        }
    });
}

function not6(){
    let texts = [`Sorry, I'm a poor lonesome bot, not yet programed to deepen these points on which I ask you yet!`,"😅","Please try point No.6"];
    let choices = [
        {
            text: 'Try to complain to the designers',
            value: 'complain'
        },
        {
            text: 'OK, go back to the list',
            value: 'back'
        }
    ];
    if(passed.not6){
        texts = [texts[2]];
        choices = [choices[1]];
    }

    sendTexts(texts,()=>{
        passed.not6 = true;
        botui.action.button({
            action: choices
        })
        .then(function(response){
            switch(response.value){
                case "complain":
                    current.stack.push("store1_4");
                    answerAnyway();
                    break;
                case "back":
                    store1_4();
                    break;
            }
        });
    });
}

function answerAnyway(){
    let texts = [`Sorry, not ready for this task yet.`,"Keep in mind that I am a prototype", "🐣"];    
    let choices = [
        {
            text: 'Try to insure against designers',
            value: 'insure'
        }
        ,{
            text: 'go back',
            value: 'back'
        }
    ];
    if(passed.answerAnyway){
        choices = [texts[1]];
    }

    sendTexts(texts, function(){
        passed.answerAnyway=true;
        botui.action.button({
            action: choices
        }).then(function (response) {
            switch (response.value) {
                case "back":
                    current.stack.pop()();
                    break;

            }
        });
    });
}

function sendTexts(texts, cb){
    if(texts.length == 0) {
        cb();
        return;
    }
    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function(){
        texts.splice(0,1);
        sendTexts(texts, cb);
    });
}

function assistance(){
    let texts = ["I'll be the most zealous bot, in connection with a human team.", "We will be able to detail the questions and answers.","But for now, I'm not willing to help.","😇"];
    if(passed.assistance){
        texts = ["Remember... No help at the moment.","😇"];
    }

    sendTexts(texts, function(){
        passed.assistance = true;
        botui.action.button({
            action: [
                {
                    text: 'OK, go back',
                    value: 'back'
                }
            ]
        }).then(function (response) {
            switch (response.value) {
                case "back":
                    current.back();
                    break;

            }
        });
    });
}

function readmore(){
    let texts = ["No read more for now", "🐣"];

    sendTexts(texts, function(){
        botui.action.button({
            action: [
                {
                    text: 'go back',
                    value: 'back'
                }
            ]
        }).then(function (response) {
            switch (response.value) {
                case "back":
                    debugger;
                    current.back();
                    break;

            }
        });
    });
}

function differ(){
    let texts = ["You'll have to postpone the idea for this demo!", "⏲️"];

    sendTexts(texts, function(){
        botui.action.button({
            action: [
                {
                    text: 'go back',
                    value: 'back'
                }
            ]
        }).then(function (response) {
            switch (response.value) {
                case "back":
                    current.back();
                    break;

            }
        });
    });
}

function transfer(){
    let texts = ["OK!", "Why do you need to hand over?"];

    sendTexts(texts, function(){
        botui.action.button({
            action: [
                {
                    text: `I don't remember / not sure`,
                    value: 'sure1'
                },
                {
                    text: `I don't know the answer at all`,
                    value: 'sure2'
                }
            ]
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

function transfer2(){
    let texts = ["To whom?"];

    sendTexts(texts, function(){
        botui.action.button({
            action: [
                {
                    text: `LVMH collaborator`,
                    value: 'lvmh'
                },
                {
                    text: `Provider`,
                    value: 'provider'
                },
                {
                    text: `Construction Pilot`,
                    value: 'pilot'
                },
                {
                    text: `Design office`,
                    value: 'design'
                },
                {
                    text: `Maintenance company`,
                    value: 'maitenance'
                }
            ]
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

function transfer3(){
    let texts = ["Could you spell the full name?"];

    sendTexts(texts, function(){
        botui.action.text({
            action: {
                placeholder: 'Enter the fullname here'
            }
        }).then(function (res) { // will be called when it is submitted.
            console.log(res.value); // will print whatever was typed in the field.
    
            if(res.value=="Alain"){// found
                transfer5();
            }
            else{// not found
    
            }
        });
    });
}

function transfer4(){
    let texts = ["Which information could you provide to transfer?"];

    sendTexts(texts, function(){
        botui.action.button({
            action: [
                { // show only one button
                    text: 'yes',
                    value: 'yes'
                },
                {
                    text: 'confirm',
                    value: 'confirm'
                },
                {
                    text: '...',
                    value: '...'
                }
            ]
        }).then(function(response){
            switch(response.value){
                case "confirm":
                    transfer5();
                    break;
                case "...":// TODO
                    exit0({"type": 1});
                    break;
            }
        });
    });
}

function transfer5(){
    let texts = ["📧", "A photo to give a wink to the one who will help you?"];

    sendTexts(texts, function(){
        botui.action.photo({
            cssClass: "s1",// photo
            action: [
                { // show only one button
                    text: 'yes',
                    value: 'yes'
                },
                {
                    text: 'no',
                    value: 'no'
                }
            ]
        }).then(function(response){
            switch(response.value){
                case "yes":  
                    
                    exit0({"type": 1});
                    break;
                    
                case "no":// TODO
                    exit0({"type": 1});
                    break;
            }
        });
    });
}


function exit0(args){
    let texts = [];
    switch(args.type){
        case 1:
            user1.taskDone = true;
            texts = ["Thank you! We have no other questions for you at the moment, but I will not fail to contact you for some additional information.", "🤖"];
            break;
        case 2:
            texts = ["I understand... I will do much better next time! Thank you for this exchange.","🤖"];

            break;
        case 3:
            texts = ["I will not fail to contact you for some additional information. See you soon.", "🤖"];
            break;
    }
    sendTexts(texts, function(){
        botui.action.button({
            action: [
                {
                    text: 'Disconnect',
                    value: 'disconnect'
                }
            ]
        })
        .then(function(response){
            switch(response.value){
                case "disconnect":
                    user1.nDisconnect++;
                    saveChanges();
                    window.location = "home.html";                              
                    break;
                
            }        
        });
    });
}


