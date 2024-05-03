const urlSLU1 = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0603/MI0603D/DjuroVaxtart";

const querySLU1 = {
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "item",
        "values": [
          "00"
        ]
      }
    },
    {
      "code": "Arter",
      "selection": {
        "filter": "item",
        "values": [
          "Daggdjur"
        ]
      }
    }
  ],
  "response": {
    "format": "JSON"
  }
}

const request = new Request(urlSLU1, {
  method: "POST", 
 body: JSON.stringify(querySLU1)
                });
        
fetch(request)
.then(response => response.json())
.then((djurData) =>  {
console.log(djurData);    });