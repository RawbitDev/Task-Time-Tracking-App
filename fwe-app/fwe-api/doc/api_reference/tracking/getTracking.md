## Get tracking by id

<table>
    <tr><td> <b>Description</b>: Get a certain tracking by its id. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/tracking/:trackingId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
    <tr><td> <b>Data constraints</b>: None </td></tr>
<tr><td>

**Example request:**

`GET http://localhost:3000/api/tracking/1`

</td></tr>
<tr><td>

**Example result:**

`Status: 200 OK`

```json
{
  "data": {
    "id": "1",
    "description": "This is the 1st test tracking.",
    "startTime": "2020-11-15T10:00:00.000Z",
    "endTime": null,
    "createdAt": "2020-11-22T15:45:20.143Z",
    "updatedAt": "2020-11-22T15:45:20.000Z",
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
