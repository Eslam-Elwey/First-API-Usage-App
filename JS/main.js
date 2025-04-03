//create instance of Reuest

var requestPosts = new XMLHttpRequest();
var requestComments = new XMLHttpRequest();
const urlbase = "https://jsonplaceholder.typicode.com/";

function sendRequestTOAPI(request, endpoint, method) {
  let wholeURL = "".concat(urlbase);
  wholeURL = wholeURL.concat(endpoint);

  //Init Phase => open Connection with  url
  request.open(method, wholeURL);

  //send Request To URL
  request.send();

  //add event listner readystatechange to request to trace chang
  //when reaches 4 display data
  request.addEventListener("readystatechange", function () {
    console.log("state = ", request.readyState);
    if (
      request.readyState === 4 &&
      request.status >= 200 &&
      request.status < 300
    ) {
      var returnedData = JSON.parse(request.response);

      if (endpoint === "posts") {
        allPosts = returnedData;
        displayAllPosts();
      } else if (endpoint === "comments") {
        allComments = returnedData;
      }

      console.log(allPosts);
      console.log(allComments);
    }
  });
}

sendRequestTOAPI(requestComments, "comments", "GET");
sendRequestTOAPI(requestPosts, "posts", "GET");

var allPosts = [];
var allComments = [];

function displayAllPosts() {
  var innerHtmlContent = "";

  for (var i = 0; i < allPosts.length; i++) {
    innerHtmlContent += `<div class="post bg-info rounded-3 p-3">
        <h2>${allPosts[i].title}</h2>
        <p>${allPosts[i].body}</p>
        <div class="row d-flex flex-row comments justify-content-center">
          ${displayComments(allPosts[i].id)}
        </div>
      </div>`;
  }

  document.querySelector(".allPosts").innerHTML = innerHtmlContent;

  document.querySelectorAll(".comment").forEach((element) => {
    element.classList.add("comment-syle");
  });
}

function displayComments(postId) {
  console.log("comments", postId);
  var relatedPostComments = "";

  for (var i = 0; i < allComments.length; i++) {
    if (postId === allComments[i].postId) {
      relatedPostComments += `<div class="col-md-4 comment overflow-hidden mb-3 p-3">
          <div class="bg-info-subtle text-center">
            <h3>Comment</h3>
            <p>${allComments[i].body}</p>
          </div>
        </div>`;
    }
  }

  return relatedPostComments;
}
