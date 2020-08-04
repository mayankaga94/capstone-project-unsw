
#!/usr/bin/python3
import os
import sys
import pandas as pd
import numpy as np
from collections import defaultdict

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

dataset_path = "../database"

class ContentRecommenderSystem:
    def __init__(self, dataset_path=None):
        if dataset_path is not None:
            self.load_from_csv(dataset_path)    
            self.fit()
    # Mapping from index to isbn and vice versa
    def set_index_mapping(self):
        self.index_to_isbn13 = {}
        self.isbn13_to_index = {}
        for index, isbn13 in enumerate(self.books['ISBN'].values):
            self.index_to_isbn13[index] = isbn13
            self.isbn13_to_index[isbn13] = index

    # Combine all features into one
    def get_combined_feature(self, books_df):
        return books_df['title'] + ' ' + books_df['author'].apply(lambda x: x.replace(' ', '')) + ' ' + books_df['description'] + ' ' + books_df['genre']


    # Load dataset from csv
    def load_from_csv(self, dataset_path):
        # Paths
        books_path = os.path.join(dataset_path, "Book_dataset.csv")

        # Load tables
        books = pd.read_csv(books_path, encoding = "ISO-8859-1")
        books = books.drop_duplicates(subset ="ISBN", 
                     keep = False, inplace = True) 
        books = books.dropna(inplace=True)
        
        self.books = books
        self.set_index_mapping()
        
        
    # Load dataset from db      
    def load_from_db(self, engine):
        # Load tables
        books = pd.read_sql("SELECT * FROM books", con=engine)
        books.dropna(inplace=True)
        
        self.books = books
        self.set_index_mapping()
        
        
    # Gets the similarity matrix for books    
    def fit(self):
        vectorizer = TfidfVectorizer(analyzer='word',ngram_range=(1,1),min_df=0.002, stop_words='english')
        book_feature_matrix = vectorizer.fit_transform(self.get_combined_feature(self.books)) # each row represents a book
        self.similarity_matrix = linear_kernel(book_feature_matrix, book_feature_matrix) # [x,y] represents the similarity between book x and y
    
        
    def get_recommendations(self, book_ids, tag_ids, count=5, verbose=False):
    
        try:
            indices = [self.isbn13_to_index[isbn13] for isbn13 in map(int, book_ids)]
        except KeyError:
            indices = [] 
        score = np.sum(self.similarity_matrix[indices], axis=0)
        
        # Genre of input books
        genre_count = dict()
        for genre in list(self.books[self.books['ISBN'].isin(book_ids)]['genre']):
          genre_count[genre] = genre_count.get(genre, 0) + 1
        
        # Give more weight to books with same genre
        genre_weight = 0.2
        for i, isbn13 in self.index_to_isbn13.items():
            genre = self.books[self.books['ISBN'] == isbn13]['genre'].values[0]
            if genre in genre_count:
                score[i] += genre_weight * genre_count[genre] / len(book_ids)
        
        # then get top argmax indices that are not input
        book_indices = [i for i in np.argsort(score) if i not in indices][::-1][:count]
        
        # Get recommendations
        try:
            book_isbns = [str(int(self.books.iloc[i]['ISBN'])) for i in book_indices]
        except ValueError:
            print('ISBN can only contain numbers.') # since our smaller dataset only has ISBNs with numbers
        
        # Print recommendations and then return
        if verbose:
            print("Input books:")
            print(self.books.iloc[indices,:][['ISBN', 'title', 'author', 'rating', 'genre']].set_index('ISBN').to_string())
            
            print("\nRecommendations:")
            print(self.books.iloc[book_indices][['ISBN', 'title', 'author', 'rating', 'genre']].set_index('ISBN').to_string())
        

        # Return recommendations
        return book_isbns

        

if __name__ == '__main__':
    # Construct model
    rs = ContentRecommenderSystem()
    rs.load_from_csv(dataset_path)
    rs.fit()
    
    # Get recommendations
    tag_ids = [] # No tag ids for this dataset
    while True:
        print('===============================================================================')
        print("Enter ISBNs separated by a space (or 'q' to exit):")
        input_str = input()
        if input_str == 'q':
            sys.exit()
            
        try:
            book_ids = list(input_str.split())
        except:
            print("Invalid input")
            continue
        
        
        print("Enter the number of recommendations to display (or 'q' to exit):")
        input_str = input()
        if input_str == 'q':
            sys.exit()
            
        if input_str.isdigit:
            nb_recommendations = int(input_str)
        else:
            print('Invalid input')
            continue
        
            
        recommendations = rs.get_recommendations(book_ids, tag_ids, nb_recommendations, True)
        '''
        Books similar to The Hunger Games and Harry Potter and the Philosopher's Stone that include a love triangle
        
        Enter ISBNs separated by a space (or 'q' to exit):
        9780316015844 9780545010221
        
        Enter the number of recommendations to display (or 'q' to exit):
        10
        '''
        