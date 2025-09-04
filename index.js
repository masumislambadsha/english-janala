const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};
const displayLesson = (lessons) => {
  // 1. get the container
  const levelContainer = document.getElementById("loadLesson");
  levelContainer.innerHTML = "";
  // catch every lesson
  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
     <button id="lessonBtn-${lesson.level_no}"
     onclick ="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn" >
          <img id='bookWhite-${lesson.level_no}' src="./assets/fa-book-open.png" alt="" class="removeWhite" />
          Lesson -${lesson.level_no}
        </button>
    `;
    levelContainer.appendChild(btnDiv);
  });
};
loadLesson();
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) =>{
       const clickBtn = document.getElementById(`lessonBtn-${id}`)


       document.querySelectorAll('.lesson-btn').forEach(btn=>btn.classList.remove('active'))
       clickBtn.classList.add('active')

      document.querySelectorAll('.removeWhite').forEach(btn=>btn.classList.remove('invert', 'brightness-0'))
      document.getElementById(`bookWhite-${id}`).classList.add('invert', 'brightness-0')
       //  const btnActive = document.getElementsByClassName('lesson-btn')
       //  for(const btn of btnActive){
       //   btn.classList.remove('active')
       //  }
        displayLevelWord(data.data)
});
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="mt-[50px] text-center mx-auto space-y-5 col-span-full ">
        <img src="./assets/alert-error.png" alt="" class= "mx-auto">
        <p class="font-normal font-bangla text-[15px] text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h3 class="font-medium font-bangla text-[35px] text-[#292524]">নেক্সট Lesson এ যান</h3>
      </div>
  `;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-1 space-y-3 mt-10 md:mt-0">
          <h2 class="font-bold text-[24px] md:text-[32px]">${
            word.word ? word.word : "শব্দ পাওয়া যায়নি"
          }</h2>
          <p class="font-medium md:text-[14px]">Meaning/Pronounciation</p>
          <div class="font-bold md:text-[20px] text-gray-700 font-banla">"${word.meaning ?word.meaning:`অর্থ পাওয়া যায়নি`}/${word.pronunciation?word.pronunciation:"উচ্চারণ পাওয়া যায়নি"}"</div>

          <div class="flex justify-between items-center mt-[50px] px-[55px]">
            <button onclick='my_modal_5.showModal()' class="btn bg-[rgb(26,145,255,0.1)] hover:bg-[#1A91FF80] rounded-[8px]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[rgb(26,145,255,0.1)] rounded-[8px] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
    `;
    wordContainer.append(card);
  });
};
