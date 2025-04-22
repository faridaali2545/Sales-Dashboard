from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine
import pandas as pd

app = Flask(__name__)

# Create database engine
db_file = 'store_data.db'
engine = create_engine(f'sqlite:///{db_file}')


@app.route('/')
def index():
    # Render the main dashboard page
    return render_template('index.html')


@app.route('/chart_revenue_by_category')
def chart_revenue_by_category():
    """
    Query Average Revenue by Category
    """
    query = """
        SELECT StoreCategory, AVG(MonthlySalesRevenue) AS AvgRevenue
        FROM StoreData
        GROUP BY StoreCategory
    """
    result = pd.read_sql(query, engine)
    return result.to_json(orient='records')


@app.route('/chart_revenue_by_location')
def chart_revenue_by_location():
    """
    Query Total Revenue by Location
    """
    query = """
        SELECT StoreLocation, SUM(MonthlySalesRevenue) AS TotalRevenue
        FROM StoreData
        GROUP BY StoreLocation
    """
    result = pd.read_sql(query, engine)
    return result.to_json(orient='records')


@app.route('/chart_footfall_vs_size')
def chart_footfall_vs_size():
    """
    Query Footfall vs Store Size
    """
    query = """
        SELECT StoreSize, AVG(CustomerFootfall) AS AvgFootfall
        FROM StoreData
        GROUP BY StoreSize
    """
    result = pd.read_sql(query, engine)
    return result.to_json(orient='records')


@app.route('/chart_store_age_vs_revenue')
def chart_store_age_vs_revenue():
    """
    Query Store Age vs Average Revenue
    """
    query = """
        SELECT StoreAge, AVG(MonthlySalesRevenue) AS AvgRevenue
        FROM StoreData
        GROUP BY StoreAge
    """
    result = pd.read_sql(query, engine)
    return result.to_json(orient='records')


if __name__ == '__main__':
    app.run(debug=True)
