from django.urls import path
from . import views

urlpatterns = [
    path('inquiry/', views.answer_to_question),
]
