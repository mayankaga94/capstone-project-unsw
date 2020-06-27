
#/usr/bin/python3
import os
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity

dataset_path = "dataset/goodbooks-10k"

class CFRecommenderSystem:
    def __init__(self):
        self.load_dataset(dataset_path)
        self.similarity_matrix = self.item_based_collaborative_filter(self.ratings)

    def load_dataset(self, dataset_path):
        '''
        Returns two dataframes:
        books (book_id, title, author)
        ratings (user_id, book_id, rating)
        '''
    
        # Paths
        ratings_path = os.path.join(dataset_path, "ratings.csv")
        books_path = os.path.join(dataset_path, "books.csv")

        # Load books dataset
        books = pd.read_csv(books_path, encoding = "ISO-8859-1")
        books = books[['book_id', 'authors', 'title']]
        books['author'] = books['authors'].apply(lambda x:  x.split(',')[0]) # Only use name of main author
        books.drop(['authors'], axis=1, inplace=True)
        self.books = books
        
        # Load ratings dataset
        self.ratings = pd.read_csv(ratings_path)
        
        # Mapping from index to user_id and vice versa
        self.index_to_book = {}
        self.book_to_index = {}
        for index, book_id in enumerate(self.books['book_id'].values):
          self.index_to_book[index] = book_id
          self.book_to_index[book_id] = index
        
        
    def item_based_collaborative_filter(self, ratings):
        '''
        Represents each book by a vector of user ratings,
        which is used to obtain a (10'000, 10'000) similarity
        matrix. (This takes 0.8Gb of RAM). 
        '''
        user_book_matrix = ratings.pivot_table(index='book_id', columns='user_id', values='rating')
        user_book_matrix.fillna(0, inplace=True)
        similarity_matrix = cosine_similarity(user_book_matrix.to_numpy())
        return similarity_matrix
        
        
    def print_book(self, book_id):
        author, title = self.books[self.books['book_id']==book_id][['author', 'title']].values[0]
        print("BookID:", book_id)
        print("Title", title)
        print("Author:", author)
        print("===========================================")
    
    
    def get_recommendations(self, book_id, count=5):
        print("Input Book:")
        self.print_book(book_id)
        print("Recommendations:")
        recommendations = [self.print_book(self.index_to_book[i]) for i in np.argsort(self.similarity_matrix[self.book_to_index[book_id]])[-(count + 2):-2][::-1]]
        return recommendations

        

if __name__ == '__main__':
    rs = CFRecommenderSystem()
    rs.get_recommendations(99, 5)
