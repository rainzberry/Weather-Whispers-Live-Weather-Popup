from flask import Flask, request, jsonify, send_from_directory
import requests
from plyer import notification
import os

app = Flask(__name__, static_folder=".", static_url_path="")

API_KEY = "e0181304258a2f2465a5d516427d7f56"

def get_weather_emoji(desc):
    desc = desc.lower()
    if "clear" in desc:
        return "☀️"
    elif "cloud" in desc:
        return "☁️"
    elif "rain" in desc:
        return "🌧️"
    elif "storm" in desc or "thunder" in desc:
        return "⛈️"
    elif "snow" in desc:
        return "❄️"
    elif "mist" in desc or "fog" in desc or "haze" in desc:
        return "🌫️"
    elif "wind" in desc:
        return "💨"
    else:
        return "🌦️"

def temp_message(temp):
    if temp > 40:
        return "It's scorching! Please stay indoors & drink lots of water 🥵💦"
    elif temp > 35:
        return "Super hot out there! Stay hydrated & wear sunscreen ☀️💦"
    elif temp > 30:
        return "Warm and toasty! A cold drink would hit different right now 🧊"
    elif temp > 25:
        return "Lovely warm weather! Perfect for a walk outside 🌸"
    elif temp > 20:
        return "Just right! Not too hot, not too cold — pure bliss 😎"
    elif temp > 15:
        return "A little cool! Maybe grab a light jacket ✨"
    elif temp > 10:
        return "Chilly vibes! Time for some hot chai ☕"
    else:
        return "Brrrr! Bundle up warm, it's cold out there 🧣🧤"

def is_daytime(sunrise, sunset, current_time):
    return sunrise <= current_time <= sunset

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/weather", methods=["POST"])
def get_weather():
    data = request.get_json()
    city = data.get("city", "").strip()

    if not city:
        return jsonify({"error": "No city provided 🥺"}), 400

    url = (
        f"http://api.openweathermap.org/data/2.5/weather"
        f"?q={city},IN&appid={API_KEY}&units=metric"
    )

    try:
        resp = requests.get(url, timeout=8)
        wdata = resp.json()

        if wdata.get("cod") != 200:
            return jsonify({"error": f"Couldn't find weather for {city} 🌧️"}), 404

        temp      = round(wdata["main"]["temp"], 1)
        feels     = round(wdata["main"]["feels_like"], 1)
        humidity  = wdata["main"]["humidity"]
        desc      = wdata["weather"][0]["description"].capitalize()
        emoji     = get_weather_emoji(desc)
        wind      = round(wdata["wind"]["speed"] * 3.6, 1)  # m/s → km/h

        sunrise   = wdata["sys"]["sunrise"]
        sunset    = wdata["sys"]["sunset"]
        now       = wdata["dt"]
        daytime   = is_daytime(sunrise, sunset, now)
        time_msg  = "It's daytime there ☀️" if daytime else "It's nighttime there 🌙"

        cute_msg  = temp_message(temp)

        # Desktop notification (optional — works if plyer is supported on OS)
        try:
            notification.notify(
                title=f"Weather Whispers 🌸 — {city}",
                message=f"{temp}°C, {desc} {emoji}\n{cute_msg}",
                timeout=8,
            )
        except Exception:
            pass  # Notification is a bonus; don't crash if it fails

        return jsonify({
            "city":      city,
            "temp":      temp,
            "feels":     feels,
            "humidity":  humidity,
            "wind":      wind,
            "desc":      desc,
            "emoji":     emoji,
            "time_msg":  time_msg,
            "cute_msg":  cute_msg,
            "daytime":   daytime,
        })

    except requests.exceptions.Timeout:
        return jsonify({"error": "Request timed out. Check your internet 💔"}), 500
    except Exception as e:
        return jsonify({"error": f"Something went wrong: {str(e)} 💔"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)