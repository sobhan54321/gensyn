const quizData = {
  rlswarm: [
    { question: "What is RL-Swarm?", answers: { a: "A distributed learning protocol", b: "A crypto wallet", c: "A game engine" }, correct: "a" },
    { question: "Who provides compute in RL-Swarm?", answers: { a: "Validators", b: "Nodes", c: "End-users" }, correct: "b" },
    { question: "What is the main purpose of RL-Swarm?", answers: { a: "Coordinating decentralized training", b: "File compression", c: "AI image generation" }, correct: "a" },
    { question: "Which language powers RL-Swarm’s codebase?", answers: { a: "Python", b: "Solidity", c: "Rust" }, correct: "c" },
    { question: "What ensures fairness in RL-Swarm?", answers: { a: "Verification nodes", b: "Manual voting", c: "Time locks" }, correct: "a" },
  ],
  blockassist: [
    { question: "What is Block Assist?", answers: { a: "A decentralized browser", b: "A Gensyn verification layer", c: "A marketplace for NFTs" }, correct: "b" },
    { question: "Block Assist ensures what?", answers: { a: "Visual UI consistency", b: "Low latency", c: "Task validity and security" }, correct: "c" },
    { question: "What does Block Assist interact with?", answers: { a: "Training tasks", b: "Web hosting servers", c: "Email systems" }, correct: "a" },
    { question: "Which core technology supports Block Assist?", answers: { a: "Quantum computing", b: "Blockchain", c: "SQL databases" }, correct: "b" },
    { question: "Block Assist contributes to:", answers: { a: "Integrity of training data", b: "Frontend UI", c: "Power management" }, correct: "a" },
  ],
  judge: [
    { question: "Who acts as the 'Judge' in Gensyn?", answers: { a: "The Verifier Node", b: "The Developer", c: "The GPU Miner" }, correct: "a" },
    { question: "Judge ensures:", answers: { a: "User rewards distribution", b: "Correct model computation", c: "Ad revenue" }, correct: "b" },
    { question: "Judge nodes help:", answers: { a: "Verify decentralized AI results", b: "Host Gensyn’s website", c: "Generate tokens" }, correct: "a" },
    { question: "Judges use what for proof?", answers: { a: "Cryptographic checks", b: "Manual reviews", c: "Data sampling" }, correct: "a" },
    { question: "Judge is part of which layer?", answers: { a: "Verification", b: "Execution", c: "Storage" }, correct: "a" },
  ]
};

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const shareContainer = document.getElementById("share");
const quizSection = document.getElementById("quiz-section");

const clickSound = document.getElementById("click-sound");
const successSound = document.getElementById("success-sound");

let currentQuiz = [];

function startQuiz(type) {
  clickSound.play();
  document.querySelector(".quiz-options").classList.add("hidden");
  document.querySelector(".subtitle").classList.add("hidden");
  currentQuiz = quizData[type];
  quizSection.classList.remove("hidden");
  buildQuiz();
}

function buildQuiz() {
  const output = currentQuiz.map((q, i) => {
    const answers = Object.entries(q.answers)
      .map(([key, val]) => `
        <label>
          <input type="radio" name="question${i}" value="${key}">
          ${key.toUpperCase()}. ${val}
        </label>
      `).join('');
    return `
      <div class="question fade-in">${q.question}</div>
      <div class="answers fade-in">${answers}</div>
    `;
  });
  quizContainer.innerHTML = output.join('');
}

function showResults() {
  successSound.play();
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let score = 0;

  currentQuiz.forEach((q, i) => {
    const selected = (answerContainers[i].querySelector(`input[name=question${i}]:checked`) || {}).value;
    if (selected === q.correct) score++;
  });

  resultsContainer.innerHTML = `🔥 You scored ${score} / ${currentQuiz.length}`;
  resultsContainer.classList.add("fade-in");

  shareContainer.innerHTML = `
    <a href="https://twitter.com/intent/tweet?text=I scored ${score}/${currentQuiz.length} in the Gensyn Quiz! ⚡ Try it here #GensynAI #DecentralizedAI" target="_blank">
      <button class="submit-btn fade-in">Share on X</button>
    </a>`;
}

submitButton.addEventListener("click", showResults);
