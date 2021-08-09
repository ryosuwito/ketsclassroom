from django.urls import path
from .views import FormCreateView, FormEditView, FormDetail, FormListView
from .views import AssignmentDetail, AssignmentListView
from .views import AssignmentGroupCreateView, AssignmentGroupEditView, AssignmentGroupDetail, AssignmentGroupListView
from .views import ResponderGroupCreateView, ResponderGroupEditView, ResponderGroupDetail, ResponderGroupListView



urlpatterns = [
    path('create/', FormCreateView.as_view()),
    path('edit/<str:slug>/', FormEditView.as_view()),
    path('survey/<int:id>/', FormDetail.as_view()),
    path('surveys/<int:limit>/<int:offset>', FormListView.as_view()),
    path('assignment/<int:id>/', AssignmentDetail.as_view()),
    path('assignments/<int:limit>/<int:offset>', AssignmentListView.as_view()),  
    path('assignment-group/create/', AssignmentGroupCreateView.as_view()),
    path('assignment-group/edit/<str:slug>/', AssignmentGroupEditView.as_view()),
    path('assignment-group/<int:id>/', AssignmentGroupDetail.as_view()),
    path('assignment-groups/<int:limit>/<int:offset>', AssignmentGroupListView.as_view()),  
    path('responder-group/create/', ResponderGroupCreateView.as_view()),
    path('responder-group/edit/<str:slug>/', ResponderGroupEditView.as_view()),
    path('responder-group/<int:id>/', ResponderGroupDetail.as_view()),
    path('responder-groups/<int:limit>/<int:offset>', ResponderGroupListView.as_view()),  
]
