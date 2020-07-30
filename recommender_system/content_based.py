
#!/usr/bin/python3
import os
import sys
import pandas as pd
import numpy as np
from collections import defaultdict
from sqlalchemy import create_engine

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

dataset_path = "../dataset/goodbooks-10k"

class ContentRecommenderSystem:
    def __init__(self, dataset_path=None):
        if dataset_path is not None:
            self.load_from_csv(dataset_path)    
            self.fit()
        
    # Mapping from index to isbn and vice versa
    def set_index_mapping(self):
        self.index_to_book = {}
        self.book_to_index = {}
        for index, book_id in enumerate(self.books['ISBN'].values):
          self.index_to_book[index] = book_id
          self.book_to_index[book_id] = index
          
        self.book_tags_dict = defaultdict(list)
        for i in range(len(self.book_tags)):
            self.book_tags_dict[self.book_tags['ISBN'].iloc[i]].append(self.book_tags['tag_id'].iloc[i])

    # Combine all features into one
    def get_combined_feature(self, book_df):
        all_features = pd.merge(self.book_tags, self.tags, on='tag_id')
        all_features = pd.merge(book_df, all_features, on='ISBN')
        all_features = all_features.groupby('ISBN')['tag_name'].apply(' '.join).reset_index()
        return book_df['author'].apply(lambda x: x.replace(' ','')) + ' ' + book_df['title'] + ' ' + all_features['tag_name']


    # Load dataset from csv
    def load_from_csv(self, dataset_path):
        # Paths
        books_path = os.path.join(dataset_path, "final_books.csv")
        tags_path = os.path.join(dataset_path, "final_tags.csv")
        book_tags_path = os.path.join(dataset_path, "final_book_tags.csv")
        
        # Load tables
        self.tags = pd.read_csv(tags_path)
        self.book_tags = pd.read_csv(book_tags_path)
        books = pd.read_csv(books_path, encoding = "ISO-8859-1")
        
        # New feature containing combination of other features
        books['all_features'] = self.get_combined_feature(books)

        self.books = books
        self.set_index_mapping()
        
        
    # Load dataset from db      
    def load_from_db(self, engine):
        # Load tables
        self.tags = pd.read_sql("SELECT * FROM tags", con=engine)
        self.book_tags = pd.read_sql("SELECT * FROM book_tags", con=engine)
        books = pd.read_sql("SELECT * FROM books", con=engine)
        
        # New feature containing combination of other features
        books['all_features'] = self.get_combined_feature(books)
        
        self.books = books
        self.set_index_mapping()
        
    # Gets the similarity matrix for books    
    def fit(self):
        vectorizer = TfidfVectorizer(analyzer='word',ngram_range=(1,1),min_df=0.002, stop_words='english')
        book_feature_matrix = vectorizer.fit_transform(self.books['all_features']) # each row represents a book
        self.similarity_matrix = linear_kernel(book_feature_matrix, book_feature_matrix) # [x,y] represents the similarity between book x and y
    
        
    def get_recommendations(self, book_ids, tag_ids, count=5, verbose=False):
        # Have each book contribute to a total score
        indices = [self.book_to_index[book_id] for book_id in book_ids]
        score = np.sum(self.similarity_matrix[indices], axis=0)

        # then get top argmax indices that are not input
        mask = self.books['ISBN'].apply(lambda x: all(e in self.book_tags_dict[x] for e in tag_ids))
        book_indices = [i for i in np.argsort(score) if i not in indices][::-1]
        book_indices = [i for i in book_indices if mask[i]][:count]

        # Return recommendations by book indices
        if verbose == False:
            book_isbns = [self.books.iloc[i]['ISBN'] for i in book_indices][:count]
            return book_isbns
        
        # Return the dataframe and print results
        recommendations = self.books.iloc[book_indices][['ISBN', 'title', 'author', 'rating']].set_index('ISBN')
        
        print("Input books:")
        print(self.books.iloc[indices,:][['ISBN', 'title', 'author', 'rating']].set_index('ISBN').to_string())
        
        print("\nRecommendations:")
        print(recommendations.to_string())
            
        return recommendations

        

if __name__ == '__main__':
    # Construct model
    rs = ContentRecommenderSystem()
    rs.load_from_csv(dataset_path)
    rs.fit()
    
    # Get recommendations
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
        
        print("Enter tag IDs separated by a space (or 'q' to exit):")
        input_str = input()
        if input_str == 'q':
            sys.exit()
        try:       
            tag_ids = list(map(int, input_str.split()))
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
        439023483 439554934
        Enter tag IDs separated by a space (or 'q' to exit):
        100
        Enter the number of recommendations to display (or 'q' to exit):
        10
        '''
        