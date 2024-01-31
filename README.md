# Frontend Mentor - Password Generator App

This is a solution to the [Password Generator App](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)


## Overview

Hello! Welcome to my first solo Javascript project. After completing approximately 50% of Module 3 in [Scrimba's](scrimba.com) [Frontend Developer Career Path](https://scrimba.com/learn/frontend), I was excited to jump head first into my first "big" solo project. Scrimba recommended creating a Password Generator, and I remembered Frontend Mentor had a similar project suggested on their website. I found the basic requirements and additional stretch goals were already similar to the Frontend Mentor project, so I decided to be ambitious and try the latter project instead, hoping to kill two birds with one stone. 

My main goal of this project was to gain more confidence with Javascript (in addition with my HTML and CSS), and properly gauge how long it would take me to code a basic site from scratch. I initially gave myself deadline for completion of 2 days...pretty cheeky for someone who only knew only about a crumb of Javascript at the time. In the end I worked on-and-off of the code and finished in a little over 2 weeks. In terms of how many hours I spent on my code (not including breaks for dinner etc.), I finished work on the HTML and CSS files in about 6 hours. The Javascript portion took a majority of my time at 17 hours and 18 minutes. Overall time spent on code from start to finish 23 hours and 25 minutes. 

This Password Generator App produces a randomized passphrase for the User at the top of the screen. The User is able to customize the password length from 0 to 15, although when the slider is set to 0 the website will prompt the User to try again. The User must select between the provided four options in terms of what characters they would like their generated password to consist of: uppercase characters, lowercase characters, numbers, and symbols. Upon generation, there is a "strength meter" that labels the complexity and strength a created password has, from "weak," "medium," and "strong." There is an additional visual representation of the strength meter beside the verbal labels that change color from red, yellow, and green in accordance to the lebelled strength of the password. Finally, there is a button for the User to automatically copy the generated password to the clipboard for the User's convenience. The button will not copy the placeholder text before a password is generated, nor will it copy any text that appears due to an option error. 

### Screenshot

![Scrimba Password Generator: Basic Requirements](./imgs/Scrimba_Password%20Gen_%20Base%20Project%20Requirements.PNG)
![Scrimba Password Generator: Additional Details](./imgs/Scrimba_Password%20Gen_%20Addtl%20Details.PNG)
![Error: Password Length Cannot be 0!](./imgs/Length%20Zero.PNG)
![Final Screenshot](./imgs/Complete_Chrome%201-27-2024.PNG)


### Links
- Live Site URL: [Nicole Fortin_Password Generator App](https://lilbelpepper.github.io/NF_Password_Generator_App/)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Vanilla Javascript
- Flexbox


### What I learned

Where to even begin! My first bump in the road involved styling the sliding bar in CSS. It was the slider that made me realize that styling components do not carry across all browsers the same, as I had to create styling code for both Chrome/Safari (-webkit) and Firefox (-moz) separately. I primarily use Chrome as my main browser. My code at this time displays proper on Chrome and Firefox, though the slider on a Firefox browser could be adjusted a little to accomodate the active states when interacting with it. 

```css
#charLengthSlide::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #e4e3e8;
    cursor: pointer;
    transition: 0.1s;
    margin-top: -7px;
}

#charLengthSlide::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #e4e3e8;
    cursor: pointer;
}

```

Of course, a majority of my newfound knowledge lies with Javascript. Afterall, that's the goal of this project was, isn't it? I already knew the basics of variables, loops, functions, etc. thanks to previous undergraduate Python classes. In fact, I found myself mixing the two languages frequently, wondering why it has to be ```else if``` and not a simple ```elif```. 

I decided to work from the top down for my Javascript, that is: starting with the slider function, then the checkbox options, and finally the generate password function. 

At the time, the only interactability I'd learned was ```onclick``` in the html document. With the slider, I learned about the event listener. It was also within this function I learned you are able to change the styling of an element *within* Javascript which I thought was pretty cool! It made so much sense as to how the placeholder password text in the website's default state is a different color than when a password is actually generated in the design examples.  
```javascript
function getPassLength() {
    sliderEl.addEventListener("input", (event) => {
        const tempSliderValue = event.target.value;
        sliderValue.textContent = tempSliderValue;
        genPassLength = tempSliderValue;

        const progress = (tempSliderValue / sliderEl.max) * 100;
        sliderEl.style.background = `linear-gradient(to right, #a4ffac ${progress}%, #15141c ${progress}%)`;
    })
}
getPassLength()
```

My biggest lightbulb shining moment was creating the ```generatePass()``` function, that compiled all the options provided and pushed the created password to display. Scrimba provided a ```const``` array of all the uppercase, lowercase, numbers and symbols combined into one. Because there are 4 different character options, and the lists are not changing, I separated it into four different arrays with their respective characters. I focused on only generating a password that utilized uppercase characters first. Once I could confidently have a randomized phrase from just one array, I could move on to the other options as I imagined it would've been a similar if not the same process.  

At first, when the uppercase option was toggled, it was pulled directly from the initially declared array at the top. The characters would be randomized using ```Math.floor(Math.random())```. This worked at first, but then came the issue of randomizing the characters with the other options involved. ``randUpperChar + randLowerChar + randNum + randSymb`` wouldn't work as it would always create a passphrase in that order, thus not truly being randomized.  

After some research and snooping around, I found someone creating their own Password Generator code. They had the smart idea of creating an empty "multiselect" array that would be ammened according to whatever option the user chooses with the appropriate character list. I adopted a similar method into my code:

```javascript
function generatePass() {
    let charactersList = "" // Create an empty variable that will populate with the array characters depending on what option is selected
    let password = ""   // Create an empty variable that will store the selected characters from the charactersList

    // When the User checks any of the options these statements will ammend the characterList variable from the array of characters at the beginning of the code
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
}
```
Then came the issue of allowing the User to choose what length their passphrase should be. It took me a second to get my brain to wrap around this, but once I realized I could just implement a simple incrementing count loop, it was like another lightbulb shining moment.  The ```count``` variable of course would begin at 0. Once we receive the User's preferred length of password, we create a ```while``` loop that increments the ```count``` variable upon each loop. Once the variable hits the User's length of password, the ```while``` loop will break and display the User's newly generated passphrase.

```javascript
let count = 0

