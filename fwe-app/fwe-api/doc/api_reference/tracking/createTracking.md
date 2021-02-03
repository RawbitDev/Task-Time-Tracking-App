## Create tracking

<table>
    <tr><td> <b>Description</b>: Create a new tracking. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/tracking/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: Provide start time. </td></tr>
<tr><td>

**Example request:**

`POST http://localhost:3000/api/tracking`

```json
{
  "startTime": "2020-11-15T12:00:00.000Z"
}
```

</td></tr>
<tr><td>

**Example result:**

`Status: 201 Created`

```json
{
  "data": {
    "description": null,
    "startTime": "2020-11-15T12:00:00.000Z",
    "endTime": null,
    "id": "e982e0c9-a09b-4c3a-847e-8246a0007e69",
    "createdAt": "2020-11-22T15:54:04.504Z",
    "updatedAt": "2020-11-22T15:54:04.504Z"
  }
}
```

</td></tr>
</table>
