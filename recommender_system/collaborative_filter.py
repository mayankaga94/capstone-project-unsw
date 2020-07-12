
#/usr/bin/python3
import os
import sys
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity

dataset_path = "dataset/goodbooks-10k"

class CFRecommenderSystem:
    def __init__(self):
        self.load_dataset(dataset_path)
        self.similarity_matrix = self.fit()

    def load_dataset(self, dataset_path):
    
        # Paths
        ratings_path = os.path.join(dataset_path, "ratings.csv")
        books_path = os.path.join(dataset_path, "books.csv")

        # Load books dataset
        books = pd.read_csv(books_path, encoding = "ISO-8859-1")
        books['author'] = books['authors'].apply(lambda x:  x.split(',')[0]) # Only use name of main author
        books = books[['book_id', 'goodreads_book_id', 'title', 'average_rating', 'author']]
        self.books = books
        
        # Load ratings dataset
        self.ratings = pd.read_csv(ratings_path)
        
        # Mapping from index to book_id and vice versa
        self.index_to_book = {}
        self.book_to_index = {}
        for index, book_id in enumerate(self.books['book_id'].values):
          self.index_to_book[index] = book_id
          self.book_to_index[book_id] = index
        
        
    def fit(self):

        user_book_matrix = self.ratings.pivot_table(index='book_id', columns='user_id', values='rating')
        user_book_matrix.fillna(0, inplace=True)
        similarity_matrix = cosine_similarity(user_book_matrix.to_numpy())
        
        return similarity_matrix
        
    
    
    def get_recommendations(self, book_id, count=5, verbose=True):
        print("Input Book:")
        print(self.books[self.books['book_id'] == book_id][['book_id', 'title', 'author', 'average_rating']].set_index('book_id').to_string())
        idx = self.book_to_index[book_id]
        book_indices = np.argsort(self.similarity_matrix[idx])[::-1][1:count + 1]
        recommendations = self.books.iloc[book_indices][['book_id', 'title', 'author', 'average_rating']].set_index('book_id')
        
        if verbose:
            print("\nRecommendations:")
            print(recommendations.to_string())
            
        return recommendations

        

if __name__ == '__main__':
    # Construct model
    rs = CFRecommenderSystem()
    
    # Get recommendations
    while True:
        print('===============================================================================')
        print("Enter book ID and the number of recommendations to display (or 'q' to exit):")
        input_str = input() 
        
        if input_str == 'q':
            sys.exit()
            
        input_values = input_str.split()
        if len(input_values) != 2 or not input_values[0].isdigit or not input_values[1].isdigit:
            print('Invalid input')
            continue 
        recommendations = rs.get_recommendations(int(input_values[0]), int(input_values[1]))
