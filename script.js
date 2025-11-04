// ====== DATA ======
const QUIZ = {
  "rl-swarm": [
    {
      q: "In RL, what does the agent try to maximize?",
      options: [
        "Immediate reward only",
        "Expected cumulative return",
        "State visitation frequency",
        "Discount factor"
      ],
      a: 1,
      why: "RL optimizes expected cumulative (discounted) return over time."
    },
    {
      q: "What is a primary benefit of distributed RL swarms?",
      options: [
        "They eliminate the need for rewards",
        "They reduce sample throughput",
        "They parallelize experience collection",
        "They remove stochasticity entirely"
      ],
      a: 2,
      why: "Parallel actors generate more experience, speeding up training."
    },
    {
      q: "In ε-greedy exploration, ε controls:",
      options: [
        "The learning rate",
        "The probability of a random action",
        "The gradient norm",
        "The discount on rewards"
      ],
      a: 1,
      why: "With probability ε, the agent explores a random action."
    },
    {
      q: "A risk of reward shaping is:",
      options: [
        "Underfitting the value function",
        "Unintended/specification gaming behavior",
        "Lowering the discount factor",
        "Increasing memory usage"
      ],
      a: 1,
      why: "Poor shaping can incentivize the wrong behaviors (specification gaming)."
    },
    {
      q: "Policy gradient methods directly optimize:",
      options: [
        "The Q-value of the optimal policy",
        "The model likelihood",
        "The policy parameters via expected return",
        "Only the value baseline"
      ],
      a: 2,
      why: "They adjust policy parameters to maximize expected return."
    }
  ],
  "block-assist": [
    {
      q: "A typical blockchain block contains:",
      options: [
        "Transactions, previous block hash, nonce",
        "Only the current timestamp",
        "Training gradients",
        "DNS records"
      ],
      a: 0,
      why: "Blocks chain together via previous hash and include a nonce/transactions."
    },
    {
      q: "Proof-of-Work’s primary purpose is to:",
      options: [
        "Compress blocks",
        "Make adding blocks costly to secure consensus",
        "Encrypt wallets",
        "Generate randomness only"
      ],
      a: 1,
      why: "Costly computation helps deter attacks and secure the chain."
    },
    {
      q: "Smart contracts are typically executed:",
      options: [
        "Off-chain by a single trusted server",
        "On-chain by network nodes/VM",
        "Only in the client browser",
        "By GPUs exclusively"
      ],
      a: 1,
      why: "Contracts run deterministically on-chain in a virtual machine."
    },
    {
      q: "In EVM-like systems, 'gas' measures:",
      options: [
        "Network latency",
        "The storage size of a block",
        "Computational work required",
        "The number of peers"
      ],
      a: 2,
      why: "Gas quantifies the computation a transaction consumes."
    },
    {
      q: "Merkle trees enable:",
      options: [
        "GPU acceleration",
        "Efficient inclusion proofs for transactions",
        "Random number generation",
        "Password hashing"
      ],
      a: 1,
      why: "Merkle proofs verify membership without full data."
    }
  ],
  "judge": [
    {
      q: "Why use probabilistic verification for offloaded compute?",
      options: [
        "To recompute all work exactly",
        "To scale verification by spot-checking work",
        "To avoid using any cryptography",
        "To reduce network peers"
      ],
      a: 1,
      why: "Spot-checks make verification scalable without redoing all computations."
    },
    {
      q: "A 'challenge period' in task validation allows:",
      options: [
        "Nodes to submit disputes/fraud proofs",
        "Time-based staking rewards",
        "Encryption key rotation",
        "Checkpoint pruning"
      ],
      a: 0,
      why: "Disputes can be raised and resolved during this window."
    },
    {
      q: "A cryptographic commitment lets a prover:",
      options: [
        "Reveal all data immediately",
        "Bind to a value now, reveal later",
        "Avoid hashing",
        "Bypass consensus"
      ],
      a: 1,
      why: "Commitments are binding and hiding; reveal happens later."
    },
    {
      q: "Slashing generally penalizes:",
      options: [
        "Honest but slow computation",
        "Malicious or faulty behavior",
        "High gas prices",
        "Large model sizes"
      ],
      a: 1,
      why: "Bad behavior (e.g., fraud) risks stake slashing."
    },
    {
      q: "Zero-knowledge proofs allow a prover to:",
      options: [
        "Hide the statement",
        "Prove a statement without revealing inputs",
        "Skip verification entirely",
        "Encrypt the blockchain"
      ],
      a: 1,
      why: "ZK proofs prove correctness while keeping inputs secret."
    }
  ]
};

