const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer")
// const upload = require("express-fileupload")
const multer = require("multer")
const path = require("path");

// const upload = multer({dest: "uploads/"});


const app = express();
// app.use(fileUpload)
let names=[];
let instis =[];
let courses=[];
let durations=[];
let ids = [];
let linkeds = [];
let linkedss = [];
let files = [];
let subject = [];
let content = [];
let timings = [];
let namess=[];
let instiss =[];
let coursess=[];
let durationss=[];
let idss = [];
let pws = [];
let indexx;
let tasks = [];
let deadlines = [];
let proofs = [];
let total = 0;
let tasksDone = [];
let done=0;
let dones = [];
let compTasks = [];
let compDeadlines = [];
let compProofs = [];
let j=0;
let yourNames = [];
let yourEmails = [];
let yourPhones = [];
let yourMessages = [];

let details = {inputName: names, institution:instis, courseName:courses, courseDuration: durations, inputMail: ids, social: linkeds, resume: files};
let finaldetails = {inputName: namess, institution:instiss, courseName:coursess, courseDuration: durationss, inputMail: idss, givenPassword: pws , social: linkedss, resume: files};
let assign = {inputTask : tasks, inputDeadline : deadlines, inputProof: proofs};
let completed = {inputTask: compTasks, inputDeadline : compDeadlines, inputProof: compProofs};
let allTasks = [];
let allDeadlines = [];
let feeds = {names: yourNames , emails: yourEmails, phones: yourPhones, messages: yourMessages};


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public")
    },
    filename: (req,file, cb) =>
    {
    console.log(file);
    cb(null, j+".pdf")
    }
})

const storage2 = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public")
    },
    filename: (req,file, cb) =>
    {
    console.log(file);
    cb(null, j+".jpg")
    }
})



const upload = multer({storage:storage});
const upload2 = multer({storage:storage2});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",function(req,res){
    res.render("index", {detail: details});
    console.log("/executed");
});

app.get("/signup",function(req,res){
    res.render("signup");
});

app.get("/admin",function(req,res){
    res.render("admin", {detail: details, j:j});
    console.log(details);
});

app.get("/admin/notify", function(req,res){
    res.render("notify");
})

app.get("/admin/assign", function(req,res){
    res.render("assign");
})

app.get("/admin/info", function(req,res){
    res.render("info", {ind:indexx, detail:finaldetails, totalTasks:total, pending:(total-done)});
})

app.get("/ca", function(req,res){
    res.render("ca", {ind:indexx, detail:finaldetails, task:assign, allT:allTasks, allD:allDeadlines});
})


app.get("/ca/notifications", function(req,res){
    res.render("notifications", {subjectList: subject, contentList : content, timeList: timings});
})


app.get("/ca/previous",function(req,res){
    res.render("previous",{task : completed})
})



// app.get("/ca/account", function(req,res){
//     res.render("account", {ind:index, detail:finaldetails});
// })
// && details.inputMail.indexOf(req.body.emailId) != -1 && finaldetails.inputMail.indexOf(req.body.emailId)!=-1
app.post("/", upload.single('resumeFile'), function(req,res){
    req.body = JSON.parse(JSON.stringify(req.body));
    if(req.body.hasOwnProperty("courseDuration")){
        j++;
    let caName = req.body.name;
    let institute = req.body.institute;
    let course = req.body.course;
    let courseDurationn = req.body.courseDuration;
    let emailId = req.body.emailId;
    let linkedIn = req.body.linkedIn;
    // console.log(req.files.resumeFile);
    // let file = req.files.resumeFile;
    // console.log(req.files.resumeFile);
    // file.mv("./uploads/.", fileName, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Up[loadedfafsghg");
    //     }
    // })

    console.log(req.body);
    console.log(req.files);

    details.inputName.push(caName);
    details.institution.push(institute);
    details.courseName.push(course);
    details.courseDuration.push(courseDurationn);
    details.inputMail.push(emailId);
    details.social.push(linkedIn);
    console.log(req.body);
    // details.resume.push(file);
    console.log(details);
    res.redirect("/");
    }
    else{
        let mail = req.body.email;
        let pw = req.body.password;
    if(mail === "admin@123" && pw === "admin"){ 
    res.redirect("/admin")
    }
    let index = finaldetails.inputMail.indexOf(mail);
    if(pw===finaldetails.givenPassword[index]){
        indexx = index;
        res.render("ca", {ind:index, detail:finaldetails, task:assign,allT:allTasks, allD:allDeadlines})
    }
    }
})

app.get("/ca/account", function(req,res){
    res.render("account", {ind:indexx, detail:finaldetails, totalTasks:total, pending:(total-done)});
})


