// ==UserScript==
// @name         IdMe Key in Mark
// @namespace    http://tampermonkey.net/
// @version      2024-07-01
// @description  IdMe Key in Mark
// @author       You
// @match        https://moeissppb.moe.gov.my/keputusan/peperiksaan/markah/*
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
    const form = document.querySelectorAll('.zsidebar.zshowmenu.md-hide.transparent--bg.white')[0];
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

async function startfill()
{
    // laod markah from textarea into data
    let v = document.getElementById("studentmarkah").value.split("\n");
    for (let i=0; i<v.length; i++)
    {
        if(v[i] != "")
        {
            const inputElement = document.querySelectorAll(".w-input__input")[i+1];

            // Set the value of the input element
            inputElement.value = parseFloat(v[i]);

            // Create and dispatch the input event
            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            inputElement.dispatchEvent(inputEvent);

            // Create and dispatch the change event
            const changeEvent = new Event('change', {
                bubbles: true,
                cancelable: true,
            });
            inputElement.dispatchEvent(changeEvent);

            // Create and dispatch a 'keyup' event for the space key
            var spaceKeyUpEvent = new KeyboardEvent('keyup', {
                bubbles: true,
                cancelable: true,
                key: ' ',
                code: 'Space',
                keyCode: 32,
                charCode: 32,
                which: 32,
            });
            inputElement.dispatchEvent(spaceKeyUpEvent);
        }
    }
}
