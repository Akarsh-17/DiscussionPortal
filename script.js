
const storageKey = "QuestionArray";
let seletedDivId = null;
let existingArray = JSON.parse(localStorage.getItem(storageKey)) || {};
function submitFunction(e) {
  let subject = document.getElementById("subject").value.trim();
  let question = document.getElementById("question").value.trim();
  if (!subject || !question) {
    return;
  }
  let time = new Date().getTime();
  // let time=Object.keys(existingArray).length || 0;
  // time++;  
  const creationTime=new Date();
  const questionObject = { subject, question, time ,isStared:0,creationTime};

  existingArray[time] = questionObject;

  localStorage.setItem(storageKey, JSON.stringify(existingArray));
  // console.log(JSON.parse(localStorage.getItem(storageKey)));
  display(subject, question, time,creationTime);
  document.getElementById("subject").value = "";
  document.getElementById("question").value = "";
}

function showResponseDiv(item, index) {
  const responseDiv = document.getElementById("response");
  responseDiv.style.display = "block";

  const parentDiv = document.createElement("div");
  parentDiv.style.display = "flex";

  const newDiv = document.createElement("div");
  const newDiv2 = document.createElement("div");

  newDiv.innerHTML = `<h4>${item.name}</h4><p>${item.review}</p>`;
  newDiv.style.margin = "10px 0";
  newDiv.setAttribute("id", index);
  newDiv.style.flexDirection = "row";
  newDiv.style.alignItems = "center";
  newDiv.style.justifyContent = "space-between";
  newDiv.style.padding = "10px";

  const up = document.createElement("button");
  up.innerHTML = `<img src="assets/arrow.png" width="20px" height="20px">`;

  const down = document.createElement("button");
  down.innerHTML = `<img src="assets/dowmvote.png" width="20px" height="20px">`;

  //vote
  const upVoteCount = document.createElement("span");
  upVoteCount.innerHTML = item.upVote; // Set the initial vote count
  upVoteCount.classList.add("upVote");
  upVoteCount.style.margin = "0 10px";

  const downVoteCount = document.createElement("span");
  downVoteCount.innerHTML = item.downVote; // Set the initial vote count
  downVoteCount.classList.add("downVote");
  downVoteCount.style.margin = "0 10px";

  // Optional: Add more styling to the button
  up.style.border = "none";
  up.style.background = "transparent";
  up.style.cursor = "pointer";
  up.classList.add("upvote");

  down.style.border = "none";
  down.style.background = "transparent";
  down.style.cursor = "pointer";
  down.classList.add("downvote");

  newDiv2.appendChild(up);
  newDiv2.appendChild(upVoteCount);
  newDiv2.appendChild(down);
  newDiv2.appendChild(downVoteCount);

  parentDiv.appendChild(newDiv);
  parentDiv.appendChild(newDiv2);
  parentDiv.style.borderBottom = "2px solid black";
  parentDiv.style.justifyContent = "space-between";
  parentDiv.style.alignItems = "center";

  responseDiv.appendChild(parentDiv);
}

function showQuestion() {
 
  let data = existingArray[seletedDivId];
  let ques = document.getElementById("showQuestion");
  ques.innerHTML = `<h3>${data?.subject}</h3><p>${data?.question}</p>`;

  ques.style.background = "grey";
  ques.style.padding = "5px";
  ques.style.color = "white";
  ques.style.border = "1px solid black";
  ques.style.borderRadius = "2px";

  const review = data?.review;
  const responseDiv = document.getElementById("response");
  responseDiv.innerHTML = "";
  review?.map((item, index) => {
    showResponseDiv(item, index);
  });
}

function updateTime(creationTime,timeElement)
{
   setInterval(()=>{
     const currentTime=new Date();
    // currentTime-creationTime;  will give in milliseconds
     const elapsedTime=Math.floor((currentTime-creationTime)/1000);
    //  console.log(elapsedTime)
     let timeAgoText=""

     if (elapsedTime < 60) {
        timeAgoText = ` ${elapsedTime <= 10 ? 'just now' : `${elapsedTime}s ago`}`;
      } else if (elapsedTime < 3600) {
        const minutes = Math.floor(elapsedTime / 60);
        timeAgoText = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      } else {
        const hours = Math.floor(elapsedTime / 3600);
        timeAgoText = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
      }
      timeElement.innerHTML=timeAgoText

   },1000)
}
function display(subject, question, time,creationTime) {
  let left = document.getElementById("left");

  const newDiv = document.createElement("div");

  let starSrc = existingArray[time].isStared ? 'assets/yellowStar.png' : 'assets/star.svg';
  newDiv.innerHTML = `<h3>${subject}</h3><p>${question}</p>
  <img src="${starSrc}" class="star" width="20px" height="20px" onClick="markStar('${time}',event)"
  style="position:absolute ;right : 10px;  top :50%; transform :translateY(-50%)">`;
  
  let timeElement=document.createElement("p");

  left.appendChild(newDiv);
  newDiv.setAttribute("id", time);
  newDiv.style.padding = "10px";
  newDiv.style.position = "relative";
  newDiv.style.whiteSpace="pre-wrap"
  newDiv.setAttribute("data-stared", existingArray[time].isStared);
  updateTime(creationTime,timeElement);
  newDiv.appendChild(timeElement);

  newDiv.style.gap = "2px";
  newDiv.style.borderBottom = "2px solid black";

  left.insertBefore(newDiv, left.firstChild);

  Array.from(left.children).forEach((child) => {
    let priority = child.getAttribute("data-stared") || 0;
    child.style.order = -priority; // Higher priority appears first (using negative values)
  });

}

