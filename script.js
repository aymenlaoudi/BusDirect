const totalSeats = 20;
const seatGrid = document.getElementById("seatGrid");

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
    }
}

createSeats();
