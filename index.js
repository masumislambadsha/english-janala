const createElement = (arr) => {
  const htmlElement = arr.map(el =>`<span class='btn'>${el}</span>`)
  console.log(htmlElement.join(" "));

}

const manageSpinner = (status) =>{
  if(status == true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
  }
  else{
     document.getElementById('spinner').classList.add('hidden')
    document.getElementById('word-container').classList.remove('hidden')
  }
}

const loadLesson = () => {
  document.querySelectorAll('.lesson-btn').forEach(btn=>btn.classList.remove('active'))
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("loadLesson");
  levelContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
     <button id="lessonBtn-${lesson.level_no}"
     onclick ="loadLevelWord(${lesson.level_no})"
     class="btn btn-outline btn-primary lesson-btn" >
          <img id='bookWhite-${lesson.level_no}'
          src="./assets/fa-book-open.png"
          alt="" class="removeWhite" />
          Lesson -${lesson.level_no}
        </button>
    `;
    levelContainer.appendChild(btnDiv);
  });
};

loadLesson();

const loadLevelWord = (id) => {
  manageSpinner(true)
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) =>{
       const clickBtn = document.getElementById(`lessonBtn-${id}`)
       document.querySelectorAll('.lesson-btn').forEach(btn=>btn.classList.remove('active'))
       clickBtn.classList.add('active')
       document.querySelectorAll('.removeWhite').forEach(btn=>btn.classList.remove('invert', 'brightness-0'))
       document.getElementById(`bookWhite-${id}`).classList.add('invert', 'brightness-0')
       displayLevelWord(data.data)
    });
};

const loadWordDetail = async (id) =>{
  const url=`https://openapi.programming-hero.com/api/word/${id}`
  const res = await fetch(url)
  const details = await res.json()
  displayWordDetails(details.data);
};


const displayWordDetails = (word) =>{
  const detailsBox = document.getElementById('details-container')
  document.getElementById("word_modal").showModal()

  detailsBox.innerHTML = `
   <div class="space-y-[32px] p-6 ">
        <h2 class="font-semibold text-4xl">
          ${ word.word ? word.word : "শব্দ পাওয়া যায়নি"}
        </h2>
        <div class="space-y-3">
          <h3 class="text-2xl font-semibold">Meaning</h3>
          <p class="text-2xl font-medium font-bangla">
            ${word.meaning ?word.meaning:`অর্থ পাওয়া যায়নি`}
          </p>
        </div>
        <div class="space-y-3">
          <h3 class="text-2xl font-semibold">Example</h3>
          <p class="text-2xl font-normal font-bangla text-gray-600">${word.sentence}</p>
        </div>
        <div class="space-y-3">
          <h3 class="text-2xl font-semibold">সমার্থক শব্দ গুলো</h3>
          <div class="flex gap-2">
           <p class="text-[20px] font-normal text-gray-600 bg-[#EDF7FF] px-[20px] py-[6px] ">
              ${word.synonyms[0] ? word.synonyms[0]:"সমার্থক শব্দ পাওয়া যায়নি"}
            </p>
            <p class="text-[20px] font-normal text-gray-600 bg-[#EDF7FF] px-[20px] py-[6px]">
              ${word.synonyms[1] ? word.synonyms[1]:"সমার্থক শব্দ পাওয়া যায়নি"}
            </p>
            <p class="text-[20px] font-normal text-gray-600 bg-[#EDF7FF] px-[20px] py-[6px]">
              ${word.synonyms[2] ? word.synonyms[2]:"সমার্থক শব্দ পাওয়া যায়নি"}
            </p>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button onclick='speakWord("${word.word}")'
          class="btn bg-[rgb(26,145,255,0.1)] hover:bg-[#1A91FF80] rounded-lg">
            <i class="fa-solid fa-volume-high"></i> Speak
          </button>
          <button class="btn btn-primary rounded-lg">
            Complete Learning
          </button>
        </div>
      </div>
  `
}
// <div class="text-[20px] font-normal text-gray-600 bg-[#EDF7FF] px-[20px] py-[6px] space-x-5 ">
            //  ${word.synonyms ? word.synonyms:"সমার্থক শব্দ পাওয়া যায়নি"}
            // </div>

// ---------- 🔊 Speech Function (Mobile friendly) ----------
let voices = [];

// voices লোড হওয়ার পর populate করো
speechSynthesis.onvoiceschanged = () => {
  voices = speechSynthesis.getVoices();
};

const speakWord = (text) => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // voice assign করো
    if (voices.length > 0) {
      utterance.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
    }

    // Safari iOS/Android fallback → কিছু delay দিলে কাজ করে
    if (!utterance.voice) {
      setTimeout(() => speechSynthesis.speak(utterance), 250);
    } else {
      speechSynthesis.speak(utterance);
    }
  } else {
    alert("Your browser does not support speech synthesis.");
  }
};

// শব্দ কার্ড দেখাও
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="mt-[50px] text-center mx-auto space-y-5 col-span-full ">
        <img src="./assets/alert-error.png" alt="" class= "mx-auto">
        <p class="font-normal font-bangla text-[15px] text-[#79716B]">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h3 class="font-medium font-bangla text-[35px] text-[#292524]">
          নেক্সট Lesson এ যান
        </h3>
      </div>
  `;
  manageSpinner(false)
  return
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-1 space-y-3 mt-10 md:mt-0">
          <h2 class="font-bold text-[24px] md:text-[32px]">
            ${word.word ? word.word : "শব্দ পাওয়া যায়নি"}
          </h2>
          <p class="font-medium md:text-[14px]">Meaning/Pronounciation</p>
          <div class="font-bold md:text-[20px] text-gray-700 font-banla">
            "${word.meaning ?word.meaning:`অর্থ পাওয়া যায়নি`} / ${word.pronunciation?word.pronunciation:"উচ্চারণ পাওয়া যায়নি"}"
          </div>
          <div class="flex justify-between items-center mt-[50px] px-[55px]">
            <button onclick='loadWordDetail(${word.id})'
            class="btn bg-[rgb(26,145,255,0.1)] hover:bg-[#1A91FF80] rounded-[8px]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button onclick='speakWord("${word.word}")'
            class="btn bg-[rgb(26,145,255,0.1)] rounded-[8px] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false)
};

document.getElementById("btn-search").addEventListener("click", () => {
  document.querySelectorAll('.lesson-btn').forEach(btn=>btn.classList.remove('active'))
  const input = document.getElementById("input-search");
  input.value = ''
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );

      displayLevelWord(filterWords);
    });
});
