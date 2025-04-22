import sqlite3
import pandas as pd

# Load the CSV file
data = pd.read_csv("C:/Users/HP/.vscode/Project DSAI 203/data/Store_CA.csv")


# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('store_data.db')
cursor = conn.cursor()

# Create table schema
create_table_query = """
CREATE TABLE IF NOT EXISTS StoreData (
    ProductVariety INTEGER,
    MarketingSpend INTEGER,
    CustomerFootfall INTEGER,
    StoreSize INTEGER,
    EmployeeEfficiency REAL,
    StoreAge INTEGER,
    CompetitorDistance INTEGER,
    PromotionsCount INTEGER,
    EconomicIndicator REAL,
    StoreLocation TEXT,
    StoreCategory TEXT,
    MonthlySalesRevenue REAL
);
"""
cursor.execute(create_table_query)

# Insert data into the table
data.to_sql('StoreData', conn, if_exists='replace', index=False)

# Commit changes and close connection
conn.commit()
try:
    data.to_sql('StoreData', conn, if_exists='replace', index=False)
    print("Data inserted successfully into StoreData table.")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    conn.close()
