// ==UserScript==
// @name         IdMe Key In PBD 
// @namespace    http://tampermonkey.net/
// @version      2024-01-07
// @description  try to take over the world!
// @author       You
// @match        https://moeissppb.moe.gov.my/keputusan/pbd/pbd/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.my
// @grant        none
// ==/UserScript==

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

(function() {
    'use strict';

    // Your code here...
    // Get the form element
    const form = document.querySelectorAll('.zsidebar.zshowmenu.md-hide.transparent--bg.white')[0];
    // Define the labels
    const labels = ['TP4', 'TP5', 'TP6'];
    const lvalue = [40,60,99];
    // Create and append the input fields with labels
    let i = 0;
    labels.forEach(label => {
        // Create a div for each input field
        const div = document.createElement('div');

        // Create the label element
        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', label.toLowerCase());
        labelElement.textContent = label + ':';
        labelElement.style.color = 'white';

        // Create the input element
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('id', label.toLowerCase());
        inputElement.setAttribute('name', label.toLowerCase());
        inputElement.setAttribute('maxlength', '2');
        inputElement.setAttribute('pattern', '\\d{2}'); // Pattern for two-digit numbers
        inputElement.style.width = '50px';
        inputElement.value = lvalue[i];

        // Append the label and input to the div
        div.appendChild(labelElement);
        div.appendChild(inputElement);

        // Append the div to the form
        form.appendChild(div);
        ++i;
    });

    const labelMarks = document.createElement('label');
    labelMarks.textContent = 'Marks';
    labelMarks.style.color = 'white';
    form.appendChild(labelMarks);
    var zNode4 = document.createElement ('p');
    form.appendChild(zNode4);

    var zNode2 = document.createElement ('textarea');
    zNode2.style = "width:50px; height:300px";
    zNode2.zIndex = "9999";
    zNode2.setAttribute ('id', 'studentmarkah');
    form.appendChild(zNode2);
    var zNode3 = document.createElement ('p');
    form.appendChild(zNode3);

    var zNode = document.createElement ('button');
    zNode.type = "button";
    zNode.innerHTML = 'Start';
    //zNode.style = "position:fixed; left:50px; top:400px";
    zNode.setAttribute ('id', 'startfill');
    form.appendChild(zNode);

    //--- Activate the newly added button.
    document.getElementById ("startfill").addEventListener (
        "click", startfill, false
    );

})();

let data = [];
async function startfill()
{
    // laod markah from textarea into data
    let v = document.getElementById("studentmarkah").value.split("\n");
    for (let i=0; i<v.length; i++)
        if(v[i] != "")
            data[i] = parseFloat(v[i]);
    // radio button
    let total = document.getElementsByClassName("w-radio__input primary").length;
    if (confirm("Click all Tahap Penguasaan?")) {
        for (let i=0,j=0; i<total; i+=6,j++)
        {
            // click tahap penguasaan
            if(data[j]>=parseInt(document.getElementById('tp6').value))
                document.getElementsByClassName("w-radio__input primary")[i+5].click(); // tahap 6
            else if(data[j]>=parseInt(document.getElementById('tp5').value))
                document.getElementsByClassName("w-radio__input primary")[i+4].click(); // tahap 5
            else if(data[j]>=parseInt(document.getElementById('tp4').value))
                document.getElementsByClassName("w-radio__input primary")[i+3].click(); // tahap 4
            else
                document.getElementsByClassName("w-radio__input primary")[i+2].click(); // tahap 3
        }
    }
    let usaha = document.getElementsByClassName("w-select__selection");
    if (confirm("Click all Usaha Murid?")) {
        for (let i=0,j=0; i<usaha.length; i+=2,j++)
        {
            usaha[i].click();
            await delay(500);
            if(data[j]>=parseInt(document.getElementById('tp5').value))
                document.getElementsByClassName("w-list__item-label")[0].dispatchEvent(new Event('mousedown', {bubbles: true})); // sangat tinggi
            else if(data[j]>=parseInt(document.getElementById('tp4').value))
                document.getElementsByClassName("w-list__item-label")[1].dispatchEvent(new Event('mousedown', {bubbles: true})); // tinggi
            else
                document.getElementsByClassName("w-list__item-label")[2].dispatchEvent(new Event('mousedown', {bubbles: true})); // sederhana
            await delay(500);
            usaha[i].click();
            await delay(500);
        }
    }
    if (confirm("Click all Ulasan Guru?")) {
        for (let i=0; i<total/6; i++)
        {
            // click ulasan guru icon
            document.getElementsByClassName("w-icon fa fa-pencil-square-o center")[i].click();
            await delay(500);
            // click kategori (cemerlang: total, sederhana: total+1, leamah: total+2)
            if (data[i]>=50)
                document.getElementsByClassName("w-radio__input primary")[total].click();
            else
                document.getElementsByClassName("w-radio__input primary")[total+1].click();
            await delay(500);
            // click folder ulasan
            document.getElementsByClassName("w-icon fa fa-folder-open mr1")[0].click();
            await delay(500);
            // click ulasan pilih button
            const ulasantp3 = [0, 2, 6];
            if (data[i]>=parseInt(document.getElementById('tp5').value))
                document.getElementsByClassName("w-button primary--bg size--md my1 my1")[8].click(); // pilih ke-9
            else if (data[i]>=parseInt(document.getElementById('tp4').value))
                document.getElementsByClassName("w-button primary--bg size--md my1 my1")[4].click(); // pilih ke-5
            else
                document.getElementsByClassName("w-button primary--bg size--md my1 my1")[ulasantp3[Math.floor(Math.random() * ulasantp3.length)]].click(); // pilih ke-1,3,7
            await delay(500);
            // click simpan
            document.getElementsByClassName("w-button primary--bg size--md ml1 ml1")[0].click();
            await delay(500);
        }
    }
}
