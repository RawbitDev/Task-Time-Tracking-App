## Create label

<table>
    <tr><td> <b>Description</b>: Create a new label. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/label/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: Provide name. </td></tr>
<tr><td>

**Example request:**

`POST http://localhost:3000/api/label`

```json
{
  "name": "Example Label"
}
```

</td></tr>
<tr><td>

**Example result:**

`Status: 201 Created`

```json
{
  "data": {
    "name": "Example Label",
    "id": "a32d2bf3-f60c-4f86-ad14-530339cdfc51",
    "createdAt": "2020-11-22T15:51:28.753Z",
    "updatedAt": "2020-11-22T15:51:28.753Z"
  }
}
```

</td></tr>
</table>