function  markStar(id,event) {
  event.stopPropagation();
  // console.log(id)
  let change=existingArray[id].isStared;
  // console.log(change)
  let left=document.getElementById("left")
  if(change)
  {
    existingArray[id].isStared=0;
    document.getElementById(id).setAttribute("data-stared", existingArray[id].isStared); 
    localStorage.setItem(storageKey,JSON.stringify(existingArray))
    let element=document.getElementById(id).children[2]
    // console.log(element)
    
    element.setAttribute("src","assets/star.svg")
  }
  else{
    existingArray[id].isStared=1;
    document.getElementById(id).setAttribute("data-stared", existingArray[id].isStared); 
    localStorage.setItem(storageKey,JSON.stringify(existingArray))
    let element=document.getElementById(id).children[2]
    // console.log(element)
    
    element.setAttribute("src","assets/yellowStar.png")
  }

  Array.from(left.children).forEach((child) => {
    let priority = child.getAttribute("data-stared") || 0;
    child.style.order = -priority; // Higher priority appears first (using negative values)
  });
}




document.querySelector("#left").addEventListener(
  "click",
  (event) => {
    seletedDivId = event.target.closest("div").id;
    
    if (seletedDivId) {
      showQuestion();
      document.getElementById("right").style.display = "none";
      document.getElementById("reviewTab").style.display = "block";
    }
  },
  
); 
function showDisplay() {

  Object.values(existingArray).forEach((item) => {
    console.log(item.creationTime)
    const creationTime = new Date(item.creationTime);
    display(item.subject, item.question, item.time,creationTime);
  });
}


function presentSubmitTab() {
  let rev = document.getElementById("reviewTab");
  rev.style.display = "none";
  let ques = document.getElementById("right");
  ques.style.display = "block";
}

function handleRemove() {
  delete existingArray[seletedDivId];
  let div = document.getElementById(seletedDivId);
  div.remove();
  seletedDivId = null;
  localStorage.setItem(storageKey, JSON.stringify(existingArray));
  document.querySelector(".reviewTab").style.display = "none";
  document.querySelector(".right").style.display = "block";
}

function subrev() {
  let name = document.getElementById("name").value.trim();
  let review = document.getElementById("review").value.trim();
  if (!name || !review) {
    return;
  }
  const reviewObject = { name, review, upVote: 0, downVote: 0 };
  
  let existingReview = existingArray[seletedDivId].review || [];
  existingReview.push(reviewObject);

  
  existingArray[seletedDivId].review = existingReview;
  localStorage.setItem(storageKey, JSON.stringify(existingArray));
  showResponseDiv(reviewObject, existingReview.length - 1);
  document.getElementById("name").value = "";
  document.getElementById("review").value = "";
}


function swapUp(index) {
  const reviews = existingArray[seletedDivId].review;
  const currReview = reviews[index];
  const currDiff = currReview.upVote - currReview.downVote;

  while (index > 0) {
    let newDiff =existingArray[seletedDivId].review[index - 1].upVote -existingArray[seletedDivId].review[index - 1].downVote;
    if (currDiff > newDiff) {
      let temp = reviews[index];
      reviews[index] = reviews[index - 1];
      reviews[index - 1] = temp;

      let currentDiv = document.getElementById(index);
      let currentDivParent=currentDiv.parentElement
      let previousDiv = document.getElementById(index - 1);
      let previousDivParent=previousDiv.parentElement
      
      if (currentDivParent && previousDivParent) {
        previousDivParent.parentNode.insertBefore(currentDivParent, previousDivParent);
        currentDiv.id = index - 1;
        previousDiv.id = index;
      }
      index--;
    } else break;
  }
  existingArray[seletedDivId].review = reviews;
  localStorage.setItem(storageKey, JSON.stringify(existingArray));
}

