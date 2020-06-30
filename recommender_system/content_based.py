
#/usr/bin/python3
import os
import pandas as pd
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

dataset_path = "dataset/goodbooks-10k"

class ContextRecommenderSystem:
    def __init__(self):
        self.load_dataset(dataset_path)
        self.similarity_matrix = self.fit()
        

    def load_dataset(self, dataset_path):

        # Paths
        books_path = os.path.join(dataset_path, "books.csv")
        tags_path = os.path.join(dataset_path, "tags.csv")
        book_tags_path = os.path.join(dataset_path, "book_tags.csv")
        
        # Load tags dataset
        self.tags = pd.read_csv(tags_path)
        
        # Load book tags dataset
        self.book_tags = pd.read_csv(book_tags_path)

        # Load books dataset
        books = pd.read_csv(books_path, encoding = "ISO-8859-1")
        books['author'] = books['authors'].apply(lambda x:  x.split(',')[0]) # Only use name of main author
        books = books[['book_id', 'goodreads_book_id', 'title', 'average_rating', 'author']]
        
        all_features = pd.merge(self.book_tags, self.tags, on='tag_id')
        all_features = pd.merge(books, all_features, on='goodreads_book_id')
        all_features = all_features.groupby('book_id')['tag_name'].apply(' '.join).reset_index()
        books['all_features'] = books['author'].apply(lambda x: x.replace(' ','')) + ' ' + books['title'] + ' ' + all_features['tag_name']

        self.books = books
        
        # Mapping from index to book_id and vice versa
        self.index_to_book = {}
        self.book_to_index = {}
        for index, book_id in enumerate(self.books['book_id'].values):
          self.index_to_book[index] = book_id
          self.book_to_index[book_id] = index
        
    def fit(self):
        vectorizer = TfidfVectorizer(analyzer='word',ngram_range=(1,1),min_df=0.002, stop_words='english')
        book_feature_matrix = vectorizer.fit_transform(self.books['all_features'])
        similarity_matrix = linear_kernel(book_feature_matrix, book_feature_matrix)

        return similarity_matrix
    
    def get_recommendations(self, book_id, count=5, verbose=True):
        print("Input book:")
        print(self.books[self.books['book_id'] == book_id][['book_id', 'title', 'author', 'average_rating']].set_index('book_id').to_string())
        idx = self.book_to_index[book_id]
        book_indices = np.argsort(self.similarity_matrix[idx])[::-1][1:count + 1]
        recommendations = self.books.iloc[book_indices][['book_id', 'title', 'author', 'average_rating']].set_index('book_id')
        
        if verbose:
            print("\nRecommendations:")
            print(recommendations.to_string())
            
        return recommendations

        

if __name__ == '__main__':
    rs = ContextRecommenderSystem()
    recommendations = rs.get_recommendations(99, 5)
