   /* TO DO 
  Test to see if an account can be made. 
  If that works, get rid of extra console.log()
  Database stuff

  {
    id: 987242389
    subjects: []
    matches: []
  }
  */
 firstName = "";
 lastName = "";
 bio = "";
 // These vars are lists
 var users;
 var first;
 var last;
 var position;
 var subjectOne;
 var subjectTwo;
 var subjectThree;
 var profileIndex = 0;
 var uidToAdd = "placeholder";

 var firebaseConfig = {
   apiKey: "AIzaSyD-r_ONdcBNyzoFhlsCH9F83TE1NVnmBzg",
   authDomain: "tutr-ac1e8.firebaseapp.com",
   databaseURL: "https://tutr-ac1e8.firebaseio.com",
   projectId: "tutr-ac1e8",
   storageBucket: "tutr-ac1e8.appspot.com",
   messagingSenderId: "581756792555",
   appId: "1:581756792555:web:81a92e15b867c6eaaf98ae",
   measurementId: "G-GNPM5RFPC6"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();
 var database = firebase.database();
 
 /* Trying to make a list of all User Ids 
 dBRefUsers = database.ref("user");
   dBRefUsers.on("child_changed", snap => {
     console.log(snap.val().getChildren)
     

   })
   onDataChange(dataSnapshot dataSnapshot){
     for (DataSnapshot snapshot: dataSnapshot.getChildren)
   }
 })
 */
 window.onload = () => {
 initApp();
 }
 
 /* This function takes the users input into the sign up form.
 It then takes that information and sets it equal to the variables email and password. These variables are then put into a firebase function in order to create an account within the firebase project.
  */
 function signUp(){
   console.log("sign up");
   const email = document.getElementById("email").value;
   console.log(email);

   const password = document.getElementById("password").value;
   console.log(password);

   const signUpBtn = document.getElementById("signUpButton");
   console.log(signUpBtn.id);

   const auth = firebase.auth();
   const promise = auth.createUserWithEmailAndPassword(email, password);
   promise
     .then(user => console.log(user));
   promise
     .catch(e => console.log(e.message));

   window.location.replace("profile.html");
 }

 /* This function takes the users input from the login form.
 It then takes that information and sets it equal to the variables email and password. These variables are then put into a firebase function in order to log the user into their account on the firebase project.*/
 function login(){
   const email = document.getElementById("email").value;
   console.log(email);

   const password = document.getElementById("password").value;
   console.log(password);

   const loginBtn = document.getElementById("login");
   console.log(loginBtn.id);

   const auth = firebase.auth();
   const promise = auth.signInWithEmailAndPassword(email, password);
   promise 
     .then(user => console.log(user));
   promise 
     .catch(e => console.log(e.message));
 }

 /*This function uses a firebase funciton to check if a user is logged in. */
 function initApp(){
   const auth = firebase.auth();
   const promise = auth.onAuthStateChanged(user =>{
     //If this works, get rid of this console.log()
     console.log("check status");

     if(user){
       console.log("signed in");
       user.uId

     }
     else{
       console.log("not logged");
     }
   })
 }

 function setUserData(){
   firstName = document.getElementById("first").value;
   console.log("First name: " + firstName);

   lastName = document.getelementById("last").value;
   console.log("Last name: " + lastName);
   
   biography = document.getelementById("bio").value;
   console.log("Biography: " + biography);

   initApp();
 }

 function pushHardcodeData() {
   dBRefHardcode = firebase.database().ref("data").push({
     name: "Joe",
     subjects: ["math","english","science"],
     matches: ["none"],
     occupation: "tutor"
   });
    
   console.log("poppin");
 }

 function makeMatches() {
   var ref = firebase.database().ref("data");
   ref.on('value',makeMatchesHelper);
 }

 
 function makeMatchesHelper(data) {
   let matches = [];
   var allData = data.val();
   for (const user1 in allData) {
     for (const user2 in allData) {  
       if (allData[user1]["occupation"] === "Tutee" && allData[user2]["occupation"] === "Tutor") {
         if (user1 !== user2) {//iterates through all unique users
           for (const potentialMatch in allData[user1]["matches"]) {
             if (user2 === allData[user1]["matches"][potentialMatch] && Object.values(allData[user2]["matches"]).includes(user1)) {
               matches.push({
                 "Tutor": user1,
                 "Tutee": user2
               });
               console.log(user1 + "," + user2);
             }
           }  
         }
       }
       
     }
   }
   console.log(matches);
   var ref2 = firebase.database().ref("matches");
   ref2.push(matches);
   updateMyMatches();

 }
 function updateMyMatches() {
   var ref = firebase.database().ref("matches");
   ref.on('value',updateMyMatchesHelper);
   
 }
 function updateMyMatchesHelper(data){
   var allMatches = data.val();
   var messageArray = [];
   for (const id in allMatches) {
     if (allMatches[id] !== "none") {
       for (const occupation in allMatches[id][0]) {
         let message = "";
         if (occupation === "Tutee") {
           message += "Tutee is " + allMatches[id][0][occupation]+ ".";
         }
         else {
           message += "Tutor is " + allMatches[id][0][occupation] + "."
         }
         if (!messageArray.includes(message)) {
           messageArray.push(message);
         }
         console.log(messageArray)
       }
     }
   }
   document.getElementById("myMatches").innerHTML="";
   for (const message of messageArray) {
     console.log(message);
     document.getElementById("myMatches").innerHTML+=message;
   }
 }

 function nextProfile() {
   var ref = firebase.database().ref("data");
   ref.on('value',showProfile);
 }
 function showProfile(data) {
   var uidIndices= [];
   var allData = data.val();
   for (const uid in allData) {
     if (allData[uid]["occupation"] === "Tutee") {
       uidIndices.push(uid);
     }
   }
   if (uidIndices[profileIndex] == null)
    {
      document.getElementById("tuteeName").innerHTML = "No TUTEES LEFT";
    }
     else {
       document.getElementById("tuteeName").innerHTML = "Tutee: " + allData[uidIndices[profileIndex]]["name"];

       document.getElementById("uid").innerHTML = "Tutee UID: " + uidIndices[profileIndex];


       document.getElementById("tuteeBio").innerHTML = "Bio: " + allData[uidIndices[profileIndex]]["biography"];
       

       document.getElementById("tuteeSubjects").innerHTML = "Subjects: " + allData[uidIndices[profileIndex]]["subjects"];
     } 
     console.log(allData[uidIndices[profileIndex]]["name"]);
     profileIndex++;


 }
 function submitMatchTutor() {
   const tuteeUID = document.getElementById("uid").innerHTML.substring(11);
   const auth = firebase.auth();
   const promise = auth.onAuthStateChanged(user =>{
     //If this works, get rid of this console.log()
     console.log("check status");

     if(user){
       console.log("signed in");
       var ref = firebase.database().ref("data");
       firebase.database().ref("data/" + tuteeUID+"/matches").push(user.uid);

       // ref.on('value',submitMatchReq(user.uid,tuteeUID));
     }
     else{
       console.log("not logged");
     }
   })
 }

 function submitMatchTutee() {
   const tutorUID = document.getElementById("uid").innerHTML.substring(11);
   const auth = firebase.auth();
   const promise = auth.onAuthStateChanged(user =>{
     //If this works, get rid of this console.log()
     console.log("check status");

     if(user){
       console.log("signed in");
       var ref = firebase.database().ref("data");
       firebase.database().ref("data/" + tutorUID+"/matches").push(user.uid);
       console.log(firebase.database().ref("data/" + tutorUID+"/matches"));

       // ref.on('value',submitMatchReq(user.uid,tuteeUID));
     }
     else{
       console.log("not logged");
     }
   })
 }
 

 function nextProfileTutor() {
   var ref = firebase.database().ref("data");
   ref.on('value',showProfileTutor);
 }
 function showProfileTutor(data) {
   var uidIndices= [];
   var allData = data.val();
   for (const uid in allData) {
     if (allData[uid]["occupation"] === "Tutor") {
       uidIndices.push(uid);
     }
   }
   if (uidIndices[profileIndex] == null)
    {
      document.getElementById("profileName").innerHTML = "No TUTORS LEFT";
    }
   else {
       document.getElementById("profileName").innerHTML = "Tutor: " + allData[uidIndices[profileIndex]]["name"];

       document.getElementById("uid").innerHTML = "Tutee UID: " + uidIndices[profileIndex];

       document.getElementById("tutorBio").innerHTML = "Bio: " + allData[uidIndices[profileIndex]]["biography"];

       document.getElementById("tutorSubjects").innerHTML = "Subjects: " + allData[uidIndices[profileIndex]]["subjects"];

     }
     console.log(allData[uidIndices[profileIndex]]["name"]);
     profileIndex++;

 }
 function recordUid (someuid) {
   uidToAdd = someuid;
   console.log(uidToAdd);
 }
 function getUserData(){
   
   const auth = firebase.auth();
    const promise = auth.onAuthStateChanged(user =>{
     //If this works, get rid of this console.log()
     console.log("check status");
     let uidToAddHelper = "placeholder2";

     if(user){
       console.log("signed in");
       console.log("get user data")
       first = document.getElementById("firstName").value;
       last = document.getElementById("lastName").value;
       email = document.getElementById("myEmail").value;
       bio = document.getElementById("bio").value;
       status = document.getElementById("status").value;
       subjects = document.getElementById("subjects").value;
       console.log(user.uid);



       const profile = {
         name: first + " " + last,
         email: email,
         biography: bio,
         subjects: subjects,
         occupation: status,
         matches:["none"]

   };
   dBRef = firebase.database().ref("data/" + user.uid).set(profile);
   // dBRef = firebase.database().ref("data").update(profile);
       recordUid(user.uid);
     }
  

     else{
       console.log("not logged");
     }
 
   })


 }

 function swipeRight(){
   
 }
 
 function findMatches() {
   var ref = firebase.database().ref("data");
   ref.on('value', data => {
     document.getElementById("myMatches").innerHTML = data.val();
   });

   
 }
 


