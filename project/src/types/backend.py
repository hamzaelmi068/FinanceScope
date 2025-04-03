from fastapi import FastAPI
import requests

app = FastAPI()

# Example endpoint for fetching city data
@app.get("/get_city_data")
def get_city_data(city: str):
    # Replace with RapidAPI call or custom logic
    response = requests.get(f"https://api.example.com/city-data?city={city}")
    return response.json()

# Endpoint to compare two cities
@app.get("/compare_cities")
def compare_cities(city1: str, city2: str):
    # Mock comparison logic
    data = {
        "city1": {"rent": 1200, "utilities": 150, "groceries": 300},
        "city2": {"rent": 900, "utilities": 130, "groceries": 250},
    }
    return data
