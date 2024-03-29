"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();
  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      <div>
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}
        </div>
        </small>
      </li>
    `);
}


function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// handle create story form sumbission 
function createNewStory(evt){
  console.debug("createNewStory");
  evt.preventDefault();

  const title = $("#title").val();
  const author = $("#author").val();
  const url = $("#url").val();
  const user = currentUser.username;

  const storyData = {author, title, url, user};
  
  const $story = StoryList.addStory(currentUser, storyData);

  $allStoriesList.prepend($story);
  $newStoryForm.trigger("reset");

  $newStoryForm.slideUp("slow");
}

$newStoryForm.on("submit", createNewStory);

// load favorite stories to page 
function putFavoritesOnPage(evt){
  console.debug(putFavoritesOnPage);
  evt.preventDefault();
}