...
else if (genPassLength == 4) {
  while (count != 4) {
    let i = Math.floor(Math.random() * characterList.length)
    if (charactersList[i] === ",") {  // Because we're pulling directly from the array, it's separated by commas that we need to remove
      {}  // This prevents the code from pulling just a wall of commas and putting it into the passphrase
    }
    else {
      password += charactersList[i];
      count++;
      genPassword.textContent = password
    }

    if (count === 4) {  // Once the count variable is equal to 4, the length of the User's passphrase, the loop will break and will
      break;            // no longer pull anymore random characters.
    }
  }
}

```

### Continued development

I will admit, while I learned a lot about *how* to create and do things in Javascript, I haven't fully learned the *why* of some things. Scrimba begins their Javascript introduction to variables with ```let```, but research has shown me a couple other ways to declare variables through ```var``` and ```const```. My current understanding is that ```const``` is used when a variable will remain the same no matter what and cannot be updated further down the line. However, I can't say I could explain why someone would use ```let``` over ```var```. 

Another thing with variables in Javascript that seems to echo my lessons in Python: globally declared variables are considered sinful. Alright, maybe not sinful, but it's not preferred or at least bad practice. If I were to revisit this code again down the line I would want to see where I could move all of my globally declared variables in order to comply with the preferred way of doing things. 

I'd also like to learn how to make this code mobile-friendly! In this day and age, I personally hate when a website has a somewhat functional desktop webpage but is absolutely unusable via mobile. I'm excited as there is a Mobile App portion in the Scrimba class I'm taking so maybe once I'm done with that module I'll come back and see if I can add mobile-friendly features and displays.

Most importantly however, I need to keep accessibility into consideration. Looking at examples and other peer's code, I occasionally see the use of ```aria``` tags/labels. From what I understand, an aria-label works with screen readers for those who are visually impaired. However, there's still a whole subsection of aria-related labels that I have yet to learn about and implement into any of my coding. Just like keeping things mobile-friendly, keeping things accessible for the disabled community makes a huge difference.


## Author

- linkedIn - [Nicole Fortin](https://www.linkedin.com/in/nicole-fortin-3530b9211/)
- Frontend Mentor - [@LilBelPepper](https://www.frontendmentor.io/profile/LilBelPepper)


