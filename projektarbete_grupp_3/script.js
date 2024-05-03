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


window.addEventListener('scroll', function() {
  var header = document.getElementById('sticky-parallax-header');
  var scrollPosition = window.scrollY;

  // Adjust header styles based on scroll position
  if (scrollPosition < 90 * window.innerHeight / 100) {
    header.style.opacity = 1 - (scrollPosition / (90 * window.innerHeight / 100));
  } else {
    header.style.opacity = 0;
  }
});