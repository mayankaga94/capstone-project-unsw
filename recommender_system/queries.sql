-- Useful SQL statements --

-- Select database --
use bookdb;

-- Select a book by its ISBN --
select * from books where isbn=439023483;

-- Select books that match a tag --
select books.title, books.author from books
inner join book_tags on books.isbn=book_tags.isbn
where book_tags.tag_id=100; 

-- Select books in a list of ISBNs in the order of which the ISBNs are presented --
select books.title, books.author from books
where isbn in ('545265355', '439023513', '61935123', '62284835', '802122558')
order by field(isbn, '545265355', '439023513', '61935123', '62284835', '802122558');
