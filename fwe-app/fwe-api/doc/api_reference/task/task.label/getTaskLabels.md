## Get labels of task

<table>
    <tr><td> <b>Description</b>: Get a list of all labels of a certain task. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/task/:taskId/label/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
    <tr><td> <b>Data constraints</b>: None </td></tr>
<tr><td>

**Example request:**

`GET http://localhost:3000/api/task/1/label`

</td></tr>
<tr><td>

**Example result:**

`Status: 200 OK`

```json
{
  "data": [
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
```

</td></tr>
</table>
