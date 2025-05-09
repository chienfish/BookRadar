from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.CategoryListAPIView.as_view()),
    path("search/", views.BookSearchAPIView.as_view()),
    path("book/<str:isbn>/", views.BookDetailAPIView.as_view()),
]