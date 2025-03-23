from django.contrib import admin
from .models import Books, AdminUser, Author, Category

admin.site.register(Books)
admin.site.register(Author)
admin.site.register(Category)
admin.site.register(AdminUser)