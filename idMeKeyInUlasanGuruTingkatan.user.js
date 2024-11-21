// ==UserScript==
// @name         idMe Key In Ulasan Guru Tingkatan
// @namespace    http://tampermonkey.net/
// @version      2024-07-10
// @description  Ulasan Guru Tingkatan PBD IDME
// @author       You
// @match        https://moeissppb.moe.gov.my/pengurusan/pbd/pbd/*
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

function ulasan(inputElement,s) {
    inputElement.value = s;
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
}

async function startfill()
{
    let r = document.getElementsByClassName("w-table__row");
    for (let i=0; i<r.length; i++){
        let s = r[i].getElementsByClassName("w-table__cell text-left");
        let n=0;
        let total=0;
        [...s].forEach(m =>{
            let mark=parseInt(m.textContent.split("TP")[1]);
            if (m.textContent.split("TP").length==2 && mark) {n++; total+=mark;}
        });
        let gp = total/n;
        document.getElementsByClassName("w-icon fa fa-pencil-square-o center")[i].click();
        await delay(500);
        let inputElement=document.getElementsByClassName("w-textarea__textarea")[0];
        if (gp >= 4.5)
            ulasan(document.getElementsByClassName("w-textarea__textarea")[0],`Tahniah atas kejayaan anda yang cemerlang. Teruskan berusaha bersungguh-sungguh untuk terus mencapai kecemerlangan pada masa akan datang dengan penuh gemilang.`);
        else if (gp >= 4.3)
            ulasan(document.getElementsByClassName("w-textarea__textarea")[0],`Tahniah diucapkan atas pencapaian dan prestasi yang cemerlang. Tingkatkan usaha untuk terus cemerlang dalam segala bidang pada masa akan datang.`);
        else if (gp >= 4)
            ulasan(document.getElementsByClassName("w-textarea__textarea")[0],`Anda lakukan yang terbaik. Syabas diucapkan di atas pencapaian yang baik. Teruskan berusaha bersungguh-sungguh demi sebuah kejayaan yang sedang menanti.`);
        else if (gp >= 3.6)
            ulasan(document.getElementsByClassName("w-textarea__textarea")[0],`Usaha tangga kejayaan. Tahniah di atas pencapaian yang baik. Cikgu doakan anda akan menjadi murid yang cemerlang. Teruskan usaha.`);
        else
            ulasan(document.getElementsByClassName("w-textarea__textarea")[0],`Anda pasti berjaya sekiranya anda berusaha bersungguh-sungguh kerana anda memiliki potensi yang sangat baik. Tingkatkan usaha untuk mencapai kejayaan.`);
        document.getElementsByClassName("w-button primary--bg size--md ml1 ml1")[0].click();
        await delay(2000);
        document.getElementsByClassName("swal2-confirm swal2-styled")[0].click();
        await delay(500);
        //alert((i+1) + ":" + gp);
    }
    alert("Finish");
}
