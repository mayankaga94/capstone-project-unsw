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
1. __collaborative_filter.py (deprecated)__
2. __content_based.py__: Contains content-based recommender class responsible for making recommendations.
3. __recommender_server.py__: Upon running the script, a server will be created that contains the recommender. Requests can be made to the server which responds with recommendations in the form of a list of ISBNs.
4. __test.ipynb__: Sets up the MySQL database by converting the `.csv` files into MySQL tables and then tests that the recommender system is able to read from the newly created database.
5. __queries.sql__: Contains some useful SQL statements that can be used by the client to filter or display recommendations.

# Instructions
___
1. First create a MySQL user.
2. Open `test.ipynb` and modify `MYSQL_USER` and `MYSQL_PASS` to your MySQL user. Run the remaining cells to create a database called `bookdb` and populate it.
3. `cd test_client` and `npm install` the dependencies.
4. Open two terminals. In the first terminal, run the server: `python recommender_server.py`. Once the server is running, run the client in the second terminal: `python test_client/test_client.js`. This will send requests to the server of the form `{"book_ids": [isbn1, isbn2, ...], "tag_ids": [tagid1, tagid2, ...], "count": number of recommendations}`. The server will respond with a list of `count` ISBNs in the order of most recommended to least.
