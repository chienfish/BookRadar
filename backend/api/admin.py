from django.contrib import admin
from .models import Book, BookstorePrice, LibraryHolding, Profile, Category

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('isbn', 'title', 'author', 'cover_preview', "description", 'category_path_list')
    search_fields = ('isbn', 'title', 'author')
    ordering = ('title',)
    filter_horizontal = ('categories',)

    def cover_preview(self, obj):
        if obj.cover_url:
            return f'<img src="{obj.cover_url}" style="height:50px;" />'
        return "No Cover"
    cover_preview.allow_tags = True
    cover_preview.short_description = '封面預覽'

    def category_path_list(self, obj):
        return ", ".join(str(cat) for cat in obj.categories.all())
    category_path_list.short_description = '分類'

@admin.register(BookstorePrice)
class BookstorePriceAdmin(admin.ModelAdmin):
    list_display = ('book_title', 'store_name', 'price', 'url')
    search_fields = ('book__title', 'store_name')
    list_filter = ('store_name',)
    ordering = ('book__title', 'price')

    def book_title(self, obj):
        return obj.book.title
    book_title.short_description = '書名'

@admin.register(LibraryHolding)
class LibraryHoldingAdmin(admin.ModelAdmin):
    list_display = ('book_title', 'library_name', 'available', 'location')
    search_fields = ('book__title', 'library_name', 'location')
    list_filter = ('available', 'library_name')
    ordering = ('book__title',)

    def book_title(self, obj):
        return obj.book.title
    book_title.short_description = '書名'

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'avatar')
    search_fields = ('user__username',)
    list_filter = ('user',) 

    fieldsets = (
        (None, {
            'fields': ('user', 'avatar')
        }),
    )

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    search_fields = ('name',)
    list_filter = ('parent',)
