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

        const textElement2 = document.querySelector(".second-page-text")
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


//----------------------- Bubble modal on second page -----------------------//


document.addEventListener("DOMContentLoaded", function() {
  var secondText = document.querySelector(".second-text"); // Hämta second-text elementet

  // Alla bubbla-knappar och bubblor
  var buttons = document.querySelectorAll(".bubble-btn");
  var bubbles = {
    "top-left-btn": document.querySelector(".top-left-bubble"),
    "top-right-btn": document.querySelector(".top-right-bubble"),
    "bottom-left-btn": document.querySelector(".bottom-left-bubble"),
    "bottom-right-btn": document.querySelector(".bottom-right-bubble")
  };

  // Status för att spåra om bubblan ska stanna kvar
  var stickyBubbles = {
    "top-left-btn": false,
    "top-right-btn": false,
    "bottom-left-btn": false,
    "bottom-right-btn": false
  };

  // Funktion för att dölja second-text
  function hideSecondText() {
    secondText.style.display = "none";
  }

  // Funktion för att visa second-text
  function showSecondText() {
    secondText.style.display = "block";
  }

  // Lägg till hovringshändelser och klickhändelser för alla knappar
  buttons.forEach(function(button) {
    var buttonClass = button.classList[1];
    var bubble = bubbles[buttonClass];

    button.addEventListener("mouseenter", function() {
      if (!stickyBubbles[buttonClass]) {
        bubble.style.display = "block";
        setTimeout(function() {
          bubble.classList.add('show');
        }, 10); // Kort fördröjning för att säkerställa att display:block hinner appliceras
        hideSecondText();
      }
    });

    button.addEventListener("mouseleave", function() {
      if (!stickyBubbles[buttonClass]) {
        bubble.classList.remove('show');
        setTimeout(function() {
          bubble.style.display = "none";
          if (!Object.values(stickyBubbles).some(Boolean)) {
            showSecondText();
          }
        }, 500); // Matcha tiden med transition-duration i CSS
      }
    });

    button.addEventListener("click", function() {
      stickyBubbles[buttonClass] = !stickyBubbles[buttonClass];
      if (stickyBubbles[buttonClass]) {
        bubble.classList.add('show');
        bubble.style.display = "block";
        hideSecondText();
      } else {
        bubble.classList.remove('show');
        setTimeout(function() {
          bubble.style.display = "none";
          if (!Object.values(stickyBubbles).some(Boolean)) {
            showSecondText();
          }
        }, 500); // Matcha tiden med transition-duration i CSS
      }
    });
  });

  // Dölj bubblorna när användaren klickar någon annanstans på sidan
  document.addEventListener("click", function(event) {
    var clickedInsideBubble = false;
    for (var key in bubbles) {
      if (bubbles.hasOwnProperty(key) && bubbles[key].contains(event.target)) {
        clickedInsideBubble = true;
        break;
      }
    }

    if (!clickedInsideBubble && !event.target.classList.contains("bubble-btn")) {
      for (var key in bubbles) {
        if (bubbles.hasOwnProperty(key) && stickyBubbles[key]) {
          bubbles[key].classList.remove('show');
          stickyBubbles[key] = false;
          setTimeout(function(bubble) {
            bubble.style.display = "none";
            if (!Object.values(stickyBubbles).some(Boolean)) {
              showSecondText();
            }
          }, 500, bubbles[key]); // Matcha tiden med transition-duration i CSS
        }
      }
    }
  });

  // Visa second-text när sidan laddas för första gången
  showSecondText();
});



//------------------ Click to open Artic Fox content bubble ------------------//


function updateContent(title, content, imageUrl) {
  // Hide the button container
 const buttonContainer = document.getElementById('buttonContainer');
  buttonContainer.style.display = 'none';

  // Update the text of the h4 element
  const h4Element = document.querySelector('.h4-text');
  h4Element.textContent = title;

  // Update the text of the p element
  const pElement = document.querySelector('.p-text p');
  pElement.textContent = content;

  var existingImage = document.querySelector('.bubble-info-text img');
  if (existingImage) {
      existingImage.remove();
  }

  const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = title; 
        document.querySelector('.bubble-info-text').appendChild(imageElement);
        imageElement.classList.add('foxImage'); 


  //Add a "Go Back" button
  const goBackButton = document.createElement('button');
  goBackButton.textContent = '⬅ Gå tillbaka';
  goBackButton.classList.add('goBackButton'); 
  goBackButton.onclick = function() {
    // Reset the content and show the button container
    h4Element.textContent = "Rödlistade djur i Sverige";
    pElement.textContent = "Vart femte år presenterar Artdatabanken en lista över de mest hotade arterna i Sverige, varje art blir tilldelad en rödlistekategori som talar om hur hotad arten är från ej tillämplig till utdöd. Vi har tagit fram en lista på fyra olika däggdjur som är med på rödlistan 2020.";
    buttonContainer.style.display = 'block';
    
    // Remove the "Go Back" button and image
    goBackButton.remove();
    imageElement.remove();
};
    // Append the "Go Back" button after the updated content
    document.querySelector('.bubble-info-text').appendChild(goBackButton);
  }




