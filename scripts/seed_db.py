import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db.database import engine, SessionLocal, Base
from db.models import Faculty, Location

# Create Tables
Base.metadata.create_all(bind=engine)
db = SessionLocal()

# --- IIIT KALYANI DATA ---
faculty_data = [
    Faculty(name="Dr. Imon Mukherjee", department="CSE", email="imon@iiitkalyani.ac.in", cabin="Room 101"),
    Faculty(name="Dr. Oishila Bandyopadhyay", department="CSE", email="oishila@iiitkalyani.ac.in", cabin="Room 102"),
    Faculty(name="Dr. Uma Das", department="Physics", email="uma@iiitkalyani.ac.in", cabin="Science Block"),
    Faculty(name="Registrar", department="Admin", email="registrar@iiitkalyani.ac.in", cabin="Admin Block"),
]

location_data = [
    Location(name="Webel IT Park", description="The temporary campus of IIIT Kalyani in Nadia district."),
    Location(name="Boys Hostel", description="Located at B-11/14, near Buddha Park."),
    Location(name="Library", description="3rd Floor of the Webel IT Park building."),
    Location(name="Hardware Lab", description="Ground Floor, Room 004."),
]

# Wipe old data & Add new
db.query(Faculty).delete()
db.query(Location).delete()

for f in faculty_data: db.add(f)
for l in location_data: db.add(l)

db.commit()
print("✅ Database Seeded Successfully!")
db.close()
