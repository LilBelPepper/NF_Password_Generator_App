const upperChar = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerChar = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbChar = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const sliderEl = document.getElementById("charLengthSlide")
const sliderValue = document.getElementById("passLength-el")
let upperChars = false
let lowerChars = false
let numChars = false
let symbChars = false
let genPassLength = ""

function getPassLength() {
    sliderEl.addEventListener("input", (event) => {
        const tempSliderValue = event.target.value;
        sliderValue.textContent = tempSliderValue;
        genPassLength = tempSliderValue

        const progress = (tempSliderValue / sliderEl.max) * 100;
        sliderEl.style.background = `linear-gradient(to right, #a4ffac ${progress}%, #15141c ${progress}%)`;
    })
}
getPassLength()

function copyClip() {
    let clipArea = document.getElementById("genPassword-el")
    let clipStore = document.createElement("textarea")

    if (clipArea.textContent === "P4$5W0rD!" || clipArea.textContent === "Too Short. Try Again." || clipArea.textContent === "Try Again Later." || clipArea.textContent === "Choose an option below.") {
        {}
    }

    else {
        clipStore.select();
        clipStore.value = clipArea.innerHTML;
        clipArea.appendChild(clipStore);
        clipStore.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(clipStore.value)
        clipArea.removeChild(clipStore)       
    }

}

function isUpper() {
    var upperCheckBox = document.getElementById("uppercase");
    if (upperCheckBox.checked == true) { 
        upperChars = true
    }
    else {
        upperChars = false
    }

}

function isLower() {
    var lowerCheckBox = document.getElementById("lowercase");
    if (lowerCheckBox.checked == true) {
        lowerChars = true
    }
    else {
        lowerChars = false
    }
}

function withNum() {
    var numCheckBox = document.getElementById("numbers");
    if (numCheckBox.checked == true) {
        numChars = true
    }
    else {
        numChars = false
    }
}

function withSymbs() {
    var symbCheckBox = document.getElementById("symbols");
    if (symbCheckBox.checked == true) {
        symbChars = true
    }
    else {
        symbChars = false
    }
}

function passStrengthGen() {
    let strength = 0
    let passStrength = document.getElementById("passStrength")
    const weak = document.querySelector(".weak")
    const weakMed = document.querySelector(".weak-med")
    const med = document.querySelector(".medium")
    const strong = document.querySelector(".strong")

    if (upperChars === true || lowerChars === true) {
        strength += 1   
    }
    if (numChars === true) {
        strength += 1
    }
    if (symbChars === true) {  
        strength += 1
    }
    if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
        weak.style.background = "#24232b";
        weakMed.style.background = "#24232b";
        med.style.background = "#24232b";
        strong.style.background = "#24232b";
    }
    
    if (genPassLength < 6 ) {
        strength = 1

    }
    else if ((genPassLength >= 6) && (genPassLength < 10 )) {
        strength += 1

    }
    else if ((genPassLength >= 10) && (genPassLength <= 15 )) {
        strength += 1
    }

    if (strength <= 1 ) {
        passStrength.textContent = "WEAK";
        weak.style.background = "#CE3D49";
        weakMed.style.background = "#24232b";
        med.style.background = "#24232b";
        strong.style.background = "#24232b";
    }
    else if (strength === 2) {
        passStrength.textContent = "WEAK";
        weak.style.background = "#CE3D49";
        weakMed.style.background = "#CE3D49";
        med.style.background = "#24232b";
        strong.style.background = "#24232b";
    }
    else if (strength === 3) {
        passStrength.textContent = "MEDIUM";
        weak.style.background = "#F7CB64";
        weakMed.style.background = "#F7CB64";
        med.style.background = "#F7CB64";
        strong.style.background = "#24232b"
    }
    else if (strength === 4) {
        passStrength.textContent = "STRONG"
        weak.style.background = "#23ad5c"
        weakMed.style.background = "#23ad5c"
        med.style.background = "#23ad5c"
        strong.style.background = "#23ad5c"
    }
}




function generatePass() {
    let charactersList = ""
    let password = "" 
    let count = 0 

    if (upperChars === true) {
        charactersList += upperChar
    }
    if (lowerChars === true) {
        charactersList += lowerChar
    }
    if (numChars === true) {
        charactersList += numChar
    }
    if (symbChars === true) {
        charactersList += symbChar
    }            
    let genPassword = document.getElementById("genPassword-el")
    genPassword.style.color = "#e4e3e8"
    genPassword.textContent = "" 


    if (genPassLength == 0 || (genPassLength == 1)) {
        genPassword.textContent = "Too Short. Try Again." 

    }

    else if (genPassLength == 2) {
        while (count != 2) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 2) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 3) {
        while (count != 3) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 3) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 4) {
        while (count != 4) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 4) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 5) {
        while (count != 5) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 5) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 6) {
        while (count != 6) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 6) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 7) {
        while (count != 7) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 7) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 8) {
        while (count != 8) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 8) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 9) {
        while (count != 9) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 9) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 10) {
        while (count != 10) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 10) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 11) {
        while (count != 11) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 11) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 12) {
        while (count != 12) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 12) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 13) {
        while (count != 13) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 13) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 14) {
        while (count != 14) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 14) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else if (genPassLength == 15) {
        while (count != 15) {
            let i = Math.floor(Math.random() * charactersList.length)
            if (charactersList[i] === ",") {
                {}
            }
            else {
                password += charactersList[i]
                count++;
                genPassword.textContent = password
            }
            if (count === 15) {
                break;
            }
        }
        if (upperChars === false && lowerChars === false && numChars === false && symbChars === false) {
            genPassword.textContent = "Choose an option below."
        }
    }
    else {
        genPassword.textContent = "Try Again Later."
    }
    passStrengthGen()

}

