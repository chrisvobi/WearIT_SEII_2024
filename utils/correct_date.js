/*
date format expected to be an array [MM, DD] (we form it from a string in tests)
where MM and DD are integers and given correctly (based on months and days)
*/

exports.correct_date = function (date) {
    return (Array.isArray(date) && date.length === 2
        && Number.isInteger(date[0]) && Number.isInteger(date[1])
        && date[0] >= 1 && date[0] <= 12
        && date[1] >= 1 && (
            (date[0] === 1 || date[0] === 3 || date[0] === 5 || date[0] === 7 || date[0] === 8 || date[0] === 10 || date[0] === 12) && date[1] <= 31 ||
            (date[0] === 4 || date[0] === 6 || date[0] === 9 || date[0] === 11) && date[1] <= 30 ||
            (date[0] === 2 && date[1] <= 28)
    ));
};
