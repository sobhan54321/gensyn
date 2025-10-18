const quizzes = {
  rl: {
    title: "RL-Swarm Quiz",
    questions: [
      { q: "What is RL-Swarm primarily used for?", options: ["AI training", "Crypto trading", "Data mining"], answer: 0 },
      { q: "Who provides compute in RL-Swarm?", options: ["Validators", "Nodes", "End-users"], answer: 1 },
      { q: "Main purpose of RL-Swarm?", options: ["Decentralized training", "File compression", "AI image gen"], answer: 0 },
      { q: "Language powering RL-Swarm?", options: ["Python", "Solidity", "Rust"], answer: 2 },
      { q: "What ensures fairness?", options: ["Verification nodes", "Block rewards", "Smart contracts"], answer: 0 }
    ]
  },
  block: {
    title: "Block-Assist Quiz",
    questions: [
      { q: "What does Block-Assist help with?", options: ["Smart contract aid", "AI storage", "Training monitoring"], answer: 0 },
      { q: "Which layer it works on?", options: ["Layer-1", "Layer-2", "Off-chain"], answer: 1 },
      { q: "Its main utility?", options: ["Automation", "Debugging", "Validation"], answer: 2 },
      { q: "Reward token?", options: ["GSN", "ETH", "BTC"], answer: 0 },
      { q: "Who uses Block-Assist?", options: ["Developers", "Validators", "End users"], answer: 0 }
    ]
  },
  judge: {
    title: "Judge Quiz",
    questions: [
      { q: "What is Gensyn Judge?", options: ["AI evaluator", "Node checker", "Reward distributor"], answer: 0 },
      { q: "Judge runs on?", options: ["On-chain", "Off-chain", "Hybrid"], answer: 2 },
      { q: "Judges verify?", options: ["Training results", "Payments", "Logs"], answer: 0 },
      { q: "Judges get reward via?", options: ["Staking", "Validation", "Voting"], answer: 1 },
      { q: "Final output checked for?", options: ["Accuracy", "Speed", "Storage"], answer: 0 }
    ]
  }
};

let currentQuiz, currentIndex = 0, score = 0;

function startQuiz(type) {
  currentQuiz = quizzes[type];
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  document.getElementById('quiz-title').textContent = currentQuiz.title;
  currentIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = currentQuiz.questions[currentIndex];
  const container = document.getElementById('question-container');
  container.innerHTML = `
    <div class="question">${q.q}</div>
    ${q.options.map((opt, i) => `<div class='option' onclick='selectOption(${i})'>${opt}</div>`).join("")}
  `;
}

function selectOption(index) {
  const options = document.querySelectorAll('.option');
  options.forEach(o => o.classList.remove('selected'));
  options[index].classList.add('selected');
  options[index].dataset.selected = "true";
}

function nextQuestion() {
  const selected = document.querySelector('.option.selected');
  if (!selected) return alert("Select an answer!");
  const index = Array.from(document.querySelectorAll('.option')).indexOf(selected);
  if (index === currentQuiz.questions[currentIndex].answer) score++;

  currentIndex++;
  if (currentIndex < currentQuiz.questions.length) {
    showQuestion();
  } else {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('score-container').classList.remove('hidden');
    document.getElementById('score').textContent = score;
  }
}

function restart() {
  document.getElementById('score-container').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
}
