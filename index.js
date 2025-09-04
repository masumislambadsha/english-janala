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
const loadWordDetail =async (id) =>{
  const url=`https://openapi.programming-hero.com/api/word/${id}`
  const res =await fetch(url)
  const details = await res.json()
  displayWordDetails(details.data);

}

const displayWordDetails = (word) =>{
  console.log(word)
  const detailsBox = document.getElementById('details-container')
    document.getElementById("word_modal").showModal()

  detailsBox.innerHTML = `
   <div class="space-y-[32px] p-6 ">
        <h2 class="font-semibold text-4xl">${ word.word ? word.word : "শব্দ পাওয়া যায়নি"} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation?word.pronunciation:"উচ্চারণ পাওয়া যায়নি"})</h2>
        <div class="space-y-3">
        <h3 class="text-2xl font-semibold">Meaning</h3>
        <p class="text-2xl font-medium font-bangla">${word.meaning ?word.meaning:`অর্থ পাওয়া যায়নি`}</p>
      </div>
      <div class="space-y-3">
        <h3 class="text-2xl font-semibold">Example</h3>
         <p class="text-2xl font-normal font-bangla text-gray-600">${word.sentence}</p>
      </div>
      <div class="space-y-3">
        <h3 class="text-2xl font-semibold">সমার্থক শব্দ গুলো</h3>
        <div class="flex gap-2">
        <p class="text-[20px] font-normal text-gray-600 bg-[#EDF7FF] px-[20px] py-[6px] ">${word.synonyms[0] ? word.synonyms[0]:"সমার্থক শব্দ পাওয়া যায়নি"}</p>
        <p class="text-[20px] font-normal text-gray-600  bg-[#EDF7FF] px-[20px] py-[6px]">${word.synonyms[1] ? word.synonyms[1]:"সমার্থক শব্দ পাওয়া যায়নি"}</p>
        <p class="text-[20px] font-normal text-gray-600 bg-[#EDF7FF] px-[20px] py-[6px]">${word.synonyms[2] ? word.synonyms[2]:"সমার্থক শব্দ পাওয়া যায়নি"} </p>
        </div>
      </div>
      <button class="btn btn-primary rounded-lg mt-[50px]">
         Complete Learning
        </button>
      </div>
  `
}
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
            <button onclick='loadWordDetail(${word.id})' class="btn bg-[rgb(26,145,255,0.1)] hover:bg-[#1A91FF80] rounded-[8px]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[rgb(26,145,255,0.1)] rounded-[8px] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
    `;
    wordContainer.append(card);
  });
};
