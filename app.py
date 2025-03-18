from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(__name__)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",  # Change if you have a different MySQL user
    password="",  # Add your MySQL password here
    database="venue_booking"
)

cursor = db.cursor(dictionary=True)

# Fetch available venues
@app.route('/fetch_venues', methods=['GET'])
def fetch_venues():
    capacity_group = request.args.get('capacity_group')
    cursor.execute("SELECT * FROM venues WHERE capacity_group = %s AND booked = FALSE", (capacity_group,))
    available_venues = cursor.fetchall()
    return jsonify(available_venues)

# Book a venue
@app.route('/book_venue', methods=['POST'])
def book_venue():
    data = request.get_json()
    lecturer_name = data.get("lecturer_name")
    course_title = data.get("course_title")
    booking_time = data.get("booking_time")
    department = data.get("department")
    venue_id = data.get("venue_id")

    if not all([lecturer_name, course_title, booking_time, department, venue_id]):
        return "Error: Missing booking details", 400

    # Mark venue as booked
    cursor.execute("UPDATE venues SET booked = TRUE WHERE id = %s", (venue_id,))
    db.commit()

    return f"Venue booked successfully for {lecturer_name} ({course_title}) at {booking_time} in {department}!"

# Serve the HTML frontend
@app.route('/')
def home():
    return render_template("capacity_venue.html")

if __name__ == '__main__':
    app.run(debug=True)
