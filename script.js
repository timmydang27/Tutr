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
   ref.on('value',makeMatches);
 }

 
 function makeMatches(data) {
   var allData = data.val();
   for (const user1 in allData) {
     for (const user2 in allData) {  
       if (allData[user1]["occupation"] === "Tutee" && allData[user2]["occupation"] === "Tutor") {
           console.log(user1 + "," + user2);
         if (user1 !== user2) {//iterates through all unique users
           for (const potentialMatch in allData[user1]["matches"]) {
             if (user2 === allData[user1]["matches"][potentialMatch] && allData[user2]["matches"].includes(user1)) {
               matches.push({
                 "Tutor": user1,
                 "Tutee": user2
               });
             }
           }  
         }
       }
       
     }
   }
   console.log(matches);
   var ref2 = firebase.database().ref("matches");
   ref2.push(matches);

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

       document.getElementById("tuteeBio").innerHTML = "Bio: " + allData[uidIndices[profileIndex]]["biography"];
       

       document.getElementById("tuteeSubjects").innerHTML = "Subjects: " + allData[uidIndices[profileIndex]]["subjects"];
     } 
     console.log(allData[uidIndices[profileIndex]]["name"]);
     profileIndex++;


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

       document.getElementById("tutorBio").innerHTML = "Bio: " + allData[uidIndices[profileIndex]]["biography"];

       document.getElementById("tutorSubjects").innerHTML = "Subjects: " + allData[uidIndices[profileIndex]]["subjects"];

     }
     console.log(allData[uidIndices[profileIndex]]["name"]);
     profileIndex++;

 }

 function getUserData(){
   let uidToAdd;
   const auth = firebase.auth();
    const promise = auth.onAuthStateChanged(user =>{
     //If this works, get rid of this console.log()
     console.log("check status");

     if(user){
       console.log("signed in");
       console.log(user.uid);
       uidToAdd(user.uid);

     }
     else{
       console.log("not logged");
     }
   })
   console.log("get user data")
   first = document.getElementById("firstName").value;
   last = document.getElementById("lastName").value;
   email = document.getElementById("myEmail").value;
   bio = document.getElementById("bio").value;
   status = document.getElementById("status").value;
   subjects = document.getElementById("subjects").value;

   dBRef = firebase.database().ref("data").push({
     name: first + " " + last,
     email: email,
     biography: bio,
     subjects: subjects,
     occupation: status
   });
 }

 function swipeRight(){
   
 }
 
 function findMatches() {
   var ref = firebase.database().ref("data");
   ref.on('value', data => {
     document.getElementById("myMatches").innerHTML = data.val();
   });

   
 }
 

