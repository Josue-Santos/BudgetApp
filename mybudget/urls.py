from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("",views.index, name="index"),
    path("login",views.login_view, name="login"),
    path("logout",views.logout_view, name="logout"),
    path("register",views.register,name="register"),
    path("budget",views.budget, name ="budget"),
    path("budget/<str:name>",views.getbudget, name="getbudget"),
    path("deletebudget/<str:name>",views.deletebudget, name ="deletebudget"),
    path("addentry/<str:title>/<str:amount>/<str:category>",views.addentry, name="addentry"),
    path("removeentry/<int:id>",views.removeentry, name="removeentry"),
  

]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


