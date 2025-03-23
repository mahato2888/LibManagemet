from rest_framework import serializers
from .models import Books, Author, Category
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

AdminUser = get_user_model()

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class BooksSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = CategorySerializer(many=True, read_only=True)

    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(), write_only=True
    )
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True
    )

    class Meta:
        model = Books
        fields = [
            "id", "title", "description", "author", "author_id",
            "category", "category_ids", "published_date", "created_at", "updated_at"
        ]

    def create(self, validated_data):
        author = validated_data.pop("author_id")
        categories = validated_data.pop("category_ids")
        book = Books.objects.create(author=author, **validated_data)
        book.category.set(categories)
        return book

    def update(self, instance, validated_data):
        instance.author = validated_data.pop("author_id", instance.author)
        category_ids = validated_data.pop("category_ids", None)

        if category_ids is not None:
            instance.category.set(category_ids)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

class AdminSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ["id", "email", "password", "first_name", "last_name"]

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
