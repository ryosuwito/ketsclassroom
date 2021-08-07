from django.urls import path
from .views import CreateView, EditView, SurveyView, SurveyListView

urlpatterns = [
    path('create/', CreateView.as_view()),
    path('edit/<str:slug>/', EditView.as_view()),
    path('survey/<int:id>/', SurveyView.as_view()),
    path('surveys/<int:limit>/<int:offset>', SurveyListView.as_view())
]
