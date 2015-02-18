define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "API entry point",
    "name": "GetRoot",
    "group": "API",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_links\":{\n        \"self\":{\n            \"href\":\"/\"\n        },\n        \"lakes\":{\n            \"href\":\"/lakes\"\n         }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/v1/index.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/lakes/",
    "title": "Lakes entry point",
    "name": "GetLakes",
    "group": "Lakes",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_links\":{\n       '507f1f77bcf86cd799439011': '/lakes/507f1f77bcf86cd799439011'\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/v1/lakes/index.js",
    "groupTitle": "Lakes"
  }
] });