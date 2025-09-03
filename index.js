const loadLesson =() =>{
  const url = 'https://openapi.programming-hero.com/api/levels/all'
  fetch(url)
  .then(res => res.json())
  .then(data => displayLesson(data.data))
}
const displayLesson = (lessons) =>{
  // 1. get the container
  const levelContainer = document.getElementById('loadLesson')
  levelContainer.innerHTML =''
  // catch every lesson
  lessons.forEach(lesson => {
    const btnDiv = document.createElement('div')
    btnDiv.innerHTML = `
     <button class="btn btn-outline btn-primary" >
          <img src="./assets/fa-book-open.png" alt=""/>
          Lesson -${lesson.level_no}
        </button>
    `
    levelContainer.appendChild(btnDiv)
  });
}
loadLesson()