function swapDown(index) {
  const reviews = existingArray[seletedDivId].review;
  const currReview = reviews[index];
  const currDiff = currReview.upVote - currReview.downVote;

  while (index < reviews.length - 1) {
    console.log(Number(index )+ 1);
    console.log(index);
    
    console.log(existingArray[seletedDivId]?.review[Number(index )+ 1]);
    let newDiff =
      existingArray[seletedDivId].review[Number(index )+ 1].upVote -
      existingArray[seletedDivId].review[Number(index )+ 1].downVote;
    if (currDiff < newDiff) {
      let temp = reviews[index];
      reviews[index] = reviews[Number(index )+ 1];
      reviews[Number(index )+ 1] = temp;

      let currentDiv = document.getElementById(index);
      let currentDivParent=currentDiv.parentElement
      let nextDiv = document.getElementById(Number(index )+ 1);
      let nextDivParent=nextDiv.parentElement

      if (currentDivParent && nextDivParent) {
        nextDivParent.parentNode.insertBefore(nextDivParent, currentDivParent);
        currentDiv.id = Number(index )+ 1
        nextDiv.id = index;
      }
      index++;
    } else break;
  }
  existingArray[seletedDivId].review = reviews;
  localStorage.setItem(storageKey, JSON.stringify(existingArray));
}


function handleVote(index, type) {

  let reviewObject = existingArray[seletedDivId].review[index];
  // console.log(reviewObject);
  reviewObject[type] = reviewObject[type] + 1;

  existingArray[seletedDivId].review[index] = reviewObject;
  localStorage.setItem(storageKey, JSON.stringify(existingArray));
  // console.log(reviewObject);
  const voteCountElement = document
    .querySelector(`#response div[id="${index}"]`)
    .nextSibling.querySelector(`.${type}`); //optimize it in single query selector
  // console.log(voteCountElement);
  voteCountElement.innerHTML = reviewObject[type];
  if (type === "upVote") {
    swapUp(index);
  } else {
    swapDown(index);
  }
}

document.querySelector(".response").addEventListener(
  "click",
  (event) => {
    selectedResponse = event.target.closest("div").previousElementSibling;
    if (selectedResponse) {
      console.log(selectedResponse.id);
      const button = event.target.closest("button");
      if (button.classList.contains("upvote")) {
        console.log("up");
        handleVote(selectedResponse.id, "upVote");
      } else if (button.classList.contains("downvote")) {
        console.log("down");
        handleVote(selectedResponse.id, "downVote");
      }
    }
  },
  true
);

document.querySelector("#search").addEventListener("input", (event) => {
  let target = event.target.value;
  target.toLowerCase();
  let container = document.querySelector("#left");
  const data = Array.from(document.querySelector("#left").childNodes);
 
  data.forEach((item, index) => {
    //imp
    if (item.nodeType === 1) {
      // Check if it's an element node (avoid text nodes) beacuse of .childNodes

      let subjectElement = item.querySelector("h3");
      let questionElement = item.querySelector("p");

      // Every time a user types a new letter in the search box, the search function is triggered again.
      //  If we don't reset the content, the already highlighted text will be processed again. This can cause the
      //   <span class="highlight"> tags to get nested inside each other or duplicated, leading to incorrect or messy output.

      subjectElement.innerHTML = subjectElement.textContent;
      questionElement.innerHTML = questionElement.textContent;
      item.style.display = "none";

      let subject = subjectElement.textContent.toLowerCase();
      let question = questionElement.textContent.toLowerCase();

      let matchPriority = 0;

      if (subject.includes(target) && question.includes(target)) {
        matchPriority = 3;
        item.style.display = "";
        subjectElement.innerHTML = highlightText(
          subjectElement.textContent,
          target
        );
        questionElement.innerHTML = highlightText(
          questionElement.textContent,
          target
        );
      } else if (subject.includes(target) && !question.includes(target)) {
        matchPriority = 2;
        item.style.display = "";
        subjectElement.innerHTML = highlightText(
          subjectElement.textContent,
          target
        );
      } else if (!subject.includes(target) && question.includes(target)) {
        matchPriority = 1;
        item.style.display = "";
        questionElement.innerHTML = highlightText(
          questionElement.textContent,
          target
        );
       
      }
      item.setAttribute("data-priority", matchPriority);
    }
  });
 
  Array.from(container.children).forEach((child) => {
    let priority = child.getAttribute("data-priority") || 0;
    child.style.order = -priority; // Higher priority appears first (using negative values)
  });
});

function highlightText(text, target) {
  let startIndex = text.indexOf(target);

  let beforeMatch = text.substring(0, startIndex);
  let match = text.substring(startIndex, startIndex + target.length);
  let afterMatch = text.substring(startIndex + target.length);

  return `${beforeMatch}<span class="highlight">${match}</span>${afterMatch}`;

  //Without the return statement, the function would not provide any result or output. The calling code would receive undefined,
  // which is not useful for updating the DOM or showing highlighted text.
}

showDisplay();
