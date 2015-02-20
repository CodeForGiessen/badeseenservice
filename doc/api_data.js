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
    "url": "/api/v1/lakes/:id",
    "title": "Get Lake",
    "name": "GetLake",
    "group": "Lakes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>unique lake id</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "lake",
            "description": "<p>id</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "appropriateAuthority",
            "description": "<p>responsible authority for the lake</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "areaHa",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "depthAvg",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "depthMax",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "TODO",
            "optional": false,
            "field": "extracurricularActivity",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "heightAboveSeaLevel",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "hlugurl",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "images",
            "description": "<p>of the lake TODO</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "introtext",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "lakeType",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "measurements",
            "description": "<p>of bacteria in the lake</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "openFrom",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "openTo",
            "description": "<p>TODO</p> "
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "operator",
            "description": "<p>lake operator</p> "
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "yearratings",
            "description": "<p>ratings of the lake</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    *\"__v\": 0,\n    \"_id\": \"54e262e605e1723618de836e\",\n    \"appropriateAuthority\": [\n    ],\n    \"areaHa\": 6.7,\n    \"city\": \"Greifenstein\",\n    \"depthAvg\": 4.04,\n    \"depthMax\": 11.4,\n    \"extracurricularActivity\": \"Angelsport,Baden\",\n    \"heightAboveSeaLevel\": 300,\n    \"hlugurl\": \"http://badeseen.hlug.de/badegewaesser/lahn-dill-kreis/ulmbachtalsperre.html\",\n    \"images\": [\n        {\n             \"copyright\": \"http://badeseen.hlug.de© HLUG\",\n             \"src\": \"http://badeseen.hlug.de/fileadmin/img_content/badeseen/Lahn-Dill-Kreis/Ulmbachtalsperre/Ulmbachtalsperre02.JPG\"\n        },\n        {\n             \"copyright\": \"http://badeseen.hlug.de© HLUG\",\n             \"src\": \"http://badeseen.hlug.de/fileadmin/img_content/badeseen/Lahn-Dill-Kreis/Ulmbachtalsperre/Ulmbachtalsperre01_T.JPG\"\n        }\n    ],\n    \"introtext\": \"12 km südwestlich von Herborn liegt der fast 7 ha große Stausee. Umgeben von Wiesen dient er dem Hochwasserschutz. Im Badebereich ist das Ufer flach, sonst steil und bewachsen.\",\n    \"lakeType\": \"Talsprerre\",\n    \"latitude\": 50.6024,\n    \"longitude\": 8.2685,\n    \"measurements\": [\n        {\n            \"comment\": \"\",\n            \"date\": \"2014-08-17T22:00:00.000Z\",\n            \"enterocsocci\": \"10\",\n            \"escherichiaColi\": \"21\",\n            \"rating\": 1,\n            \"waterTemperature\": 17\n        },\n        {\n            \"comment\": \"\",\n            \"date\": \"2014-07-20T22:00:00.000Z\",\n            \"enterocsocci\": \"10\",\n            \"escherichiaColi\": \"10\",\n            \"rating\": 1,\n            \"waterTemperature\": 23\n        }\n    ],\n    \"name\": \"Ulmbachtalsperre\",\n    \"openFrom\": \"2014-05-18T22:00:00.000Z\",\n    \"openTo\": \"2014-08-31T22:00:00.000Z\",\n    \"operator\": [\n    ],\n    \"yearratings\": [\n        {\n            \"rating\": null,\n            \"year\": \"2012\"\n        },\n        {\n            \"rating\": 1,\n            \"year\": \"2013\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "NoValidID",
            "description": "<p>ID is not valid</p> "
          }
        ],
        "404 Not Found": [
          {
            "group": "404 Not Found",
            "optional": false,
            "field": "LakeNotFound",
            "description": "<p>The id of the Lake was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n    \"error\": \"NoValidID\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"LakeNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/v1/lakes/index.js",
    "groupTitle": "Lakes"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"_links\":{\n        \"507f1f77bcf86cd799439011\": {\n            \"href\": \"/api/v1/lakes/507f1f77bcf86cd799439011\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/v1/lakes/index.js",
    "groupTitle": "Lakes"
  }
] });