function quad(a, b, c) {
    let D = b * b - 4 * a * c;
    let x1, x2;

    if (D > 0) {
        x1 = (- b + Math.sqrt(D)) / (2 * a);
        x2 = (- b - Math.sqrt(D)) / (2 * a);
        return [D, x1.toFixed(2), x2.toFixed(2)];
    } else if (Math.abs(D) < 1E-5) {
        x1 = - b / (2 * a);
        return [D, x1.toFixed(2)];
    } else if (D < 0) {
        return [D, 'no roots'];
    }
}

function appender() {
    let a = document.getElementById('a').value;
    let b = document.getElementById('b').value;
    let c = document.getElementById('c').value;

    const row = document.createElement('tr');
    let quad1 = quad(a, b, c);
    let n = quad(a, b, c).length;
    if (b == "")
        b = 0;
    if (c == "")
        c = 0;

    if (a == 0) {
        let td = document.createElement('td');
        td.innerHTML = `<tr>${'a = 0 => no quadratic equation'}</tr>`;
        td.setAttribute('colspan', '4');
        row.appendChild(td);
    } else {
        row.innerHTML = `
        <td>${(a == 1 ? "" : (a < 0 ? (a == -1 ? "- " : "- " + Math.abs(a)) : a)) + "x<sup>2</sup> " +
        (b == 0 ? "" : (b < 0 ? (b == -1 ? "- x " : "- " + Math.abs(b) + "x ") : (b == 1 ? "+ x " : "+ " + b + "x ")))
        + (c == 0 ? "= 0" : (c < 0 ? "- " + Math.abs(c) + " = 0" : "+ " + c + " = 0"))}</td>`;

        if (quad1[1] == 'no roots') {
            let td1 = document.createElement('td');
            td1.innerHTML = `<td>${quad1[0] + ' < 0'}</td>`;
            row.appendChild(td1);
            let td2 = document.createElement('td');
            td2.innerHTML = `<td>${quad1[1]}</td>`;
            td2.setAttribute('colspan', '2');
            row.appendChild(td2);
        }
        else {
            let td3 = document.createElement('td');
            td3.innerHTML = `<td>${quad1[0]}</td>`;
            row.appendChild(td3);

            if (n == 2) {
                let td6 = document.createElement('td');
                td6.setAttribute('colspan', '2');
                td6.innerHTML = `<td>${quad1[1]}</td> `;
                row.appendChild(td6);
            }
            else {
                let td4 = document.createElement('td');
                td4.innerHTML = `<td>${quad1[1]}</td>`;
                row.appendChild(td4);
                let td5 = document.createElement('td');
                td5.innerHTML = `<td>${quad1[2]}</td>`;
                row.appendChild(td5);
            }
        }
    }

    row.setAttribute('id', 'got');
    row.setAttribute('onmousedown', 'removeRow(this)');
    document.querySelector('.results tbody').appendChild(row);
}

function removeRow(row) {
    $(row).fadeTo('slow', -0.8, function () {
        $(row).remove('tr');
    });
}