// ====== STATE ======
let currentSection = "rl-swarm";
const answers = {
  "rl-swarm": Array(5).fill(null),
  "block-assist": Array(5).fill(null),
  "judge": Array(5).fill(null),
};
const scores = {
  "rl-swarm": null,
  "block-assist": null,
  "judge": null,
};

// ====== HELPERS ======
const $ = (sel) => document.querySelector(sel);
const el = (tag, cls) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
};

function renderSection(sectionKey){
  currentSection = sectionKey;
  const mount = $("#quiz");
  mount.innerHTML = "";

  const data = QUIZ[sectionKey];

  data.forEach((item, idx) => {
    const card = el("div", "q");
    const h = el("h3");
    h.textContent = `Q${idx+1}. ${item.q}`;
    card.appendChild(h);

    const opts = el("div", "options");

    item.options.forEach((opt, oi) => {
      const label = el("label", "option");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${idx}`;
      input.value = oi;
      input.checked = (answers[sectionKey][idx] === oi);
      input.addEventListener("change", () => {
        answers[sectionKey][idx] = oi;
      });

      const span = document.createElement("span");
      span.textContent = opt;

      label.appendChild(input);
      label.appendChild(span);
      opts.appendChild(label);
    });

    const why = el("div", "explain");
    why.id = `why-${sectionKey}-${idx}`;
    why.textContent = `Why: ${item.why}`;

    card.appendChild(opts);
    card.appendChild(why);

    mount.appendChild(card);
  });

  // Reset result box view for this section
  const res = $("#result");
  res.hidden = true;

  updateTabs();
}

function updateTabs(){
  document.querySelectorAll(".tab").forEach(btn => {
    const active = btn.dataset.section === currentSection;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function allAnswered(sectionKey){
  return answers[sectionKey].every(v => v !== null);
}

function gradeSection(sectionKey){
  const data = QUIZ[sectionKey];
  const sel = answers[sectionKey];
  let correct = 0;

  data.forEach((item, idx) => {
    const picked = sel[idx];
    const qCard = document.querySelectorAll(".q")[idx];
    const opts = qCard.querySelectorAll(".option");

    opts.forEach((optNode, oi) => {
      optNode.classList.remove("correct", "incorrect");
      const radio = optNode.querySelector("input");
      if (oi === item.a) {
        // mark correct answer
        if (picked === oi) {
          correct += 1;
        }
        optNode.classList.add("correct");
      } else if (picked === oi) {
        optNode.classList.add("incorrect");
      }
    });

    // show explanation
    const why = document.getElementById(`why-${sectionKey}-${idx}`);
    if (why) why.style.display = "block";
  });

  scores[sectionKey] = correct;
  showResult(sectionKey, correct, data.length);
  updateOverall();
}

function showResult(sectionKey, correct, total){
  const res = $("#result");
  res.hidden = false;
  res.className = "result"; // reset classes

  const pct = Math.round((correct/total) * 100);
  if (pct >= 80) res.classList.add("good");
  else if (pct >= 50) res.classList.add("ok");
  else res.classList.add("bad");

  res.innerHTML = `
    <h3>${labelFor(sectionKey)} — Score: ${correct} / ${total} (${pct}%)</h3>
    <p>${pct >= 80 ? "Great job! ✅" : pct >= 50 ? "Not bad — review the explanations and try again. ⚠️" : "Keep practicing! You’ve got this. ❌"}</p>
  `;
}

function labelFor(key){
  return key === "rl-swarm" ? "RL Swarm" :
         key === "block-assist" ? "Block Assist" :
         "Judge";
}

function updateOverall(){
  const total = 15;
  const sum = Object.values(scores).reduce((acc, v) => acc + (typeof v === "number" ? v : 0), 0);
  const percent = Math.round((sum / total) * 100);

  $("#overallBar").style.width = percent + "%";
  $("#overallText").textContent = `${sum} / ${total} correct`;
}

function resetSection(sectionKey){
  answers[sectionKey] = answers[sectionKey].map(() => null);
  scores[sectionKey] = null;
  renderSection(sectionKey);
  updateOverall();
}

// ====== EVENTS ======
window.addEventListener("DOMContentLoaded", () => {
  // Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Tabs
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.section;
      renderSection(key);
    });
  });

  // Buttons
  document.getElementById("submitBtn").addEventListener("click", () => {
    if (!allAnswered(currentSection)) {
      alert("Please answer all 5 questions in this section before submitting.");
      return;
    }
    gradeSection(currentSection);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Reset answers for this section?")) {
      resetSection(currentSection);
    }
  });

  // Initial render
  renderSection(currentSection);
});
