const totalSeats = 20;
const seatGrid = document.getElementById("seatGrid");
const nameInput = document.getElementById("nameInput");
const seatInput = document.getElementById("seatInput");
const reserveButton = document.getElementById("reserveButton");
const message = document.getElementById("message");

const reservations = {};

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

        if (i % 4 === 2) {
            const aisle = document.createElement("div");
            seatGrid.appendChild(aisle);
        }
        seat.addEventListener("click", function () {
            seatInput.value = i;
        });
    }
}

function showMessage(text, isError) {
    message.textContent = text;
    if (isError) {
        message.className = "mt-4 text-sm font-medium text-red-600";
    } else {
        message.className = "mt-4 text-sm font-medium text-green-700";
    }
}

function markSeatAsReserved(seatNumber, name) {
    reservations[seatNumber] = name;

    const seat = document.getElementById("seat-" + seatNumber);
    const label = document.getElementById("label-" + seatNumber);

    seat.className = reservedSeatStyle;
    label.textContent = name;
}

function reserveSeat() {
    const name = nameInput.value.trim();        
    const seatNumber = Number(seatInput.value); 

    if (name === "") {
        showMessage("Please enter your name.", true);
        return; 
    }

    if (seatInput.value === "" || !Number.isInteger(seatNumber) || seatNumber < 1 || seatNumber > totalSeats) {
        showMessage("Please enter a seat number between 1 and " + totalSeats + ".", true);
        return;
    }

    if (reservations[seatNumber] !== undefined) {
        showMessage("Seat " + seatNumber + " is already reserved by " + reservations[seatNumber] + ".", true);
        return;
    }

    markSeatAsReserved(seatNumber, name);
    showMessage("Seat " + seatNumber + " is reserved for " + name + ".", false);

    nameInput.value = "";
    seatInput.value = "";
}

createSeats();
markSeatAsReserved(3, "Salah M");
markSeatAsReserved(4, "Aymen L");
markSeatAsReserved(14, "Mouad");

reserveButton.addEventListener("click", reserveSeat);
