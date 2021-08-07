from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.views import View
from django.shortcuts import render
from datetime import datetime, timedelta
from custom_form.models import CustomForm
from django.forms.models import model_to_dict

import json

def convert_date(timestamp_data):
    return timestamp_data.strftime("%d/%m/%Y")

class CreateView(View):
    def post(self,request,*args,**kwargs):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        try:
            cform = CustomForm.objects.get(id=body['surveyId'])
        except Exception as e:
            print(e)
            cform = CustomForm()
        cform.title = body['title']
        cform.description = body['description']
        cform.question = body['question']
        cform.save()
        response = {
            "status":"OK",
            "survey_url": cform.slug,
            "title":cform.title,
            "description":cform.description
        }
        return JsonResponse(response, safe=False)
class EditView(View):
    def post(self,request,*args,**kwargs):
        return render(request, 'home.html', {
            #argumennts
        })
class SurveyView(View):
    def get(self,request,*args,**kwargs):
        c_form =  CustomForm.objects.get(id=kwargs['id'])
        return JsonResponse(model_to_dict(c_form), status=200, safe=False)

class SurveyListView(View):
    def get(self,request,*args,**kwargs):
        offset = kwargs['offset']
        limit = kwargs['limit']
        if offset < 0:
            offset = 0
        if limit < 0:
            limit = 1
        c_forms = CustomForm.objects.all()
        print(c_forms.count())
        pages = int(c_forms.count() / limit) + 1
        surveys_queryset = c_forms[offset:offset+limit]
        surveys = [x for x in surveys_queryset.values()]
        for s in surveys:
            s["created_at"] = datetime.strftime(s["created_at"], "%H:%M %d/%m/%Y")
        response = {
            "pages":pages,
            "data":surveys
        }
        return JsonResponse(response, status=200, safe=False)
