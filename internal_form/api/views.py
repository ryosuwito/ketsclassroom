from django.views import View
from django.shortcuts import render
from custom_form.views import form_create_view, form_detail_view, form_edit_view, form_list_view
from assignment.views import assignment_detail_view, assignment_list_view
from assignment.views import assignment_group_create_view, assignment_group_detail_view, assignment_group_edit_view, assignment_group_list_view
from responder.views import responder_group_create_view, responder_group_detail_view, responder_group_edit_view, responder_group_list_view



class FormCreateView(View):
    def post(self,request,*args,**kwargs):
        return form_create_view(request=request, *args, **kwargs)
        
class FormEditView(View):
    def post(self,request,*args,**kwargs):
        return form_edit_view(request=request, *args, **kwargs)

class FormDetail(View):
    def get(self,request,*args,**kwargs):
        return form_detail_view(request=request, *args, **kwargs)

class FormListView(View):
    def get(self,request,*args,**kwargs):
        return form_list_view(request=request, *args, **kwargs)

class AssignmentDetail(View):
    def get(self,request,*args,**kwargs):
        return assignment_detail_view(request=request, *args, **kwargs)

class AssignmentListView(View):
    def get(self,request,*args,**kwargs):
        return assignment_list_view(request=request, *args, **kwargs)

class AssignmentGroupCreateView(View):
    def post(self,request,*args,**kwargs):
        return assignment_group_create_view(request=request, *args, **kwargs)
        
class AssignmentGroupEditView(View):
    def post(self,request,*args,**kwargs):
        return assignment_group_edit_view(request=request, *args, **kwargs)

class AssignmentGroupDetail(View):
    def get(self,request,*args,**kwargs):
        return assignment_group_detail_view(request=request, *args, **kwargs)

class AssignmentGroupListView(View):
    def get(self,request,*args,**kwargs):
        return assignment_group_list_view(request=request, *args, **kwargs)


class ResponderGroupCreateView(View):
    def post(self,request,*args,**kwargs):
        return responder_group_create_view(request=request, *args, **kwargs)
        
class ResponderGroupEditView(View):
    def post(self,request,*args,**kwargs):
        return responder_group_edit_view(request=request, *args, **kwargs)

class ResponderGroupDetail(View):
    def get(self,request,*args,**kwargs):
        return responder_group_detail_view(request=request, *args, **kwargs)

class ResponderGroupListView(View):
    def get(self,request,*args,**kwargs):
        return responder_group_list_view(request=request, *args, **kwargs)