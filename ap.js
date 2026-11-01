// ===== Dynamic Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 🌊 Ocean & Plastic Waste Facts =====
const facts = [
  "Every year, over 8 million tons of plastic waste end up in our oceans.",
  "By 2050, there could be more plastic than fish in the ocean by weight.",
  "Around 700 marine species are affected by plastic debris worldwide.",
  "Only about 9% of plastic waste ever produced has been recycled.",
  "More than 1 million seabirds and 100,000 marine animals die yearly from plastic pollution.",
  "Microplastics have been found in Arctic snow, sea salt, and even bottled water.",
  "The Great Pacific Garbage Patch covers an estimated 1.6 million square kilometers.",
  "It takes more than 400 years for plastic to decompose in the ocean.",
  "Coral reefs support over 25% of all marine life, yet they cover less than 1% of the ocean floor.",
  "Coastal cleanups remove millions of kilograms of trash every year, yet ocean waste keeps increasing."
];

let factIndex = 0;
const factElement = document.getElementById("factHighlight");
const nextFactBtn = document.getElementById("nextFactBtn");

function showNextFact() {
  factElement.classList.remove("fade-in");
  void factElement.offsetWidth; // re-trigger animation
  factElement.textContent = facts[factIndex];
  factElement.classList.add("fade-in");
  factIndex = (factIndex + 1) % facts.length;
}

// Initialize fact section
if (factElement && nextFactBtn) {
  showNextFact();
  nextFactBtn.addEventListener("click", showNextFact);
  setInterval(showNextFact, 10000); // auto change every 10s
}

// ===== 🪸 Volunteer Registration =====
const regForm = document.getElementById("registrationForm");
const regMsg = document.getElementById("registrationMsg");
const regTable = document.getElementById("volunteerTbody");

if (regForm) {
  regForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const location = document.getElementById("regLocation").value;
    const interests = document.getElementById("regInterests").value;
    const joined = new Date().toLocaleDateString();

    // Add to table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${location}</td>
      <td>${interests}</td>
      <td>${joined}</td>`;
    regTable.appendChild(row);

    regMsg.textContent = `✅ Thank you for joining, ${name}!`;
    regForm.reset();
  });
}

// ===== 🌱 Volunteer Action Log =====
const actionForm = document.getElementById("actionForm");
const actionsTable = document.getElementById("actionsTbody");
const totalPointsElement = document.getElementById("totalPoints");
let totalPoints = 0;

if (actionForm) {
  actionForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const type = document.getElementById("actionType").value;
    const desc = document.getElementById("actionDesc").value;
    const minutes = parseInt(document.getElementById("actionMinutes").value);
    const date = document.getElementById("actionDate").value || new Date().toLocaleDateString();

    const points = Math.round(minutes / 10) * 5;
    totalPoints += points;
    totalPointsElement.textContent = totalPoints;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${date}</td>
      <td>${type.replace("_", " ")}</td>
      <td>${desc}</td>
      <td>${minutes}</td>
      <td>${points}</td>`;
    actionsTable.appendChild(row);

    actionForm.reset();
  });
}

// ===== 💧 Fundraiser Progress =====
const donationForm = document.getElementById("donationForm");
const donationsTable = document.getElementById("donationsTbody");
const raisedElement = document.getElementById("raisedAmount");
const progressFill = document.getElementById("progressFill");
const goalElement = document.getElementById("goalAmount");
let totalRaised = 0;
let goal = 10000;

function parseCurrency(text) {
  if (!text) return 0;
  return parseFloat(String(text).replace(/[^0-9.]/g, "")) || 0;
}

function updateProgressUI() {
  let percent = Math.min((totalRaised / goal) * 100, 100);
  if (percent > 0 && percent < 2) percent = 2; // ensure visible progress for small amounts
  if (raisedElement) raisedElement.textContent = `$${totalRaised.toLocaleString()}`;
  if (progressFill) progressFill.style.width = `${percent}%`;
}

function initFundraiser() {
  if (goalElement) {
    const parsedGoal = parseCurrency(goalElement.textContent);
    if (parsedGoal > 0) goal = parsedGoal;
  }
  // Sum any existing donation rows on page load
  if (donationsTable && donationsTable.rows && donationsTable.rows.length) {
    let sum = 0;
    for (let i = 0; i < donationsTable.rows.length; i++) {
      const cell = donationsTable.rows[i].cells[1];
      if (cell) sum += parseCurrency(cell.textContent);
    }
    totalRaised = sum;
  }
  updateProgressUI();
}

if (donationForm) {
  // Initialize state based on existing DOM
  initFundraiser();
  donationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const donor = document.getElementById("donorName").value || "Anonymous";
    const amount = parseFloat(document.getElementById("donationAmount").value);
    const date = new Date().toLocaleDateString();

    totalRaised += amount;
    updateProgressUI();

    const row = document.createElement("tr");
    row.innerHTML = `<td>${donor}</td><td>$${amount}</td><td>${date}</td>`;
    donationsTable.appendChild(row);

    donationForm.reset();
  });
}

// ===== 🌅 Background Carousel =====
const slides = document.querySelectorAll(".bg-slide");
let currentSlide = 0;

function changeSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(changeSlide, 7000);
