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

const textElement = document.querySelector('.animals-page_text');
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
//Ändra färg på h1 element på first-page
// Select the h1 element
const h1Element = document.querySelector('.h1-text');

const text = h1Element.textContent;

const words = text.split(' ');

const firstWord = words[0];

h1Element.innerHTML = `<span class="first-word">${firstWord}</span>` + text.slice(firstWord.length);

const firstWordSpan = h1Element.querySelector('.first-word');
firstWordSpan.style.color = 'white'; 


// API från UN med goal indicator för Sverige // 
const urlSWEUN =
    "https://unstats.un.org/SDGAPI/v1/sdg/DataAvailability/GetIndicatorsAllCountries";

    //förstå hur förfrågan ska formuleras 
    const requestSWEUN = new Request(urlSWEUN, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        // filtrera för sverige country id = 752
        body: 'dataPointType=1&countryId=752&natureOfData=All'
    })
    
    //skicka förfrågan 
    fetch(requestSWEUN)
    .then(response => response.json())
    .then((unsweData) => { 

        // //titta på svaren
        // console.log(unsweData)

        //behandlar svaret - lägg till indicator 15
        const sweGoal = unsweData[14];
        console.log(sweGoal);  
        const indicatorGoalswe = unsweData[14].indicators.map((indicator)=> indicator.percentage); 
        console.log(indicatorGoalswe)  

        console.log(sweGoal.goalName);

        const textElement2 = document.querySelector(".p-text")
        const newHeading2 = document.createElement("h3");
        const newParagraph = document.createElement("p")
        const goal15Name = sweGoal.goalName;
        newHeading2.textContent = "Från United Nations:";
        newParagraph.textContent = goal15Name;
        textElement2.insertAdjacentElement("beforebegin", newHeading2);
        textElement2.insertAdjacentElement('beforebegin', newParagraph)

    });
//------------------------------------------------------------------------------ //

    //Scroll för knapp på startsidan // 

    function scrollToSecondPage(event) {
      event.preventDefault(); // Förhindra standard ankaregenskaper
  
      const secondPage = document.querySelector('.second-page');
  
      if (secondPage) {
          secondPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
          console.error('Second page not found.');
      }
  }
  

    

