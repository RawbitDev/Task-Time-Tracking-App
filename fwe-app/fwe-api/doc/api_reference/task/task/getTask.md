## Get task by id

<table>
    <tr><td> <b>Description</b>: Get a certain task by its id. </td></tr>
    <tr><td> <b>URL</b>: <code>/api/task/:taskId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
    <tr><td> <b>Data constraints</b>: None </td></tr>
<tr><td>

**Example request:**
`GET http://localhost:3000/api/task/1`

```json
{
  "name": "Example Task",
  "description": "Hey there, this is a simple example task!"
}
```

**Example result:**

`Status: 200 OK`

```json
{
  "data": {
    "id": "1",
    "name": "TestTask1",
    "description": "This is the 1st test task.",
    "createdAt": "2020-11-22T15:45:20.197Z",
    "updatedAt": "2020-11-22T15:45:20.197Z",
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
