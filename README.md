# Weather Whispers ☁️

A soft, aesthetic weather forecast web app built with Python (Flask) and vanilla HTML/CSS/JS. Enter any Indian city and get a live weather report — temperature, humidity, wind speed, time of day, and a gentle note — all wrapped in a pink and blue glass-card UI.

---

## Project Structure

```
weather_whispers/
│
├── app.py              # Python backend (Flask server + OpenWeatherMap API)
├── index.html          # Frontend — all screens and layout
├── style.css           # All styling — colours, fonts, animations, layout
├── script.js           # Frontend logic — city list, API calls, rendering
└── requirements.txt    # Python dependencies
```

---

## Prerequisites

Before running this project, make sure you have:

- **Python 3.8 or above** — [Download here](https://www.python.org/downloads/)
- **pip** — comes bundled with Python
- **VS Code** — [Download here](https://code.visualstudio.com/)
- A stable internet connection (to fetch live weather data)

---

## Setup & Running the App

### Step 1 — Open the project folder in VS Code

```
File → Open Folder → select your weather_whispers folder
```

### Step 2 — Open the terminal

```
Terminal → New Terminal   (or press Ctrl + `)
```

### Step 3 — Install dependencies

```bash
pip install -r requirements.txt
```

This installs Flask, Requests, and Plyer.

### Step 4 — Run the Flask server

```bash
python app.py
```

You should see output like:

```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### Step 5 — Open in your browser

```
http://localhost:5000
```

To stop the server at any time, press **Ctrl + C** in the terminal.

---

## How to Use

1. The landing page greets you with the "Weather Whispers" title. Click **Check the sky** to open the app.
2. On the left panel, search for or scroll through the list of Indian state capitals.
3. Click a city to select it (highlighted in pink), or type any city name in the input field below.
4. Click **Get forecast** (or press Enter) to fetch live weather.
5. The result card appears on the right with temperature, description, feels-like, humidity, wind speed, day/night status, and a soft little note.
6. A desktop popup notification also fires in the background.
7. Click **Back** to return to the landing page.

---

## Features

- Live weather data from [OpenWeatherMap API](https://openweathermap.org/api)
- 30 Indian state capitals pre-listed with a live search filter
- Custom city input — type any city in India (or the world)
- Day / Night detection based on actual sunrise and sunset times for that city
- SVG weather icons — sun, clouds, rain, snow, thunder, fog, moon — drawn in code, no external image files
- Temperature-aware messages (e.g., stay hydrated above 35°C, bundle up below 10°C)
- Desktop popup notification via Plyer
- Custom cloud cursor using CSS and JavaScript
- Fully responsive — works on smaller screens too
- Animated background blobs, floating hero card, smooth screen transitions
- Glassmorphism weather result card with gradient typography

---

## API Used

**OpenWeatherMap — Current Weather Data**

- Endpoint: `http://api.openweathermap.org/data/2.5/weather`
- Parameters used: `q` (city name), `appid` (API key), `units=metric`
- Returns: temperature, feels-like, humidity, wind speed, weather description, sunrise/sunset timestamps, and current time

The API key in this project is for learning purposes. For production use, store it in an environment variable instead of hardcoding it.

---

## Dependencies

| Package      | Purpose                                      |
|--------------|----------------------------------------------|
| `flask`      | Python web framework — runs the local server |
| `requests`   | Makes HTTP calls to the weather API          |
| `plyer`      | Sends desktop popup notifications            |

---

## File Breakdown

### `app.py`

The Python brain of the app. It:
- Starts a Flask web server on port 5000
- Serves `index.html` at the root route `/`
- Accepts a POST request at `/weather` with a city name in JSON
- Calls the OpenWeatherMap API and processes the response
- Calculates whether it is currently daytime or nighttime at that location
- Returns clean JSON to the frontend
- Optionally fires a desktop notification via Plyer

### `index.html`

The structure of the entire app in one file. It contains:
- The hero landing section with title and decorative floating card
- The app screen with a two-column layout (city picker left, weather result right)
- All the state containers — idle, loading, weather card, and error
- Links to the CSS and JS files

### `style.css`

All visual design. Covers:
- CSS custom properties (variables) for the colour palette, fonts, shadows, and border radii
- Background blob animations
- Hero typography with gradient text
- Glassmorphism weather card
- City list with hover and selected states
- Loading spinner, error state, idle illustration
- Custom cloud cursor
- Smooth screen transitions using opacity and transform
- Responsive layout for smaller screens

### `script.js`

All frontend behaviour. Handles:
- Building the city list dynamically from a JavaScript array
- Live search filtering on the city list
- City selection state
- Screen transitions (hero to app and back)
- Fetching weather from the Flask backend using the Fetch API
- Rendering the weather result — city, temperature, description, stats, day/night badge, note
- Generating SVG weather icons in JavaScript based on the weather description
- Cursor tracking using `mousemove`

---

## What I Learned

### Python Concepts

**Variables and Data Types**

Working with strings (city names, weather descriptions), integers and floats (temperature, humidity, wind speed), booleans (daytime true/false), and dictionaries (the JSON data returned by the API and sent back to the frontend).

**Functions**

Writing reusable functions like `is_daytime()`, which takes three arguments (sunrise, sunset, and current time) and returns a boolean. Keeping logic in small, named functions instead of one big block of code.

**Conditional Logic (if / elif / else)**

Used to determine the right message based on temperature — for example, returning a "stay hydrated" message above 35°C and a "bundle up" message below 10°C. Also used to check whether the API returned valid data.

**Working with APIs using the `requests` Library**

Making a real HTTP GET request to an external service (OpenWeatherMap), passing query parameters in the URL, receiving a JSON response, and reading specific values from a nested dictionary — for example, `data["main"]["temp"]` or `data["sys"]["sunrise"]`.

**JSON**

Understanding that APIs communicate using JSON (JavaScript Object Notation). Using `response.json()` to convert the raw API response into a Python dictionary, and `jsonify()` in Flask to convert a Python dictionary into a JSON response to send back to the browser.

**Error Handling with try / except**

Wrapping the API call in a try/except block so the app doesn't crash if there's a network timeout, an invalid city name, or any other unexpected error. Returning a friendly error message to the frontend instead.

**Flask — Web Framework Basics**

- Starting a local web server with `app.run()`
- Defining routes using the `@app.route()` decorator
- Handling GET requests (serving the HTML page) and POST requests (receiving city data from the browser)
- Reading JSON from an incoming request with `request.get_json()`
- Sending a JSON response back with `jsonify()`
- Serving static files (HTML, CSS, JS) from the same folder

**HTTP Methods**

Understanding the difference between GET (fetching a page) and POST (sending data to the server). The browser sends a POST request with a JSON body containing the city name, and the server responds with weather data.

**String Methods**

Using `.strip()` to remove accidental whitespace from user input, `.lower()` to normalise weather descriptions for comparison, `.capitalize()` to format the description nicely for display, and f-strings to build the API URL cleanly.

**Working with Unix Timestamps**

The OpenWeatherMap API returns sunrise, sunset, and the current time as Unix timestamps (seconds since January 1, 1970). Comparing these three integers directly to determine whether it is currently daytime at the requested location — a surprisingly simple trick once you understand what the numbers mean.

**Math and Rounding**

Converting wind speed from metres per second to kilometres per hour (`speed * 3.6`) and using `round()` to display clean numbers instead of long floats like `28.71999999`.

**Third-party Libraries**

Installing and importing external packages (`flask`, `requests`, `plyer`) using pip, and understanding that `import` brings their functionality into your script.

**Desktop Notifications with Plyer**

Using `notification.notify()` to send a real operating-system-level popup from a Python script — and wrapping it in a silent try/except so the app still works gracefully on systems where notifications aren't supported.

---

## Possible Next Steps

- Add a 5-day forecast using the OpenWeatherMap forecast endpoint
- Store recently searched cities in the browser using localStorage
- Add a unit toggle to switch between Celsius and Fahrenheit
- Deploy to a cloud platform like Railway or Render so it works online without running locally
- Move the API key to a `.env` file using the `python-dotenv` library for better security

---

## UI:
<img width="953" height="501" alt="image" src="https://github.com/user-attachments/assets/6b1b5ca9-300f-48be-bd47-27af7e196d20" />
<img width="959" height="506" alt="image" src="https://github.com/user-attachments/assets/c1acd255-c2d3-465f-82a9-612950dff88e" />


