from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Book, BookstorePrice, LibraryHolding, Category

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.StringRelatedField()

    class Meta:
        model = Category
        fields = ["id", "name", "parent"]

class BookSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ["isbn", "title", "author", "cover_url", "description", "categories"]
        extra_kwargs = {"isbn": {"read_only": True}}

class BookstorePriceSerializer(serializers.ModelSerializer):
    book = serializers.StringRelatedField()

    class Meta:
        model = BookstorePrice
        fields = ["id", "book", "store_name", "price", "url"]

class LibraryHoldingSerializer(serializers.ModelSerializer):
    book = serializers.StringRelatedField()

    class Meta:
        model = LibraryHolding
        fields = ["id", "book", "library_name", "available", "location"]
