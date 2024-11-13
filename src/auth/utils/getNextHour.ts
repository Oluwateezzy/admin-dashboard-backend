export function getNextHour() {
    // Get the current date and time
    let currentDate = new Date();

    // Get the current hour and add 1 to it
    let nextHour = currentDate.getHours() + 1;

    // Check if the next hour exceeds 23, reset to 0
    if (nextHour > 23) {
        nextHour = 0;
        // Move to the next day since hour reset
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Set the new hour to the date object
    currentDate.setHours(nextHour);

    return currentDate;
}