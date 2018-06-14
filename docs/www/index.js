var botui = new BotUI('my-botui-app');

var firstname2 = "John";
var lastname2 = "Fender";
var firstname1 = "you";
var locationUser1OK = "Rome";
var firstRun = true;
var current = {};
var passwordUser1OK = "lvmh2020";
var taskDone = false;

var lvmh = {};
lvmh.handle_action_button = function(button){
    if(current.waitingPassword){
        
    }
    
    return true;
}

lvmh.handle_action_text = function(action){
    
    if(current.waitingPassword){
        var password = action.text.value;
        action.text.value = "*".repeat(password.length);
        current.waitingPassword = false;
        current.password = password;
    }
    return true;
}

init();

function init(){
    if(firstRun){
        init1();
    }
    else{
        init2();
    }
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

        firstname1=resValue;

        init2();
    });
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

function init3(){
    let texts = ["Bot initialization: please enter values ​​for this demo", "His or her location in Italy (city)"];
    
    sendTexts(texts, function(){
        botui.action.text({
            action: {
                placeholder: 'Enter the location'
            }
        }).then(function (res) { // will be called when it is submitted.
            let resValue = res.value;

            locationUser1OK=resValue;

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

                firstname2=resValue;

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

                lastname2=resValue;

                return botui.message.add({
                    delay: 1000,
                    loading: true,
                    content: "And a picture of this collaborator…"
                });
            })
            .then(function(res){
                document.getElementById("myFile").onchange = function(){
                    botui.message.add({
                        delay: 1000,
                        loading: true,
                        content: `![user2](https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/user2.jpg)`
                    });
                };
            })
            .then(function(){
                
                return botui.message.add({
                    delay: 1000,
                    loading: true,
                    content: "And to finish a small photo of the team of designers"
                });
            })
            .then(function(res){
                document.getElementById("myFile").onchange = function(){
                    botui.message.add({
                        delay: 1000,
                        loading: true,
                        content: `![team](https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/team.png)`
                    }).then(function(){
                        init4();
                    });
                    
                };
            })
            
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
    if(firstRun){
        connection1();// TODO
    }
    else{
        if(taskDone){
            connection3();
        }
        else{
            connection2();
        }
    }    
}

function connection1(){
    var a = botui.message.add({
        delay: 1000,
        content: `Hello ${firstname1},`
    }).then(function(){
        console.log("done");
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: 'Happy to be able to exchange with you a few moments.'
        });
    }).then(function(){            
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: `According to my information, you are a Store Planner for Italy, with Emilia Prescci.`
        });
    }).then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                text: 'Confirm',
                value: 'confirm'
                },
                { // show only one button
                text: 'Revise',
                value: 'revise'
                }
            ]
            });
    }).then(function(response){
        if(response.value=="confirm"){
            check2();
        }
    });
}

function connection2(){
    var a = botui.message.add({
        delay: 1000,
        content: `Welcome back ${firstname1},`
    })
    .then(function(){
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: `Please enter your password`
        });
    })
    .then(function(){
        current.waitingPassword = true;
        return botui.action.text({
            action: {
                placeholder: 'Enter your password'
            }
        });
    }).then(function(response){        

        if(current.password==passwordUser1OK){
            intro();
        }
        else{
            check2();
        }
    });
}

function connection3(){
    var a = botui.message.add({
        delay: 1000,
        content: 'Hello,'
    }).then(function(){
        console.log("done");
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: 'Happy to be able to exchange with you a few moments.'
        });
    }).then(function(){            
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: `According to my information, you are a Store Planner for Italy, with Emilia Prescci.`
        });
    }).then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                text: 'Confirm',
                value: 'confirm'
                },
                { // show only one button
                text: 'Revise',
                value: 'revise'
                }
            ]
            });
    }).then(function(response){
        if(response.value=="confirm"){
            check2();
        }
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

        if(res.value=="Rome"){
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

            if(res.value=="Rome"){
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
                placeholder: 'Enter your password here'
            }
        });
    }).then(function (res) { // will be called when it is submitted.
        console.log(res.value); // will print whatever was typed in the field.

        intro();
    });
}
        
function intro(){
    let texts = [`Your contact was sent to us directly by Emilia Prescci, but also by ${firstname2} ${lastname2} who works with you.`];
    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts.join("<br/>")
    }).then(function(){
        return botui.message.add({
            delay: 1000,
            loading: true,
            type: "markdown",
            content: `![user2](https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/user2.jpg)`
        });
    }).then(function (res) { // will be called when it is submitted.
        let texts1 = [`For my part, I am a bot at your service, as the team who designed me and who can exchange with you if you need assistance.`];
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: texts1.join("<br/>")
        });
    }).then(function(){
        return botui.message.add({
            delay: 1000,
            loading: true,
            type: "text",
            content: `![team](https://raw.githubusercontent.com/ahle-pro/sbt-bot/master/docs/www/images/team.png)`
        });
    }).then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                text: 'Continue',
                value: 'continue'
                },
                { // show only one button
                text: 'Readmore',
                value: 'readmore'
                }
            ]
            });
    }).then(function(response){
        if(response.value=="continue"){
            store1_1();
        }
        else{

        }
    });
}

