## Update trackings of task

<table>
    <tr><td> <b>Description</b>: Update the list of trackings of a certain task. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/task/:taskId/tracking/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>PATCH</code> </td></tr>
    <tr><td> <b>Data constraints</b>: Provide trackings by their ids. </td></tr>
<tr><td>

**Example request:**

`PATCH http://localhost:3000/api/task/1/tracking/`

```json
{
  "trackings": ["2", "3"]
}
```

</td></tr>
<tr><td>

**Example result:**

`Status: 200 OK`

```json
{
  "data": [
    {
      "id": "2",
      "description": "This is the 2nd test tracking.",
      "startTime": "2020-11-15T12:00:00.000Z",
      "endTime": null,
      "createdAt": "2020-11-22T15:45:20.150Z",
      "updatedAt": "2020-11-22T16:04:18.000Z"
    },
    {
      "id": "3",
      "description": "This is the 3rd test tracking.",
      "startTime": "2020-11-15T12:00:00.000Z",
      "endTime": "2020-11-15T15:00:00.000Z",
      "createdAt": "2020-11-22T15:45:20.159Z",
      "updatedAt": "2020-11-22T16:04:18.000Z"
    }
  ]
}
```

</td></tr>
</table>
