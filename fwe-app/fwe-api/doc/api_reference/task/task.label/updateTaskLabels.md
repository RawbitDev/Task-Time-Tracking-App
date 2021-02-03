## Update labels of task

<table>
    <tr><td> <b>Description</b>: Update the list of labels of a certain task. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/task/:taskId/label/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>PATCH</code> </td></tr>
    <tr><td> <b>Data constraints</b>: Provide labels by their ids. </td></tr>
<tr><td>

**Example request:**

`PATCH http://localhost:3000/api/task/1/label/`

```json
{
  "labels": ["2", "3"]
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
```

</td></tr>
</table>
