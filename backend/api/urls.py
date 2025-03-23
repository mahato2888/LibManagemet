from django.urls import path
from .views import (
    admin_signup, admin_login,
    list_authors, create_author,
    list_categories, create_category,
    list_books, create_book, book_detail
)

urlpatterns = [
    # Admin Authentication
    path("admin/signup/", admin_signup, name="admin-signup"),
    path("admin/login/", admin_login, name="admin-login"),

    # Authors
    path("authors/", list_authors, name="list-authors"),
    path("authors/create/", create_author, name="create-author"),

    # Categories
    path("categories/", list_categories, name="list-categories"),
    path("categories/create/", create_category, name="create-category"),

    # Books
    path("books/", list_books, name="list-books"),
    path("books/create/", create_book, name="create-book"),
    path("books/<int:book_id>/", book_detail, name="book-detail"),
]
