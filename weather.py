import requests
from plyer import notification
import time

api_key = "e0181304258a2f2465a5d516427d7f56"

cities = ["Chennai", "Mumbai", "Delhi", "Kolkata", "Bangalore"]

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
    else:
        return "🌦️"

def temp_message(temp):
    if temp > 35:
        return "It’s hot! Stay hydrated 💦"
    elif temp < 20:
        return "Brrr… Stay cozy! 🧣"
    else:
        return "Perfect weather to chill 😎"

print("Pick a city from the list:")
for i, c in enumerate(cities, 1):
    print(f"{i}. {c}")

choice = int(input("Enter the number of your city: "))
city = cities[choice - 1]

refresh = int(input("Enter notification refresh rate in seconds (e.g., 600 = 10 min): "))

def get_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    try:
        response = requests.get(url)
        data = response.json()

        if data.get("main"):
            temp = data["main"]["temp"]
            desc = data["weather"][0]["description"]
            emoji = get_weather_emoji(desc)
            note = temp_message(temp)

            return f"{city}, IN: {temp}°C, {desc} {emoji}\n{note}"

        else:
            return f"Could not fetch weather for {city}!"

    except:
        return "Error fetching weather. Check your internet connection 💔"

print("\nStarting weather notifications... Press Ctrl+C to stop 💖\n")

while True:
    weather_info = get_weather(city)
    print(weather_info)  
    notification.notify(
        title="Weather Update 🌸",
        message=weather_info,
    )
    time.sleep(refresh)