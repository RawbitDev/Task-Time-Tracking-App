## Add label to task

<table>
    <tr><td> <b>Description</b>: Add a single label to a certain task. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/task/:taskId/label/:labelId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: None </td></tr>
<tr><td>

**Example request:**

`POST http://localhost:3000/api/task/3/label/2`

</td></tr>
<tr><td>

**Example result:**

`Status: 200 OK`

```json
{
  "data": [
    {
      "id": "2",
      "name": "TestLabel2",
      "createdAt": "2020-11-22T15:45:20.132Z",
      "updatedAt": "2020-11-22T15:45:20.132Z"
    }
  ]
}
```

</td></tr>
</table>
