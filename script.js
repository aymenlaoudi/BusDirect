const totalSeats = 20;
const seatGrid = document.getElementById("seatGrid");
const nameInput = document.getElementById("nameInput");
const seatInput = document.getElementById("seatInput");
const reserveButton = document.getElementById("reserveButton");
const message = document.getElementById("message");

const reservations = {};

const modifySelect = document.getElementById("changeSelect");
const modifyNameInput = document.getElementById("modifyNameInput");
const newSeatInput = document.getElementById("newSeat");
const modifyButton = document.getElementById("modifyBtn");
const modifyMessage = document.getElementById("modifyMessage");

const freeSeatStyle =
    "flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 py-4 cursor-pointer hover:border-green-500";
const reservedSeatStyle =
    "flex flex-col items-center justify-center rounded-xl border border-green-700 bg-green-500 text-white py-4 cursor-not-allowed";

function createSeats() {
    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement("div");
        seat.id = "seat-" + i;
        seat.className = freeSeatStyle;

        const number = document.createElement("span");
        number.className = "text-lg font-bold";
        number.textContent = i;

        const label = document.createElement("span");
        label.id = "label-" + i;
        label.className = "text-xs mt-1";
        label.textContent = "Free";

        seat.appendChild(number);
        seat.appendChild(label);
        seatGrid.appendChild(seat);

        seat.addEventListener("click", function () {
            seatInput.value = i;
        });
        if (i % 4 === 2) {
            const aisle = document.createElement("div");
            seatGrid.appendChild(aisle);
        }
    }
}


    function showMessage(element, text, isError) {
      element.textContent = text;
      if (isError) {
        element.className = "mt-4 text-sm font-medium text-red-600";
      } else {
        element.className = "mt-4 text-sm font-medium text-green-700";
      }
    }

function markSeatAsReserved(seatNumber, name) {
    reservations[seatNumber] = name;

    const seat = document.getElementById("seat-" + seatNumber);
    const label = document.getElementById("label-" + seatNumber);

    seat.className = reservedSeatStyle;
    label.textContent = name;
    updateModifySelect();
}
   function fillNameBox() {
      if (modifySelect.value === "") {
        modifyNameInput.value = "";
      } else {
        modifyNameInput.value = reservations[modifySelect.value];
      }
    }

function reserveSeat() {
    const name = nameInput.value.trim();
    const seatNumber = Number(seatInput.value);

    if (name === "") {
        showMessage(message,"Please enter your name.", true);
        return; 
    }

    if (seatInput.value === "" || !Number.isInteger(seatNumber) || seatNumber < 1 || seatNumber > totalSeats) {
        showMessage(message,"Please enter a seat number between 1 and " + totalSeats + ".", true);
        return;
    }

    if (reservations[seatNumber] !== undefined) {
        showMessage(message,"Seat " + seatNumber + " is already reserved by " + reservations[seatNumber] + ".", true);
        return;
    }

    markSeatAsReserved(seatNumber, name);
    showMessage(message,"Seat " + seatNumber + " is reserved for " + name + ".", false);

    nameInput.value = "";
    seatInput.value = "";
}

createSeats();

markSeatAsReserved(3, "Sarah L.");
markSeatAsReserved(4, "Marc D.");
markSeatAsReserved(14, "Claire B.");

reserveButton.addEventListener("click", reserveSeat);

function updateModifySelect() {
    modifySelect.innerHTML = "";
    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = "Choose a passenger";
    modifySelect.appendChild(firstOption);
    for (let seatNumber in reservations) {
        const option = document.createElement("option");
        option.value = seatNumber;
        option.textContent = reservations[seatNumber] + " (seat " + seatNumber + ")";
        modifySelect.appendChild(option);
    }
}

function markSeatAsFree(seatNumber) {
    delete reservations[seatNumber];

    const seat = document.getElementById("seat-" + seatNumber);
    const label = document.getElementById("label-" + seatNumber);

    seat.className = freeSeatStyle;
    label.textContent = "Free";

    updateModifySelect();
}
function modifyReservation() {
      const oldSeat = Number(modifySelect.value);
      const newName = modifyNameInput.value.trim();
      const newSeat = Number(newSeatInput.value);

      if (modifySelect.value === "") {
        showMessage(modifyMessage, "Please choose a passenger.", true);
        return;
      }

      if (newName === "") {
        showMessage(modifyMessage, "Please enter a name.", true);
        return;
      }

      if (newSeatInput.value === "" || !Number.isInteger(newSeat) || newSeat < 1 || newSeat > totalSeats) {
        showMessage(modifyMessage, "Please enter a seat number between 1 and " + totalSeats + ".", true);
        return;
      }

      if (newSeat !== oldSeat && reservations[newSeat] !== undefined) {
        showMessage(modifyMessage, "Seat " + newSeat + " is already reserved by " + reservations[newSeat] + ".", true);
        return;
      }

      if (newSeat === oldSeat && newName === reservations[oldSeat]) {
        showMessage(modifyMessage, "Nothing to change: same name and same seat.", true);
        return;
      }

      markSeatAsFree(oldSeat);
      markSeatAsReserved(newSeat, newName);
      showMessage(modifyMessage, newName + " is now in seat " + newSeat + ".", false);

      modifyNameInput.value = "";
      newSeatInput.value = "";
    }

    markSeatAsReserved(3, "Sarah L.");
    markSeatAsReserved(4, "Marc D.");
    markSeatAsReserved(14, "Claire B.");

    reserveButton.addEventListener("click", reserveSeat);
    modifySelect.addEventListener("change", fillNameBox);
    modifyButton.addEventListener("click", modifyReservation);
