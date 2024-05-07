const urlDjuroVaxtart = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0603/MI0603D/DjuroVaxtart";

const queryDjuroVaxtart = {
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
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "2022"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
};

const request = new Request(urlDjuroVaxtart, {
  method: 'POST',
  body: JSON.stringify(queryDjuroVaxtart)
});

fetch(request)
.then(response => response.json())
.then((dataDjuroVaxtart) => {


  console.log(dataDjuroVaxtart);

  const values = dataDjuroVaxtart.data.map((value) => value.values[0]);
  console.log("värden", values);

  const labels = dataDjuroVaxtart.data.map(value => value.key[1]);
  console.log("etiketter:", labels);

    const datasets = [
      {
        label: "Antal arter, utrotningshotade djur i Sverige",
        data: values
      }
    ];

    const data = {
      labels,
      datasets
    };

    console.log("data:", data);

    const config = {type: "bar", data}
    const canvas = document.getElementById('djuroVaxtarter');
    const djuroVaxtarterChart = new Chart(canvas, config);


});

















// window.addEventListener('scroll', function() {
//   var header = document.getElementById('sticky-parallax-header');
//   var scrollPosition = window.scrollY;

//   // Adjust header styles based on scroll position
//   if (scrollPosition < 90 * window.innerHeight / 100) {
//     header.style.opacity = 1 - (scrollPosition / (70 * window.innerHeight / 100));
//   } else {
//     header.style.opacity = 0;
//   }
// });

