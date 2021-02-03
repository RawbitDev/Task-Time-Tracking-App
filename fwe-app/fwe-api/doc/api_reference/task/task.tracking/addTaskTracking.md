## Add tracking to task

<table>
    <tr><td> <b>Description</b>: Add a single tracking to a certain task. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/task/:taskId/tracking/:trackingId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: None </td></tr>
<tr><td>

**Example request:**

`POST http://localhost:3000/api/task/2/tracking/1`

</td></tr>
<tr><td>

**Example result:**

`Status: 200 OK`

```json
{
  "data": [
    {
      "id": "1",
      "description": "This is the 1st test tracking.",
      "startTime": "2020-11-15T10:00:00.000Z",
      "endTime": null,
      "createdAt": "2020-11-22T15:45:20.143Z",
      "updatedAt": "2020-11-22T16:03:45.000Z"
    }
  ]
}
```

</td></tr>
</table>
