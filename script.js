const quizzes = {
  rl: [
    { q: "What is the core purpose of RL Swarm?", o: ["Distributed AI Training", "Web3 Security", "DeFi Liquidity", "NFT Minting"], a: 0 },
    { q: "Which language is Gensyn mainly built with?", o: ["Python", "Rust", "Solidity", "C++"], a: 1 },
    { q: "Gensyn focuses on?", o: ["Centralized AI", "Decentralized AI Compute", "Gaming AI", "Cloud Hosting"], a: 1 },
    { q: "RL Swarm helps in?", o: ["Model Sharing", "GPU Utilization", "Encryption", "Mining"], a: 1 },
    { q: "Who contributes compute in Gensyn?", o: ["Nodes", "Miners", "Validators", "Users"], a: 0 }
  ],
  block: [
    { q: "Block Assist helps developers with?", o: ["Smart Contracts", "AI Orchestration", "Frontend UI", "Blockchain APIs"], a: 1 },
    { q: "Gensyn’s network uses which layer of blockchain?", o: ["Layer 1", "Layer 2", "Layer 3", "Layer 0"], a: 2 },
    { q: "Block Assist provides?", o: ["Automation", "Decentralization", "AI Toolkits", "None"], a: 2 },
    { q: "Main goal of Block Assist?", o: ["Optimized AI Workflow", "Gaming", "Mining", "Trading"], a: 0 },
    { q: "Developers use Block Assist for?", o: ["Hosting", "AI Integration", "APIs", "Wallets"], a: 1 }
  ],
  judge: [
    { q: "The Judge module ensures?", o: ["Fair Evaluation", "Mining", "Data Storage", "NFT Tracking"], a: 0 },
    { q: "Judge is related to?", o: ["Model Scoring", "Frontend Design", "Payments", "Nodes"], a: 0 },
    { q: "Who interacts with Judge?", o: ["Validators", "Testers", "Users", "Miners"], a: 0 },
    { q: "Judge helps maintain?", o: ["Performance Integrity", "GPU Load", "Code Sync", "Market Cap"], a: 0 },
    { q: "Judge scores are based on?", o: ["Model Output Quality", "Hashrate", "Speed", "Uptime"], a: 0 }
  ]
};

let currentQuiz = [];
let index = 0;
let score = 0;

function startQuiz(type) {
  document.querySelector('.menu').classList.add('hidden');
  document.querySelector('#quizContainer').classList.remove('hidden');
  currentQuiz = quizzes[type];
  index = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = currentQuiz[index];
  document.getElementById('question').textContent = q.q;
  const options = document.getElementById('options');
  options.innerHTML = "";
  q.o.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    options.appendChild(btn);
  });
}

function checkAnswer(i, btn) {
  const allBtns = document.querySelectorAll('#options button');
  allBtns.forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  if (i === currentQuiz[index].a) score++;
  setTimeout(() => {
    index++;
    if (index < currentQuiz.length) showQuestion();
    else showScore();
  }, 400);
}

function showScore() {
  document.getElementById('question').classList.add('hidden');
  document.getElementById('options').classList.add('hidden');
  document.getElementById('scoreContainer').classList.remove('hidden');
  document.getElementById('score').textContent = `${score} / ${currentQuiz.length}`;

  const shareBtn = document.getElementById("shareBtn");
  shareBtn.onclick = () => {
    const tweet = `I just scored ${score}/${currentQuiz.length} on the Gensyn Quiz! ⚡  
Join the decentralized AI revolution at #Gensyn 🚀`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(url, "_blank");
  };
}

function restart() {
  location.reload();
}
