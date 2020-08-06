# Python dependencies
___
`pip install pandas`

`pip install SQLAlchemy`

`pip install sklearn`

`pip install zmq`

`pip install pymysql`

Alternatively:
`pip install -r requirements.txt`


# Files and subdirectories
___
## Directories:
1. __test_client__: Contains code to run a test client that sends requests to the Python recommender server.

## Files:
1. __content_based2.py__: Contains content-based recommender class responsible for making recommendations. Uses smaller dataset and does not use tags to make recommendations. Use this if we use the dataset `Database/Book_dataset.csv`.
2. __recommender_server.py__: Upon running the script, a server will be created that contains the recommender. Requests can be made to the server which responds with recommendations in the form of a list of ISBNs.



