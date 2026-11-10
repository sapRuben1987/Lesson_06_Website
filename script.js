let participants = [
  { id: 1, name: "Amira", club: "Art", attended: false },
  { id: 2, name: "Leo", club: "Chess", attended: true },
  { id: 3, name: "Nora", club: "Running", attended: false }
];

/* von zeile 8 bis 79 kann diese Elemente direkt mit HHTML umsetzen aber wollte mit Javascript auch machen um auszuüben.
    HTML ist komplett leer wurde alles mit Javascript umgesezt.
*/
const heading = document.createElement("h2")
heading.textContent = "DCI Portal: Teilnehmerverwaltung"

const subHeading = document.createElement("h3")
subHeading.textContent = "Teilnehmer registrieren"

const form = document.createElement("form")
form.id = "participantForm";

const clubLabel = document.createElement("Label")
clubLabel.textContent = "Verein"
clubLabel.id = "club"

const nameInput = document.createElement("input")
nameInput.type= "text"
nameInput.id ="participantName"
nameInput.placeholder = "Bitte name eingeben"

const nameLabel = document.createElement("Label")
nameLabel.textContent = "Name des Teilnehmers"


const clubSelect = document.createElement("select")
clubLabel.id = "club"

// jeder Option bekommt ein value and inhalt (Hier hat vier Option: leer , Art, Chess, Running)
const option1 = document.createElement("option");
option1.value = "All Clubs";
option1.textContent = "All Clubs";

const option2 = document.createElement("option");
option2.value = "Art";
option2.textContent = "Kunst";

const option3 = document.createElement("option");
option3.value = "Chess";
option3.textContent = "Schach";

const option4 = document.createElement("option");
option4.value = "Running";
option4.textContent = "Laufen";

// i added all the Option in mein Select Block
clubSelect.append(option1, option2, option3, option4)

const submitButton = document.createElement("button")
submitButton.type ="submit"
submitButton.textContent = "Einreichen"

// i added all elemente in my form
form.append(nameLabel, nameInput, clubLabel, clubSelect, submitButton)

const feedback = document.createElement("p")
feedback.id = "feedback"

const participantsHeading = document.createElement("h2")
participantsHeading.textContent = "Teilnehmer"

const participantList = document.createElement("ul");
participantList.id = "participantList";

const summary = document.createElement("p");
summary.id = "summary";

document.body.append(
  heading,
  subHeading,
  form,
  feedback,
  participantsHeading,
  summary,
  participantList
  
);

let nextId = 4;
// grab all the properties i need to use
const form2 = document.querySelector("#participantForm");
const participantsInput = document.querySelector("#partcipantName")
const clubSelection = document.querySelector("#club")
const participantList2 = document.querySelector("#participantList")
const feedbackrequired = document.querySelector("#feedback")
const summarys = document.querySelector("#summary")


function renderParticpants(){

    participantList.innerHTML = "";
    participants.forEach(participant => {
        const liParticipants = document.createElement("li")
        liParticipants.textContent = `${participant.name} | ${participant.club}, ${participant.attended ? "Attended" : "Nort attended"}`
        const button = document.createElement("button")
        button.textContent = "Einreichen";

        button.addEventListener("click", () => {
            participant.attended = !participant.attended;
            renderParticpants();
            
        });
        liParticipants.append(button);
        participantList.append(liParticipants);

    });

    updateSummary();
}

function updateSummary(){
     const attendCount = participants.filter(participant => participant.attended).length
     summary.textContent = `${participants.length} | Anwesend: ${attendCount}`;

}
form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const name = nameInput.value.trim();
    const club = clubSelect.value;

    if(name.length < 2 || name.length > 50){
        feedback.textContent ="Name muss zwischen bitte 2 und 50 Zeichen lang sein.!!"

        feedback.style.color = "blue";
        return;
    }
    if (!club || club === "All Clubs") {

    feedback.textContent =
      "Bitte einen Verein auswählen.";

    feedback.style.color = "red";
    return;
  }
// construct the object and store it in our array
  const newParticipant = {
    id: nextId++,
    name: name,
    club: club,
    attended: false
  };
 // add the new object in my array
  participants.push(newParticipant);
  renderParticpants();
  nextId++;

  ///* focus the input field (without the user needing to click inside it) */
  nameInput.focus();
  feedback.textContent =
    `${name} wurde erfolgreich registriert.`;

  feedback.style.color = "green";

  form.reset();

}

) ;
renderParticpants();




