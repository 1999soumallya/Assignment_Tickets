const GenerateRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FilterUniqueNumbersForTickets = (min, max, count) => {
    var random = [];
    for (var i = 0; i < count; i++) {
        flag = true;
        while (flag) {
            r = GenerateRandomNumber(min, max)
            if (random.indexOf(r) === -1) {
                random.push(r);
                flag = false;
            }
        }
    }
    return random.sort((a, b) => a > b ? 1 : b > a ? -1 : 0)
}

const GenerateTickets = () => {
    return new Promise((resolve, reject) => {
        let cols, finalTicket, flag = true, colPlaceholder = [];
        while (flag) {
            cols = Array(9).fill(2);
            finalTicket = Array(3);
            finalTicket[0] = Array(9).fill(0);
            finalTicket[1] = Array(9).fill(0);
            finalTicket[2] = Array(9).fill(0);
            let r = FilterUniqueNumbersForTickets(0, 8, 3);
            for (i = 0; i < r.length; i++) {
                cols[r[i]] = 1;
            }
            colPlaceholder = [];
            for (i = 0; i < cols.length; i++) {
                colPlaceholder.push(FilterUniqueNumbersForTickets(0, 2, cols[i]));
            }
            for (i = 0; i < colPlaceholder.length; i++) {
                nums = FilterUniqueNumbersForTickets(((i * 10)), (i * 10) + 9, colPlaceholder[i].length)
                for (j = 0; j < colPlaceholder[i].length; j++) {
                    finalTicket[colPlaceholder[i][j]][i] = nums[j];
                }
            }
            flag = TestTicket(finalTicket);
        }
        resolve(finalTicket)
    })
}

const TestTicket = (ticket) => {
    for (i = 0; i < 3; i++) {
        var arr = ticket[i];
        count = 0;
        for (j = 0; j < arr.length; j++) {
            if (arr[j] === 0)
                count++;
        }
        if (count != 4)
            return true;
    }
    return false;
}

module.exports = { GenerateTickets }