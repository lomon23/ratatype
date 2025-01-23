from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Головна сторінка
    path('test/', views.test, name='test'),  # Сторінка тесту
]
