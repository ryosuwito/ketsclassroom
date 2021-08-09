from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.shortcuts import render
from datetime import datetime, timedelta
from assignment.models import Assignment, AssignmentGroup
from custom_form.models import CustomForm
from responder.models import ResponderGroup
from django.forms.models import model_to_dict

import json

def convert_date(timestamp_data):
    return timestamp_data.strftime("%d/%m/%Y")

def assignment_group_create_view(request,*args,**kwargs):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    # try : 
    #     form = CustomForm.objects.get(id=body['form_id'])
    # except Exception as e:
    #     print(e)
    #     response = {
    #         "status":"ERR",
    #         "message":"Form not found"
    #     }
    #     return JsonResponse(response, status=400, safe=False)

    # time_limit = body['time_limit']
    cAssignmentGroup = AssignmentGroup()
    cAssignmentGroup.title = body['title']
    cAssignmentGroup.description = body['description']
    cAssignmentGroup.save()

    # for assignment in body['assignments']:
    #     responder_group_id = assignment['responder_group_id']
    #     valid_on = assignment['valid_on']
    #     valid_on = datetime.strptime(valid_on,"dd/MM/yyyy HH:mm")
    #     valid_until = valid_on + timedelta(minutes=time_limit)
    #     try:
    #         responder_group = ResponderGroup.objects.get(id=responder_group_id)
    #     except Exception as e:
    #         print(e)
    #         responder_group = None
    #     if responder_group :
    #         cAssignment = Assignment()
    #         cAssignment.title = "-".join([cAssignmentGroup.slug, responder_group.name])
    #         cAssignment.group = cAssignmentGroup
    #         cAssignment.form = form
    #         cAssignment.valid_on = valid_on
    #         cAssignment.valid_until = valid_until
    #         cAssignment.time_limit = time_limit
    #         cAssignment.save()
    #     else :
    #         continue

    response = {
        "status":"OK",
        "survey_url": cAssignmentGroup.slug,
        "title":cAssignmentGroup.title,
        "description":cAssignmentGroup.description
    }
    return JsonResponse(response, status=200, safe=False)
        
def assignment_group_edit_view(request,*args,**kwargs):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    try:
        eAssignmentGroup = AssignmentGroup.objects.get(slug=kwargs['slug'])
    except Exception as e:
        print(e)
        response = {
            "status":"Error",
            "message":"AssignmentGroup not found"
        }
        return JsonResponse(response, status=400, safe=False)
    eAssignmentGroup.title = body['title']
    eAssignmentGroup.description = body['description']
    eAssignmentGroup.save()
    response = {
        "status":"OK",
        "survey_url": eAssignmentGroup.slug,
        "title":eAssignmentGroup.title,
        "description":eAssignmentGroup.description
    }
    return JsonResponse(response, safe=False)


def assignment_detail_view(request,*args,**kwargs):
    assignment =  Assignment.objects.get(id=kwargs['id'])
    return JsonResponse(model_to_dict(assignment), status=200, safe=False)

def assignment_group_detail_view(request,*args,**kwargs):
    assignment_group =  model_to_dict(AssignmentGroup.objects.get(id=kwargs['id']))
    forms = [model_to_dict(f) for f in CustomForm.objects.all()]
    response = {
        "assignment_group": assignment_group,
        "forms": forms
    } 
    print(response)
    return JsonResponse(response, status=200, safe=False)

def assignment_list_view(request,*args,**kwargs):
    offset = kwargs['offset']
    limit = kwargs['limit']
    if offset < 0:
        offset = 0
    if limit < 0:
        limit = 1
    assignments = Assignment.objects.all()
    print(assignments.count())
    pages = int(assignments.count() / limit) + 1
    assignments_queryset = assignments[offset:offset+limit]
    assignments = [x for x in assignments_queryset.values()]
    for s in assignments:
        s["created_at"] = datetime.strftime(s["created_at"], "%H:%M %d/%m/%Y")
    response = {
        "pages":pages,
        "data":assignments
    }
    return JsonResponse(response, status=200, safe=False)

def assignment_group_list_view(request,*args,**kwargs):
    offset = kwargs['offset']
    limit = kwargs['limit']
    if offset < 0:
        offset = 0
    if limit < 0:
        limit = 1
    assignment_groups = AssignmentGroup.objects.all()
    print(assignment_groups.count())
    pages = int(assignment_groups.count() / limit) + 1
    assignment_groups_queryset = assignment_groups[offset:offset+limit]
    assignment_groups = [x for x in assignment_groups_queryset.values()]
    for s in assignment_groups:
        s["created_at"] = datetime.strftime(s["created_at"], "%H:%M %d/%m/%Y")
    response = {
        "pages":pages,
        "data":assignment_groups
    }
    return JsonResponse(response, status=200, safe=False)