function store1_1(){
    let texts = [`You are currently in charge of LVMH Rome Etoile store, right?`];
    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts.join("<br/>")
    }).then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                text: 'yes',
                value: 'yes'
                },
                { // show only one button
                text: 'no, but I know the right person',
                value: 'no1'
                },
                { // show only one button
                text: 'no, and I don\'t know the right person',
                value: 'no2'
                }
            ]
            });
    }).then(function(response){
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
}

function store1_3(){
    let texts = ["Nice!","Together, we have to investigate 5 points of the checklist that have not been covered yet."];

    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts.join("<br/>")
    }).then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                text: 'list the 5 points pending',
                value: 'list5'
                },
                { // show only one button
                text: 'start randomly',
                value: 'startRandom'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "list5":
                store1_4();
                break;
            case "startRandom":
                store1_2();
                break;
        }
    });
}

function store1_4(){
    let texts = ["Nice!","Which point do you wish to address?"];
    let choices = [];

    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                    text: '1 Code of Conduct',
                    value: '1'
                },
                { // show only one button
                    text: '4 Air tightness',
                    value: '4'
                },
                { // show only one button
                    text: '6 Sensors and Timers',
                    value: '6'
                },
                { // show only one button
                    text: '7 Energy management',
                    value: '7'
                },
                { // show only one button
                    text: '8 Materials and eco-design',
                    value: '8'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "6":
                no6();
                break;
            default:
                not6();
                break;
        }
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
                no6();
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
        return botui.action.button({
            action: [
                { // show only one button
                    text: 'in the back of house',
                    value: 'backHouse'
                },
                { // show only one button
                    text: 'in circulations',
                    value: 'circulations'
                },
                {
                    text: 'in the windows',
                    value: 'windows'
                },
                { // show only one button
                    text: 'validate',
                    value: 'validate'
                },
                {
                    text: '...',
                    value: '...'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "backHouse":
                no6_2();
                break;
            case "circulations":
                no6_2();
                break;
            case 'windows':
                no6_2();
                break;
            case 'validate':
                no6_3();
                break;
        }
    });
}

function no6_3(){
    let texts = ["👍","Do you need to take a picture of this?",
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
        return botui.action.button({
            action: [
                { // show only one button
                    text: 'yes',
                    value: 'yes'
                },
                {
                    text: 'no',
                    value: 'no'
                },
                {
                    text: 'differ this photo',
                    value: 'differ'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "yes":
                no6_2();
                break;
            case "no":
                no6_4();
                break;
            case 'differ':
                no6_2();
                break;
        }
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
        return botui.action.button({
            action: [
                { // show only one button
                    text: 'yes, for opening hours',
                    value: '1'
                },
                { // show only one button
                    text: 'yes, for the night (security cameras)',
                    value: '2'
                },
                {
                    text: 'yes, for service (cleaning, preparation)',
                    value: '3'
                },
                { // show only one button
                    text: 'validate',
                    value: 'validate'
                },
                {
                    text: '...',
                    value: '...'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "1":
                no6_4();
                break;
            case "2":
                no6_4();
                break;
            case '3':
                no6_4();
                break;
            case 'validate':
                no6_5();
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
            action: [
                { // show only one button
                    text: 'yes',
                    value: 'yes'
                },
                {
                    text: 'no',
                    value: 'no'
                },
                {
                    text: 'differ this photo',
                    value: 'differ'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "yes":
                
                break;
            case "no":
                exit0({"type": 1});
                break;
            case 'differ':
                no6_2();
                break;
        }

    });
}

function not6(){
    let texts = ["Please try point No.6"];

    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function(){
        return botui.action.button({
            action: [
                { // show only one button
                    text: 'Try to complain to the designers',
                    value: 'complain'
                },
                { // show only one button
                    text: 'OK, go back to the list',
                    value: 'back'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "complain":
                no6();
                break;
            case "back":
                store1_4();
                break;
        }
    });
}

function answerAnyway(){
    let texts = ["Keep in mind that I am a prototype", "🐣"];

    sendTexts(texts, function(){
        botui.action.button({
            action: [
                {
                    text: 'Try to insure against designers',
                    value: 'insure'
                }
                ,{
                    text: 'go back',
                    value: 'back'
                }
            ]
        }).then(function (response) {
            switch (response.value) {
                case "back":
                    
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
    let texts2 = ["Remember... No help at the moment.","😇"];


    sendTexts(texts, function(){
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
        botui.action.button({
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
            texts = ["Thank you! We have no other questions for you at the moment, but I will not fail to contact you for some additional information.", "🤖"];            
            break;
        case 2:
            texts = ["I understand... I will do much better next time! Thank you for this exchange.","🤖"];

            break;
        case 3:
            texts = ["I will not fail to contact you for some additional information. See you soon.", "🤖"];
            break;
    }
    botui.message.add({
        delay: 1000,
        loading: true,
        content: texts[0]
    }).then(function(){
        return  botui.message.add({
                delay: 1000,
                loading: true,
                content: texts[1]
            });
    }).then(function(){
        return botui.action.button({
            action: [
                {
                    text: 'Disconnect',
                    value: 'disconnect'
                }
            ]
        });
    }).then(function(response){
        switch(response.value){
            case "disconnect":                
                break;
            
        }        
    });
}


var observer = new MutationObserver(function(e){
    //debugger;
});
var config = {
    attributes: true,
    childList: true,
    characterData: true
};
observer.observe(document.getElementsByClassName("botui-messages-container")[0], config);



