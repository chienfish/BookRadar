from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from api.views import CreateUserView, CurrentUserView, ChangePasswordView, AvatarUploadView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
    path("api/user/info/", CurrentUserView.as_view(), name="current_user"),
    path("api/user/change-password/", ChangePasswordView.as_view(), name="change_password"),
    path("api/user/upload-avatar/", AvatarUploadView.as_view(), name="upload-avatar"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
