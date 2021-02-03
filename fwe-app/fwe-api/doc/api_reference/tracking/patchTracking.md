## Update tracking by id

<table>
    <tr><td> <b>Description</b>: Update a certain tracking by its id. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/tracking/:trackingId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>PATCH</code> </td></tr>
    <tr><td> <b>Data constraints</b>: Provide description and/or start/end time. </td></tr>
<tr><td>

**Example request:**

`PATCH http://localhost:3000/api/tracking/1`

```json
{
  "description": "Hey there, I just updated this description text by a patch request :D",
  "endTime": "2020-11-15T13:00:00.000Z"
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
    "description": "Hey there, I just updated this description text by a patch request :D",
    "startTime": "2020-11-15T10:00:00.000Z",
    "endTime": "2020-11-15T13:00:00.000Z",
    "createdAt": "2020-11-22T15:45:20.143Z",
    "updatedAt": "2020-11-22T15:54:18.000Z",
    "task": {
      "id": "1",
      "name": "TestTask1",
      "description": "This is the 1st test task.",
      "createdAt": "2020-11-22T15:45:20.197Z",
      "updatedAt": "2020-11-22T15:45:20.197Z"
    }
  }
}
```

</td></tr>
</table>
