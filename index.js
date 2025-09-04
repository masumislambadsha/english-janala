const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    const card = document.createElement('div')
    card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-1 space-y-3">
          <h2>Eager</h2>
          <p>Meaning/Pronounciation</p>
          <div>"আগ্রহী/ইগার"</div>
        </div>
    `
    wordContainer.append(card)
  });
};

const displayLesson = (lessons) => {
  // 1. get the container
  const levelContainer = document.getElementById("loadLesson");
  levelContainer.innerHTML = "";
  // catch every lesson
  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
     <button onclick ="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary" >
          <img src="./assets/fa-book-open.png" alt=""/>
          Lesson -${lesson.level_no}
        </button>
    `;
    levelContainer.appendChild(btnDiv);
  });
};
loadLesson();
