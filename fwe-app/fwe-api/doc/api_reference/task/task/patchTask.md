## Patch task by id

<table>
    <tr><td> <b>Description</b>: Update a certain task by its id. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/task/:taskId </code> </td></tr>
    <tr><td> <b>Method</b>: <code> PATCH </code> </td></tr>
    <tr><td> <b>Data constraints</b>: Provide name and/or description. </td></tr>
<tr><td>

**Example request:**

`PATCH http://localhost:3000/api/task/1`

```json
{
  "name": "Example Task v2",
  "description": "Hey there, I just updated this description text by a patch request :D"
}
```

</td></tr>
<tr><td>

**Example result:**

`Status: 200 OK`

```json
{
  "data": {
    "id": "1",
    "name": "Example Task v2",
    "description": "Hey there, I just updated this description text by a patch request :D",
    "createdAt": "2020-11-22T15:45:20.197Z",
    "updatedAt": "2020-11-22T15:57:10.000Z",
    "trackings": [
      {
        "id": "1",
        "description": "This is the 1st test tracking.",
        "startTime": "2020-11-15T10:00:00.000Z",
        "endTime": null,
        "createdAt": "2020-11-22T15:45:20.143Z",
        "updatedAt": "2020-11-22T15:55:42.000Z"
      },
      {
        "id": "2",
        "description": "This is the 2nd test tracking.",
        "startTime": "2020-11-15T12:00:00.000Z",
        "endTime": null,
        "createdAt": "2020-11-22T15:45:20.150Z",
        "updatedAt": "2020-11-22T15:55:42.000Z"
      },
      {
        "id": "3",
        "description": "This is the 3rd test tracking.",
        "startTime": "2020-11-15T12:00:00.000Z",
        "endTime": "2020-11-15T15:00:00.000Z",
        "createdAt": "2020-11-22T15:45:20.159Z",
        "updatedAt": "2020-11-22T15:55:42.000Z"
      }
    ],
    "labels": [
      {
        "id": "1",
        "name": "TestLabel1",
        "createdAt": "2020-11-22T15:45:20.124Z",
        "updatedAt": "2020-11-22T15:55:42.000Z"
      },
      {
        "id": "2",
        "name": "TestLabel2",
        "createdAt": "2020-11-22T15:45:20.132Z",
        "updatedAt": "2020-11-22T15:45:20.132Z"
      },
      {
        "id": "3",
        "name": "TestLabel3",
        "createdAt": "2020-11-22T15:45:20.138Z",
        "updatedAt": "2020-11-22T15:45:20.138Z"
      }
    ]
  }
}
```

</td></tr>
</table>
