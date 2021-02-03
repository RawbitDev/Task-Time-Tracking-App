## Remove label from task

<table>
    <tr><td> <b>Description</b>: Remove a single label from a certain task. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/task/:taskId/label/:labelId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>DELETE</code> </td></tr>
    <tr><td> <b>Data constraints</b>: None </td></tr>
<tr><td>

**Example request:**

`DELETE http://localhost:3000/api/task/1/label/1`

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