app.get("/admin/feedbacks", function(req, res){
    res.render("feedback" , {obj:feeds});
})


// app.post("/",function(req,res){
//     let mail = req.body.email;
//     let pw = req.body.password;
//     console.log(req.body.hasOwnProperty("password"))
//     if(mail === "admin@123" && pw === "admin"){ 
//     res.redirect("/admin")
//     } 
// })


// app.post("/",function(req,res){
//     let caName = req.body.name;
//     let institute = req.body.institute;
//     let course = req.body.course;
//     let courseDurationn = req.body.courseDuration;
//     let emailId = req.body.emailId;
//     let linkedIn = req.body.linkedIn;
//     let file = req.body.resumeFile;
    
//     details.inputName.push(caName);
//     details.institution.push(institute);
//     details.courseName.push(course);
//     details.courseDuration.push(courseDurationn);
//     details.inputMail.push(emailId);
//     details.social.push(linkedIn);
//     // final = req.files.file;
//     // details.resume.push(file);
//     //console.log(details)
//     console.log(req.body);
//     // console.log(req.body.hasOwnProperty("signupButton"))
//     res.redirect("/");
// })


app.post("/admin", function(req,res){
    console.log(req.body)
    let index = details.inputName.indexOf(req.body.selected);
    if(req.body.hasOwnProperty("selected")){
    finaldetails.inputName.push(details.inputName[index]);
    finaldetails.institution.push(details.institution[index]);
    finaldetails.courseName.push(details.courseName[index]);
    finaldetails.courseDuration.push(details.courseDuration[index]);
    finaldetails.inputMail.push(details.inputMail[index]);
    let pww = Math.random().toString(36).slice(2);
    finaldetails.givenPassword.push(pww);
    finaldetails.social.push(details.social[index]);
    let sendingMail = details.inputMail[index];
    
    details.inputName.splice(index,1);
    details.institution.splice(index,1);
    details.courseName.splice(index,1);
    details.courseDuration.splice(index,1);
    details.inputMail.splice(index,1);
    details.social.splice(index,1);
    // details.resume.splice(index,1);


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'velocitygroupofficial12@gmail.com',
            pass: 'vjleuhnrfvrrgtfa'
        }
    })

    var mailOptions = {
        from:'velocitygroupofficial12@gmail.com',
        to:sendingMail,
        subject:'Congratulations! You are selected for the Campus Ambassador Program',
        text:"Dear Campus Ambassador, \n We are pleased to inform you that you have been selected for the Campus Ambassador Program \n\n\n Please note your Email ID and password for the Campus Ambassador portal\n\n Email ID:"
        + sendingMail +"\n Password: "+ pww + "\n\n You will be expected to check the above portal daily and complete the pending tasks with screenshots of that particular task. A detailed orientation session explaining the working of this portal will be organised soon."
    };

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log("Email snt: " + info.response);
        }
    })
    console.log(finaldetails,pww)
}
else if(req.body.hasOwnProperty("rejected")){
    details.inputName.splice(index,1);
    details.institution.splice(index,1);
    details.courseName.splice(index,1);
    details.courseDuration.splice(index,1);
    details.inputMail.splice(index,1);
    details.social.splice(index,1);
    // details.resume.splice(index,1);
}
res.redirect("/admin")
})



app.post("/admin/notify",function(req,res){
    subject.push(req.body.inputSubject);
    content.push(req.body.inputContent);
    console.log(subject,content);
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('d-m-Y H:M');
    timings.push(formatted);
    res.redirect("/admin/notify");
})



app.post("/admin/assign", function(req,res){
    assign.inputTask.push(req.body.message);
    assign.inputDeadline.push(req.body.deadline);
    allTasks.push(req.body.message);
    allDeadlines.push(req.body.deadline);
    total = total+1;
    res.redirect("/admin/assign")
})


app.post("/ca", upload2.single('proof'), function(req,res){
    req.body = JSON.parse(JSON.stringify(req.body));
    if(req.body.hasOwnProperty("yourName")){
        feeds.names.push(req.body.yourName)
        feeds.emails.push(req.body.yourEmail)
        feeds.phones.push(req.body.yourPhone)
        feeds.messages.push(req.body.message)
        
    }
    else{
    done = done+1;
    completed.inputTask.push(assign.inputTask[req.body.submitProof]);
    completed.inputDeadline.push(assign.inputDeadline[req.body.submitProof]);
    completed.inputProof.push(req.body.proof);
    console.log(req.body);
    console.log(completed);
    assign.inputTask.splice(req.body.submitProof,1)
    assign.inputDeadline.splice(req.body.submitProof,1)
    assign.inputProof.splice(req.body.submitProof,1)
    }
    res.redirect("/ca")
})



app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
})