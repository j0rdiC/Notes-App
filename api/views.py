from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import update_note, get_note_detail, delete_note, get_notes_list, create_note



@api_view(['GET'])
def get_routes(request):

    routes = [
    {
        'Endpoint': '/notes/',
        'method': 'GET',
        'body': None,
        'description': 'Returns an array of notes'
    },
    {
        'Endpoint': '/notes/id',
        'method': 'GET',
        'body': None,
        'description': 'Returns a single note object'
    },
    {
        'Endpoint': '/notes/create/',
        'method': 'POST',
        'body': {'body': ""},
        'description': 'Creates new note with data sent in post request'
    },
    {
        'Endpoint': '/notes/id/update/',
        'method': 'PUT',
        'body': {'body': ""},
        'description': 'Creates an existing note with data sent in post request'
    },
    {
        'Endpoint': '/notes/id/delete/',
        'method': 'DELETE',
        'body': None,
        'description': 'Deletes and exiting note'
    },
    ]
    return Response(routes)


# /notes GET
# /notes POST
# /notes/<id> GET
# /notes/<id> PUT
# /notes/<id> DELETE


@api_view(['GET', 'POST'])
def get_notes(request):

    if request.method == 'GET':
        return get_notes_list(request)

    if request.method == 'POST':
        return create_note(request)


@api_view(['GET', 'PUT', 'DELETE'])
def get_note(request, pk):

    if request.method == 'GET':
        return get_note_detail(request, pk)

    if request.method == 'PUT':
        return update_note(request, pk)

    if request.method == 'DELETE':
        return delete_note(request, pk)


# @api_view(['GET'])
# def get_notes(request, pk):
#     notes = Note.objects.all().order_by('-updated')
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# def create_note(request):
#     data = request.data
#     note = Note.objects.create(
#         body=data['body']
#     )
#     serializer = NoteSerializer(note, many=False)
#     return Response(serializer.data)

# @api_view(['GET'])
# def get_note(request, pk):
#     notes = Note.objects.get(id=pk)
#     serializer = NoteSerializer(notes, many=False)
#     return Response(serializer.data)

# @api_view(['PUT'])
# def update_note(request, pk):
#     data = request.data
#     note = Note.objects.get(id=pk)

#     serializer = NoteSerializer(instance=note, data=data)
#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)


# @api_view(['DELETE'])
# def delete_note(request, pk):
#     note = Note.objects.get(id=pk)
#     note.delete()
#     return Response('Note was deleted')
