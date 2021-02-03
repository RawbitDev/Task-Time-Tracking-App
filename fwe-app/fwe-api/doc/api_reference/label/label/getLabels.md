## Get labels

<table>
    <tr><td> <b>Description</b>: Get a list of all labels. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/label/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
    <tr><td> <b>Data constraints</b>: None </td></tr>
<tr><td>

**Example request:**

`GET http://localhost:3000/api/label`

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
      "updatedAt": "2020-11-22T15:45:20.124Z",
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
    },
    {
      "id": "2",
      "name": "TestLabel2",
      "createdAt": "2020-11-22T15:45:20.132Z",
      "updatedAt": "2020-11-22T15:45:20.132Z",
      "tasks": [
        {
          "id": "1",
          "name": "TestTask1",
          "description": "This is the 1st test task.",
          "createdAt": "2020-11-22T15:45:20.197Z",
          "updatedAt": "2020-11-22T15:45:20.197Z"
        }
      ]
    },
    {
      "id": "3",
      "name": "TestLabel3",
      "createdAt": "2020-11-22T15:45:20.138Z",
      "updatedAt": "2020-11-22T15:45:20.138Z",
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
  ]
}
```

</td></tr>
</table>
