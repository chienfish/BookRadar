from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        related_name='children',
        on_delete=models.CASCADE
    )

    def __str__(self):
        if self.parent:
            return f"{self.parent} > {self.name}"
        return self.name

class Book(models.Model):
    isbn = models.CharField(max_length=13, primary_key=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    cover_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    categories = models.ManyToManyField("Category", related_name="books", blank=True)

    def __str__(self):
        return f"{self.title} ({self.isbn})"

class BookstorePrice(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="prices")
    store_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    url = models.URLField()

    class Meta:
        unique_together = ("book", "store_name")

    def __str__(self):
        return f"{self.book.title} - {self.store_name}: ${self.price}"

class LibraryHolding(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="holdings")
    library_name = models.CharField(max_length=100)
    available = models.BooleanField(default=False)
    location = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        unique_together = ("book", "library_name")

    def __str__(self):
        status = "可借" if self.available else "不可借"
        return f"{self.book.title} @ {self.library_name} - {status}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def __str__(self):
        return self.user.username
