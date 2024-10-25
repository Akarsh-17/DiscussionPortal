// function swapUp(index) {
//   const reviews = existingArray[seletedDivId].review;
//   const currReview = reviews[index];
//   const currDiff = currReview.upVote - currReview.downVote;

//   while (index > 0) {
//     let newDiff =existingArray[seletedDivId].review[index - 1].upVote -existingArray[seletedDivId].review[index - 1].downVote;
//     if (currDiff > newDiff) {
//       let temp = reviews[index];
//       reviews[index] = reviews[index - 1];
//       reviews[index - 1] = temp;
//       index--;
//     } else break;
//   }
//   existingArray[seletedDivId].review = reviews;
//   localStorage.setItem(storageKey, JSON.stringify(existingArray));
//   const responseDiv = document.getElementById("response");
//   responseDiv.innerHTML = "";
//   reviews?.map((item, index) => {
//     showResponseDiv(item, index);
//   });
// }

//copy code


// function swapDown(index) {
//   const reviews = existingArray[seletedDivId].review;
//   const currReview = reviews[index];
//   const currDiff = currReview.upVote - currReview.downVote;

//   while (index < reviews.length - 1) {
//     console.log(index - 1);
//     console.log(index);
    
//     console.log(existingArray[seletedDivId]?.review[Number(index + 1)]);
//     let newDiff =
//       existingArray[seletedDivId].review[Number(index + 1)].upVote -
//       existingArray[seletedDivId].review[Number(index + 1)].downVote;
//     if (currDiff < newDiff) {
//       let temp = reviews[index];
//       reviews[index] = reviews[Number(index + 1)];
//       reviews[Number(index + 1)] = temp;
//       index++;
//     } else break;
//   }
//   existingArray[seletedDivId].review = reviews;
//   localStorage.setItem(storageKey, JSON.stringify(existingArray));
//   const responseDiv = document.getElementById("response");
//   responseDiv.innerHTML = "";
//   reviews?.map((item, index) => {
//     showResponseDiv(item, index);
//   });
// }