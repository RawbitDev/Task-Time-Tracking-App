## Update label by id

<table>
    <tr><td> <b>Description</b>: Update a certain label by its id. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/label/:labelId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>PATCH</code> </td></tr>
    <tr><td> <b>Data constraints</b>: Provide name and description. </td></tr>
<tr><td>

**Example request:**

`PATCH http://localhost:3000/api/label/1`

```json
{
  "name": "Example Label v2"
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
    "name": "Example Label v2",
    "createdAt": "2020-11-22T15:45:20.124Z",
    "updatedAt": "2020-11-22T15:52:07.000Z",
    "tasks": [
      {
        "id": "1",
        "name": "TestTask1",
        "description": "This is the 1st test task.",
        "createdAt": "2020-11-22T15:45:20.197Z",
        "updatedAt": "2020-11-22T15:45:20.197Z"
      },
      {
        "id": "2",
        "name": "TestTask2",
        "description": "This is the 2nd test task.",
        "createdAt": "2020-11-22T15:45:20.168Z",
        "updatedAt": "2020-11-22T15:45:20.168Z"
      }
    ]
  }
}
```

</td></tr>
</table>
