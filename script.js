// ═══════════════════════════════════════
//   WEATHER WHISPERS — script.js
// ═══════════════════════════════════════

const CITIES = [
  { name: "Itanagar",           state: "Arunachal Pradesh" },
  { name: "Dispur",             state: "Assam" },
  { name: "Patna",              state: "Bihar" },
  { name: "Raipur",             state: "Chhattisgarh" },
  { name: "Panaji",             state: "Goa" },
  { name: "Gandhinagar",        state: "Gujarat" },
  { name: "Chandigarh",         state: "Haryana / Punjab" },
  { name: "Shimla",             state: "Himachal Pradesh" },
  { name: "Ranchi",             state: "Jharkhand" },
  { name: "Bangalore",          state: "Karnataka" },
  { name: "Thiruvananthapuram", state: "Kerala" },
  { name: "Bhopal",             state: "Madhya Pradesh" },
  { name: "Mumbai",             state: "Maharashtra" },
  { name: "Imphal",             state: "Manipur" },
  { name: "Shillong",           state: "Meghalaya" },
  { name: "Aizawl",             state: "Mizoram" },
  { name: "Kohima",             state: "Nagaland" },
  { name: "Bhubaneswar",        state: "Odisha" },
  { name: "Jaipur",             state: "Rajasthan" },
  { name: "Gangtok",            state: "Sikkim" },
  { name: "Chennai",            state: "Tamil Nadu" },
  { name: "Hyderabad",          state: "Telangana" },
  { name: "Agartala",           state: "Tripura" },
  { name: "Lucknow",            state: "Uttar Pradesh" },
  { name: "Dehradun",           state: "Uttarakhand" },
  { name: "Kolkata",            state: "West Bengal" },
  { name: "New Delhi",          state: "Delhi" },
  { name: "Srinagar",           state: "Jammu & Kashmir" },
  { name: "Leh",                state: "Ladakh" },
  { name: "Puducherry",         state: "Puducherry" },
];

