let currentQuestion = 0;
let questions = [];

fetch('https://kingdom-zn59.onrender.com/api/questions')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  })
  .catch(err => {
    document.getElementById('question-container').innerText = '❌ 問題データの読み込みに失敗しました。';
    console.error(err);
  });

function showQuestion() {
  const container = document.getElementById('question-container');
  const feedback = document.getElementById('feedback');
  feedback.textContent = '';
  
  const q = questions[currentQuestion];
  container.innerHTML = `<p><strong>Q${currentQuestion + 1}:</strong> ${q.question}</p>`;
  
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, q.answer);
    container.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  const feedback = document.getElementById('feedback');
  if (selected === correct) {
    feedback.innerHTML = "<p class='correct'>✅ 正解！</p>";
  } else {
    feedback.innerHTML = `<p class='incorrect'>❌ 不正解！正解は「${correct}」</p>`;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 1500);
  } else {
    setTimeout(() => {
      document.getElementById('question-container').innerHTML = "<p>🎉 全問終了！</p>";
      feedback.innerHTML = "";
    }, 1500);
  }
}
