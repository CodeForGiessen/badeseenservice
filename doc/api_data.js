define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "APi entry point",
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
          "content": "HTTP/1.1 OK\n{\n     \"_links\": {\n           \"self\": {\n             \"href\": \"/api\"\n         }\n     },\n     \"v1\": {\n         \"href\": \"/api/v1\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/index.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/",
    "title": "API entry point of first api version",
    "name": "GetRootFirstVersion",
    "group": "APIv1",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"_links\":{\n        \"self\":{\n            \"href\":\"/api/v1\"\n        },\n        \"lakes\":{\n            \"href\":\"/api/v1/lakes\"\n         }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/v1/index.js",
    "groupTitle": "APIv1"
  },
  {
    "type": "get",
    "url": "/lakes/all",
    "title": "get all lakes with their basedata",
    "name": "GetAllLakes",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"_links\": {\n        \"self\": {\n            \"href\": \"/api/v1/lakes/all\"\n         }\n     },\n     \"lakes\": [...]\n}",
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
    "url": "/lakes/allmessages",
    "title": "get the messages of all lakes",
    "name": "GetAllMessages",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"_links\": {\n        \"self\": {\n            \"href\": \"/api/v1/lakes/allmessages\"\n         }\n     },\n     \"messages\": {\n         \"54e88e163aa8ccc41e1ab82e\" : [...]\n     }\n}",
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
    "url": "/lakes/allweather",
    "title": "get the weather of all lakes",
    "name": "GetAllWeather",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"_links\": {\n        \"self\": {\n            \"href\": \"/api/v1/lakes/allweather\"\n         }\n     },\n     \"weatherdata\": {\n         \"54e88e163aa8ccc41e1ab82e\" : {\n             ...\n         }\n     }\n}",
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
    "url": "/lakes/:id",
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
            "field": "_id",
            "description": "<p>lake identifier</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name of the lake</p> "
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
            "description": "<p>size of the lake</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>nearby city</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "depthAvg",
            "description": "<p>average depth</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "depthMax",
            "description": "<p>maximal depth</p> "
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "extracurricularActivity",
            "description": "<p>activities</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "heightAboveSeaLevel",
            "description": ""
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "hlugurl",
            "description": "<p>url to hlug-website</p> "
          },
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "images",
            "description": "<p>of the lake</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "introtext",
            "description": "<p>description</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "lakeType",
            "description": "<p>type of lake</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude of position</p> "
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude of position</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "openFrom",
            "description": "<p>start date of the season NOT the opening hours</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "openTo",
            "description": "<p>end date of the season NOT the opening hours</p> "
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
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "downloads",
            "description": "<p>pdfs and other downloads</p> "
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "bathingPermission",
            "description": "<p>permission of bathing at the moment</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n     \"_id\": \"54e88e163aa8ccc41e1ab839\",\n     \"name\": \"Marbach-Stausee\",\n     \"hlugurl\": \"http://badeseen.hlug.de/badegewaesser/odenwaldkreis/marbach-stausee.html\",\n     \"latitude\": 49.6089,\n     \"longitude\": 8.9677,\n     \"openFrom\": \"2014-06-30T22:00:00.000Z\",\n     \"openTo\": \"2014-08-30T22:00:00.000Z\",\n     \"bathingPermission\": \"keine Badesaison\",\n     \"introtext\": \"Der Bereich hinter dem Staudamm (abzügl. einer Sicherheitszone) ist für Surfer und Segelboote reserviert. Daran angrenzend befindet sich der Bade- und Vergnügungsbereich. Im hinteren Teil des Sees befindet sich der Vogelschutzbereich mit einer kleinen Insel. Dieser Bereich darf nicht betreten und nicht mit Booten befahren werden. Um den See führt ein drei Kilometer langer Wanderweg. \",\n     \"city\": \"Beerfelden\",\n     \"heightAboveSeaLevel\": 250,\n     \"areaHa\": 22,\n     \"depthMax\": 8.6,\n     \"depthAvg\": 3.21,\n     \"lakeType\": \"Talsprerre\",\n     \"downloads\": {\n         \"generalInformation\":\"http://badeseen.hlug.de/fileadmin/dokumente/badeseen/Odenwaldkreis/Marbach-Stausee/DEHE_PR_0046_Text_Marbachtalsperre_120401.pdf\",\n         \"landUseMap\":\"http://badeseen.hlug.de/fileadmin/dokumente/badeseen/Odenwaldkreis/Marbach-Stausee/DEHE_PR_0046_Karte_Marbach Stausee.pdf\",\n         \"bathymetricChart\":null\n     },\n     \"messages\": [],\n     \"appropriateAuthority\":{\n         \"telephone\":\"06062 70-0\",\n         \"zipcodeCity\":\"64711 Erbach\",\n         \"street\":\"Michelstädter Str. 12\",\n         \"addressAdditional\":\"Kreisgesundheitsamt\",\n         \"address\":\"Odenwaldkreis\",\n         \"name\":\"Gesundheitsamt Odenwaldkreis\"\n     },\n     \"operator\": {\n         \"website\": \"\",\n         \"fax\": \"06062/ 70 287\",\n         \"telephone\": \"06062/ 70 288\",\n         \"email\": \"m.sottong@wv-muemling-gersprenz.de\",\n         \"zipcodeCity\": \"64711 Erbach\",\n         \"street\": \"Michelstädter Straße 12\",\n         \"name\": \"Wasserverband Mümling Landratsamt Odenwaldkreis\"\n     },\n     \"images\":[\n         {\n             \"copyright\":\"http://badeseen.hlug.de© HLUG\",\n             \"src\":\"http://badeseen.hlug.de/fileadmin/img_content/badeseen/Odenwaldkreis/Marbach-Stausee/Marbachtalsperre03.JPG\",\n             \"_id\":\"54e9dc7ec6ad161e1ca26bc1\"\n         },\n         {\n            \"copyright\":\"http://badeseen.hlug.de© HLUG\",\n            \"src\":\"http://badeseen.hlug.de/fileadmin/img_content/badeseen/Odenwaldkreis/Marbach-Stausee/Marbachtalsperre02.JPG\",\n            \"_id\":\"54e9dc7ec6ad161e1ca26bc0\"\n        },\n        {\n            \"copyright\":\"http://badeseen.hlug.de© HLUG\",\n            \"src\":\"http://badeseen.hlug.de/fileadmin/img_content/badeseen/Odenwaldkreis/Marbach-Stausee/Marbachtalsperre01_T.JPG\",\n            \"_id\":\"54e9dc7ec6ad161e1ca26bbf\"\n        }\n    ],\n    \"yearratings\":[\n        {\n            \"rating\":1,\n            \"year\":\"2011\",\n            \"_id\":\"54e9dc7ec6ad161e1ca26bc4\"\n        },\n        {\n            \"rating\":1,\n            \"year\":\"2012\",\n            \"_id\":\"54e9dc7ec6ad161e1ca26bc3\"\n        },\n        {\n            \"rating\":1,\n            \"year\":\"2013\",\n            \"_id\":\"54e9dc7ec6ad161e1ca26bc2\"\n        }\n    ],\n    \"extracurricularActivity\":[\n        \"ANGELSPORT\",\n        \"BADEN\",\n        \"SEGELN\",\n        \"WINDSURFEN\"\n    ]\n}",
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
    "url": "/lake/:id/measurements",
    "title": "Get lake measurements",
    "name": "GetLakeMeasurements",
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
            "type": "Array",
            "optional": false,
            "field": "measurements",
            "description": "<p>of bacteria in the lake</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"measurements\":\n    [\n        {\n            \"comment\": \"\",\n            \"rating\": 1,\n            \"escherichiaColi\": \"15\",\n            \"enterocsocci\": \"15\",\n            \"waterTemperature\": 20,\n            \"date\": \"2014-08-18T22:00:00.000Z\"\n           }, {\n               \"comment\": \"\",\n               \"rating\": 1,\n               \"escherichiaColi\": \"<15\",\n               \"enterocsocci\": \"<15\",\n               \"waterTemperature\": 24,\n               \"date\": \"2014-08-04T22:00:00.000Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/v1/lakes/index.js",
    "groupTitle": "Lakes",
    "error": {
      "fields": {
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
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"LakeNotFound\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lake/:id/messages",
    "title": "Get lake messages",
    "name": "GetLakeMessages",
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
            "type": "Array",
            "optional": false,
            "field": "messages",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n       \"messages\": [\n          {\n              \"message\": \"Badebetrieb am Perfstausee wird bis auf Weiteres eingestellt\",\n               \"date\": \"2015-03-09T23:00:00.000Z\",\n              \"_id\": \"54fefa48a2f4c5151b8f320a\"\n           }\n       ]\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/v1/lakes/index.js",
    "groupTitle": "Lakes",
    "error": {
      "fields": {
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
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"LakeNotFound\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lake/:id/weather",
    "title": "Get lake weather",
    "name": "GetLakeWeather",
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
            "type": "Object",
            "optional": false,
            "field": "weatherdata",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"weather\":{\n         \"current\": {\n               \"wind\": {\n                   \"speed\": 1.72,\n                   \"deg\": 276.504\n               },\n               \"clouds\": {\n                   \"all\": 88\n               },\n               \"weather\":\n                   [\n                       {\n                           \"icon\": \"04d\",\n                           \"description\": \"overcast clouds\",\n                           \"main\": \"Clouds\",\n                           \"id\": 804,\n                           \"_id\": \"54fefa48a2f4c5151b8f302b\"\n                       }\n                   ],\n               \"temp\": \"8.291\",\n               \"temp_min\": 8.291,\n               \"temp_max\": 8.291,\n               \"humidity\": 90,\n               \"pressure\": 978.14,\n               \"lastUpdated\": \"2015-03-10T13:44:23.000Z\"\n           },\n           \"openWeatherCityId\": 2812482\n       }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/v1/lakes/index.js",
    "groupTitle": "Lakes",
    "error": {
      "fields": {
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
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"LakeNotFound\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/lakes",
    "title": "API entry point for lakes ressources",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"self\": {\n        \"href\": \"/api/v1/lakes\"\n    },\n    \"all\" : {\n        \"href\": \"/api/v1/lakes/all\"\n    },\n    \"allweather\" : {\n        \"href\": \"/api/v1/lakes/allweather\"\n    },\n    \"allmessages\" : {\n        \"href\": \"/api/v1/lakes/allmessages\"\n    },\n    \"_links\":{\n        \"507f1f77bcf86cd799439011\": {\n            \"href\": \"/api/v1/lakes/507f1f77bcf86cd799439011\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/v1/lakes/index.js",
    "groupTitle": "Lakes"
  }
] });