// ── SVG weather icons (no emoji) ──
function getWeatherSVG(desc, daytime) {
  const d = desc.toLowerCase();
  const sun = `<circle cx="40" cy="40" r="16" fill="#fde68a"/>
    <g stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round">
      <line x1="40" y1="8"  x2="40" y2="16"/>
      <line x1="40" y1="64" x2="40" y2="72"/>
      <line x1="8"  y1="40" x2="16" y2="40"/>
      <line x1="64" y1="40" x2="72" y2="40"/>
      <line x1="17" y1="17" x2="22" y2="22"/>
      <line x1="63" y1="17" x2="58" y2="22"/>
      <line x1="17" y1="63" x2="22" y2="58"/>
      <line x1="63" y1="63" x2="58" y2="58"/>
    </g>`;
  const moon = `<path d="M46 26a20 20 0 1 1-26 26 16 16 0 0 0 26-26z" fill="#c4b5fd"/>`;
  const cloud = `<ellipse cx="34" cy="48" rx="22" ry="14" fill="white" stroke="#e2e8f0" stroke-width="1"/>
    <ellipse cx="46" cy="52" rx="18" ry="12" fill="white" stroke="#e2e8f0" stroke-width="1"/>
    <circle  cx="28" cy="44" r="11"          fill="white" stroke="#e2e8f0" stroke-width="1"/>
    <circle  cx="42" cy="40" r="13"          fill="white" stroke="#e2e8f0" stroke-width="1"/>`;
  const rain = `<line x1="28" y1="62" x2="24" y2="72" stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="38" y1="64" x2="34" y2="74" stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="62" x2="44" y2="72" stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round"/>`;
  const snow = `<circle cx="28" cy="66" r="3" fill="#bfdbfe"/>
    <circle cx="38" cy="70" r="3" fill="#bfdbfe"/>
    <circle cx="48" cy="66" r="3" fill="#bfdbfe"/>`;
  const fog  = `<line x1="18" y1="58" x2="58" y2="58" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
    <line x1="22" y1="64" x2="54" y2="64" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>`;

  const bg = `<rect width="80" height="80" fill="none"/>`;

  if (d.includes("clear") || d.includes("sunny")) {
    return bg + (daytime ? sun : moon);
  } else if (d.includes("rain") || d.includes("drizzle") || d.includes("shower")) {
    return bg + cloud + rain;
  } else if (d.includes("snow") || d.includes("sleet")) {
    return bg + cloud + snow;
  } else if (d.includes("thunder") || d.includes("storm")) {
    return bg + cloud +
      `<path d="M42 52 L34 64 L40 64 L32 76" stroke="#a855f7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  } else if (d.includes("mist") || d.includes("fog") || d.includes("haze")) {
    return bg + cloud + fog;
  } else if (d.includes("cloud")) {
    if (daytime) return bg + `<circle cx="26" cy="34" r="12" fill="#fde68a" opacity="0.85"/>` + cloud;
    return bg + cloud;
  }
  return bg + (daytime ? sun : moon);
}

// ── Cute message ──
function cuteMessage(temp) {
  if (temp > 40) return "It's scorching out there — stay indoors if you can, and keep drinking water.";
  if (temp > 35) return "Quite hot today. Sunscreen, water, and a hat would be your best friends.";
  if (temp > 30) return "Warm and sunny. A cold drink sounds like a great idea right now.";
  if (temp > 25) return "Lovely warm weather — perfect for a stroll outside.";
  if (temp > 20) return "Just the right temperature. Neither too warm nor too cool.";
  if (temp > 15) return "A little cool today. A light jacket should do the trick.";
  if (temp > 10) return "Chilly weather — a good day for something warm to sip on.";
  return "Quite cold out there. Bundle up before you head out.";
}

// ── State ──
let selectedCity = null;
let allCityItems = [];

// ── Initialise city list ──
function buildCityList() {
  const list = document.getElementById("cityList");
  CITIES.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "city-item";
    btn.innerHTML = `<span class="city-name">${c.name}</span><span class="city-state">${c.state}</span>`;
    btn.dataset.name  = c.name.toLowerCase();
    btn.dataset.state = c.state.toLowerCase();
    btn.addEventListener("click", () => selectCity(c.name, btn));
    list.appendChild(btn);
    allCityItems.push(btn);
  });
}

function filterCities() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  allCityItems.forEach(btn => {
    const match = btn.dataset.name.includes(q) || btn.dataset.state.includes(q);
    btn.style.display = match ? "" : "none";
  });
}

function selectCity(name, btn) {
  allCityItems.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedCity = name;
  document.getElementById("customCity").value = "";
}

// ── Screen transitions ──
function revealApp() {
  document.getElementById("appScreen").classList.add("visible");
  document.body.style.overflow = "hidden";
}
function goBack() {
  document.getElementById("appScreen").classList.remove("visible");
  document.body.style.overflow = "";
  resetResult();
}

// ── Result states ──
function showState(id) {
  ["stateIdle","stateLoading","weatherCard","stateError"].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = (s === id) ? "" : "none";
  });
}

function resetResult() { showState("stateIdle"); }

// ── Fetch ──
async function fetchWeather() {
  const custom = document.getElementById("customCity").value.trim();
  const city   = custom || selectedCity;

  if (!city) {
    showState("stateError");
    document.getElementById("errorMsg").textContent = "Please select a city or type one in the field below.";
    return;
  }

  showState("stateLoading");
  document.getElementById("submitBtn").disabled = true;

  try {
    const res  = await fetch("/weather", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ city }),
    });
    const data = await res.json();

    if (!res.ok || data.error) {
      showState("stateError");
      document.getElementById("errorMsg").textContent = data.error || "Something went wrong. Please try again.";
    } else {
      renderWeather(data);
    }
  } catch {
    showState("stateError");
    document.getElementById("errorMsg").textContent = "Could not connect to the server. Make sure app.py is running.";
  } finally {
    document.getElementById("submitBtn").disabled = false;
  }
}

function renderWeather(d) {
  document.getElementById("wcCity").textContent     = d.city;
  document.getElementById("wcDesc").textContent     = d.desc;
  document.getElementById("wcTemp").textContent     = `${d.temp}°`;
  document.getElementById("wcFeels").textContent    = `${d.feels}°C`;
  document.getElementById("wcHumidity").textContent = `${d.humidity}%`;
  document.getElementById("wcWind").textContent     = `${d.wind} km/h`;
  document.getElementById("wcNote").textContent     = cuteMessage(d.temp);

  const badge = document.getElementById("wcBadge");
  if (d.daytime) {
    badge.textContent = "Daytime";
    badge.className   = "wc-badge";
  } else {
    badge.textContent = "Nighttime";
    badge.className   = "wc-badge night";
  }

  const iconEl = document.getElementById("wcIcon");
  iconEl.innerHTML = `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">${getWeatherSVG(d.desc, d.daytime)}</svg>`;

  showState("weatherCard");
}

// ── Enter key shortcuts ──
document.addEventListener("DOMContentLoaded", () => {
  buildCityList();
  document.getElementById("customCity").addEventListener("keydown", e => {
    if (e.key === "Enter") fetchWeather();
  });
  document.getElementById("customCity").addEventListener("input", () => {
    if (document.getElementById("customCity").value.trim()) {
      allCityItems.forEach(b => b.classList.remove("selected"));
      selectedCity = null;
    }
  });
});