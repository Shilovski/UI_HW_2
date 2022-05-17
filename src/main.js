function quad(a, b, c) {
    let D = b * b - 4 * a * c;
    let x1, x2;

    if (D > 0) {
        x1 = (-b + Math.sqrt(D)) / (2 * a);
        x2 = (-b - Math.sqrt(D)) / (2 * a);
        return [D, x1.toFixed(2), x2.toFixed(2)];
    } else if (Math.abs(D) < 1E-5) {
        x1 = -b / (2 * a);
        return [D, x1.toFixed(2)];
    } else if (D < 0) {
        return [D, 'no roots'];
    }
}

let button = document.querySelector('#button');
button.addEventListener('click', function() {
    let a = document.getElementById('a').value;
    let b = document.getElementById('b').value;
    let c = document.getElementById('c').value;

    const row = document.createElement('tr');
    let quad1 = quad(a, b, c);
    if (b == "")
        b = 0;
    if (c == "")
        c = 0;

    if (a == 0)
        row.appendChild(addTd('a = 0 => no quadratic equation', 'colspan', '4'));
    else {
        row.innerHTML = insertEquation(a, b, c);
        if (quad1[1] == 'no roots') {
            row.appendChild(addTd(quad1[0] + ' < 0'));
            row.appendChild(addTd(quad1[1], 'colspan', '2'));
        } else {
            row.appendChild(addTd(quad1[0]));
            if (quad1.length == 2)
                row.appendChild(addTd(quad1[1], 'colspan', '2'));
            else {
                row.appendChild(addTd(quad1[1]));
                row.appendChild(addTd(quad1[2]));
            }
        }
    }
    row.addEventListener('click', function() {
        row.remove();
    })
    document.querySelector('.results tbody').appendChild(row);
})

function insertEquation(a, b, c) {
    return `<td>${
        (a == 1 ? "" : (a < 0 ? (a == -1 ? "- " : "- " + Math.abs(a)) : a)) + "x<sup>2</sup> " +
        (b == 0 ? "" : (b < 0 ? (b == -1 ? "- x " : "- " + Math.abs(b) + "x ") : (b == 1 ? "+ x " : "+ " + b + "x "))) +
        (c == 0 ? "= 0" : (c < 0 ? "- " + Math.abs(c) + " = 0" : "+ " + c + " = 0"))}</td>`;
}

function addTd(element, attribute, value) {
    let td = document.createElement('td');
    td.setAttribute(attribute, value);
    td.textContent = element;
    return td;
}