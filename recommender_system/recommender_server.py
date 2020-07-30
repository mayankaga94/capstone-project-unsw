from content_based import *
import zmq
import json

#from sqlalchemy import create_engine
#import pymysql

# Connect to db (check test.ipynb to see how db is setup)
PORT = 8080
#MYSQL_USER = 'username'
#MYSQL_PASS = 'password'
#dbname = "bookdb"
#engine = create_engine(f'mysql+pymysql://{MYSQL_USER}:{MYSQL_PASS}@localhost')
#engine.execute("USE {}".format(dbname))

dataset_path = "../dataset/goodbooks-10k"
# Train recommender
rs = ContentRecommenderSystem(dataset_path)
#rs.load_from_db(engine) #rs.load_from_csv(dataset_path)
#rs.fit()
print('Recommender System ready!')

# Establish communication channel
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind(f"tcp://*:{PORT}")
print(f'Server available at port {PORT}')

while True:
    # Receive request for recommendation
    message = socket.recv()
    message_str = message.decode('utf-8')
    message_dict = json.loads(message_str)
    print("Received request: %s" % message)
    
    # Todo: handle request to retrain
    # rs.load_from_db(engine)
    # rs.fit()
    
    # Handle bad request
    try:
        book_ids = message_dict['book_ids'] #isbn
        tag_ids = [int(x) for x in message_dict['tag_ids']] 
        count = int(message_dict['count'])
    except (KeyError, ValueError) as e:
        print('Invalid request.')
        socket.send(b"Invalid request.")
        continue
    
    # Obtain recommendations (just the book ids)
    recommendations = rs.get_recommendations(book_ids, tag_ids, count)
    
    # Send reply to request
    socket.send(str(recommendations).encode('utf-8'))    
        