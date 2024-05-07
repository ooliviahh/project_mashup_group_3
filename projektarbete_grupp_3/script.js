
// Lägga in data om fridlysta djur o växtarter från scb via API ------------>

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
        label: "Antal arter, utrotningshotade djur och växter i Sverige år 2022",
        data: values,
        backgroundColor: 'green',

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



// Lägga in information om fridlysta djur, text + lägga 4 första som rubrik ------------>

    console.log(dataDjuroVaxtart.columns[1]);

const textElement = document.querySelector('.text');
const newElement = document.createElement('div');

// Hämta kommentaren och dela upp den i ord med hjälp av en reguljär expression
const comment = dataDjuroVaxtart.columns[1].comment;
const words = comment.split(/\s+/);

// Skapa en rubrik med de första fyra orden
const headerText = words.slice(0, 4).join(' ');
const headerElement = document.createElement('h2');
headerElement.textContent = headerText;

// Skapa en textnod för resten av kommentaren efter de fyra första orden
const restOfComment = words.slice(4).join(' ');
const restOfCommentNode = document.createTextNode(restOfComment);

// Lägg till rubriken och den återstående texten till det nya elementet
newElement.appendChild(headerElement);
newElement.appendChild(restOfCommentNode);

// Infoga det nya elementet sist i det befintliga elementet
textElement.insertAdjacentElement('beforeend', newElement);

});

//-----------------------------------------------------------------------------------------------

// Select the h1 element
const h1Element = document.querySelector('.h1-text');

// Get the text content of the h1 element
const text = h1Element.textContent;

// Split the text content into words
const words = text.split(' ');

// Get the first word
const firstWord = words[0];

// Wrap the first word in a span element with a class
h1Element.innerHTML = `<span class="first-word">${firstWord}</span>` + text.slice(firstWord.length);

// Style the span element to change the color
const firstWordSpan = h1Element.querySelector('.first-word');
firstWordSpan.style.color = 'white'; // Change color to whatever you desire
