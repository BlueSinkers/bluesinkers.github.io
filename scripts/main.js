// Function to change the background color of the element with class 'intro-banner'
function changeBackgroundColor() {
    const introBanner = document.querySelector('.intro-banner');
    if (introBanner) {
        introBanner.style.backgroundColor = 'rgba(200, 200, 200, 0)'; // Change background color on hover
    }
}

// Function to revert the background color of the element with class 'intro-banner'
function revertBackgroundColor() {
    const introBanner = document.querySelector('.intro-banner');
    if (introBanner) {
        introBanner.style.backgroundColor = 'rgba(255,255,255,0.8)'; // Revert background color
    }
}
function revertBackgroundColor2() {
    const transparency = document.getElementById('contactbanner');
    const endingBanner = document.querySelector('.ending-banner');
    transparency.style.backgroundColor = 'rgba(255,255,255,.8)'; // Revert background color
    endingBanner.style.backgroundColor = 'rgba(255,255,255,.8)'; //change bg color again
}

function changeBackgroundColor2() {
    const transparency = document.getElementById('contactbanner');
    const endingBanner = document.querySelector('.ending-banner');
    transparency.style.backgroundColor = 'rgba(255,255,255,0)'; // Revert background color
    endingBanner.style.backgroundColor = 'rgba(255,255,255,0)'; //change bg color again
}

// Add event listeners to the link with ID 'hover-here'
document.addEventListener('DOMContentLoaded', function() {
    const hoverLink = document.getElementById('hover-here');
    const hoverLink2 = document.getElementById('hover-here-2')
    if (hoverLink) {
        hoverLink.addEventListener('mouseover', changeBackgroundColor);
        hoverLink.addEventListener('mouseout', revertBackgroundColor);
    } 
    if (hoverLink2) {
        hoverLink2.addEventListener('mouseover', changeBackgroundColor2);
        hoverLink2.addEventListener('mouseout', revertBackgroundColor2);
    }
});

let texts_intro = ["Hello, World!", "Hola, Mundo!", "హలో వరల్డ్!", "مرحبا بالعالم", "Salut, monde!", "नमस्ते दुनिया!"];
let texts_name = ["Hi, I'm Abhi!", "Hola, soy Abhi!", "హాయ్, నేను అభి!", "مرحبا اسمي ابهي", "Salut, je suis Abhi!", "नमस्ते, मेरा नाम अभि है।!"]
let texts_bye = ["See ya!", "Nos vemos!", "వీడ్కోలు!", "!مع السلامة", "Au revoir!", "अलविदा!"]

let numlang = 6;
let curr = 0;
let typingSpeed = 150;  // Typing speed (ms per character)
let typingstd = 20
let erasingSpeed = 40; // Erasing speed (ms per character)
let staytime = 5;
let language_toggle = 1;
document.getElementById('language-toggle').addEventListener('click', function() {
    const button = this;
    if (language_toggle) {
        language_toggle = 0;
        button.classList.remove('btn-light', 'text-dark');
        button.classList.add('btn-dark', 'text-light');
        button.textContent = 'CLICK FOR LANGUAGE ON';
        const element1 = document.getElementById("cycle-text1");
        const element2 = document.getElementById("cycle-text2");
        const element3 = document.getElementById("cycle-text3");
        element1.textContent = texts_intro[0];
        element2.textContent = texts_name[0];
        element3.textContent = texts_bye[0];
    } else {
        language_toggle = 1;
        button.classList.remove('btn-dark', 'text-light');
        button.classList.add('btn-light', 'text-dark');
        button.textContent = 'CLICK FOR LANGUAGE OFF!';
        cycleText();
    }
});

function typeText(element, text, index = 0, currentText = '', typingDirection = true, callback, curr) {
    if (language_toggle == 0) { 
        element.textContent = texts_intro[0];
    } else {
        cycleTextMan(curr % 6); 
        console.log(curr);
        // Add cursor element at the end of the text
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.fontWeight = 'normal';
        cursor.style.fontWeight = 'lighter'; // Makes the cursor thinner than normal
        cursor.style.transform = 'scaleX(0.25)'; // Scales the width to make it thinner while keeping the height same
        // Cursor should be inline with the text

        // Function to update the text with cursor at the end
        function updateTextWithCursor(arab) {
            const element = document.getElementById("cycle-text1"); // Assuming this is the element you're working with
            if (!element) return;
            
            if (!arab) {
                element.textContent = currentText;  // Set the text
                element.appendChild(cursor);  // Append the cursor at the end
            } 
            // If arab is true, place the cursor at the beginning and then the text
            else {
                element.textContent = '';  // Clear existing text
                element.appendChild(cursor);  // Place the cursor first
                element.appendChild(document.createTextNode(currentText));  // Then append the text after the cursor
            }
        }

        // Function to check if a character is part of the Latin alphabet
        function isLatinChar(char) {
            return /^[A-Za-z]$/.test(char);
        }

        function isArabChar(char) {
            return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+$/.test(char);
        }

        if (index < text.length) {
            let charToType = text.charAt(index);
            let arab = isArabChar(charToType) || (charToType==' ' && isArabChar(text.charAt(index-1)));

            // Introduce a typo with a small probability for Latin characters only
            if (isLatinChar(charToType) && Math.random() < 0.02 && index > 0) { // 2% chance of a typo for Latin letters
                const typoChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
                currentText += typoChar;
                updateTextWithCursor(arab); // Update text with the typo and cursor

                setTimeout(() => {
                    // Correct the typo
                    currentText = currentText.slice(0, -1) + charToType; // Remove typo and add the correct character
                    updateTextWithCursor(arab); // Update text with the corrected character
                    setTimeout(() => typeText(element, text, index + 1, currentText, typingDirection, callback, curr), getRandomNormal(typingSpeed, typingstd));
                }, getRandomNormal(typingSpeed, typingstd)); // Typo correction delay 
            } else {
                currentText += charToType;
                updateTextWithCursor(arab); // Update text with the character and cursor

                setTimeout(() => typeText(element, text, index + 1, currentText, typingDirection, callback, curr), getRandomNormal(typingSpeed, typingstd));
            }
        } else if (typingDirection) {
            // After typing is complete, remove the cursor and start erasing
            cursor.style.display = 'none'; // Hide the cursor
            let timer_id = setInterval(toggleCursor, 700);
            // After typing, start erasing immediately
            setTimeout(() => eraseText(element, text, currentText, callback, timer_id), staytime*1000); // No pause before erasing
        }
    }
}

function typeTextMan(element, text) {
    let index = 0;  // Start from the first character
    let currentText = '';  // The text that will be typed out
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.fontWeight = 'lighter'; // Makes the cursor thinner than normal
    cursor.style.transform = 'scaleX(0.25)'; // Scales the width to make it thinner while keeping the height same

    // Function to update the text with the cursor at the end
    function updateTextWithCursor() {
        const element = document.getElementById("cycle-text1"); // Assuming this is the element you're working with
        if (!element) return;

        element.textContent = currentText;  // Set the text
        element.appendChild(cursor);  // Append the cursor at the end
    }

    // Function to check if a character is part of the Latin alphabet
    function isLatinChar(char) {
        return /^[A-Za-z]$/.test(char);
    }

    // Function to check if a character is an Arabic letter
    function isArabChar(char) {
        return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+$/.test(char);
    }

    if (index < text.length) {
        let charToType = text.charAt(index);
        let arab = isArabChar(charToType) || (charToType === ' ' && isArabChar(text.charAt(index - 1)));

        // Introduce a typo with a small probability for Latin characters only
        if (isLatinChar(charToType) && Math.random() < 0.02 && index > 0) { // 2% chance of a typo for Latin letters
            const typoChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
            currentText += typoChar;
            updateTextWithCursor(); // Update text with the typo and cursor

            setTimeout(() => {
                // Correct the typo
                currentText = currentText.slice(0, -1) + charToType; // Remove typo and add the correct character
                updateTextWithCursor(); // Update text with the corrected character
                setTimeout(() => typeText(element, text), getRandomNormal(typingSpeed, typingstd));
            }, getRandomNormal(typingSpeed, typingstd)); // Typo correction delay
        } else {
            currentText += charToType;
            updateTextWithCursor(); // Update text with the character and cursor

            setTimeout(() => typeText(element, text), getRandomNormal(typingSpeed, typingstd));
        }
    }
}

// Example usage:
// const text = "Hello, world!";
// typeText(document.getElementById("cycle-text1"), text);


function eraseText(element, text, currentText, callback, timer_id) {
    
    clearInterval(timer_id);
    if (language_toggle == 0) { 
        element.textContent = texts_intro[0];
    } else {
        function isArabChar(char) {
            return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+$/.test(char);
        }
        let arab = isArabChar(text[0]);
        // Function to update the text with cursor at the end
        function updateTextWithCursor() {
            if (arab) {
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.fontWeight = 'normal';
                cursor.style.fontWeight = 'lighter'; // Makes the cursor thinner than normal
                cursor.style.transform = 'scaleX(0.25)';
                cursor.style.display = 'inline'; // Ensure the cursor is inline with the text
            
                element.textContent = '';  // Clear existing content
                element.appendChild(cursor); // Place the cursor first
                element.appendChild(document.createTextNode(currentText)); // Then add the text
            } else {
                element.textContent = currentText;
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.fontWeight = 'normal';
                cursor.style.fontWeight = 'lighter'; // Makes the cursor thinner than normal
                cursor.style.transform = 'scaleX(0.25)';
                cursor.style.display = 'inline'; // Ensure the cursor is inline with the text
                element.appendChild(cursor); // Append the cursor at the end
            }
        
        }

        if (currentText.length > 1) {
            currentText = currentText.slice(0, -1); // Remove the last character
            updateTextWithCursor(); // Update the text with the cursor at the end
            
            setTimeout(() => eraseText(element, text, currentText, callback, timer_id), erasingSpeed);
        } else {
            // Instead of a space, start with the letter "a"
            currentText = ' ';  // Add " " (a space) instead of a letter

            updateTextWithCursor(); // Update the text with the cursor at the end

            // After everything is erased, call the callback to continue
            setTimeout(callback, 200);
        }
    }
}

function eraseContent(element) {
    let currentText = element.textContent;  // Get the current text content of the element

    function updateTextWithCursor() {
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.fontWeight = 'lighter'; // Makes the cursor thinner than normal
        cursor.style.transform = 'scaleX(0.25)';
        cursor.style.display = 'inline'; // Ensure the cursor is inline with the text

        element.textContent = currentText;  // Set the current text (no new text is added)
        element.appendChild(cursor); // Append the cursor at the end
    }
    
    if (currentText.length > 0) {
        // Remove the last character
        currentText = currentText.slice(0, -1);

        updateTextWithCursor(); // Update the text with the cursor at the end

        setTimeout(() => eraseContent(element), erasingSpeed); // Use the erasingSpeed constant
    }
    
}


function cycleText() {
    const element1 = document.getElementById("cycle-text1");

    // Proceed only if language_toggle is 1
    if (language_toggle === 1) {
        // Type the first text for element1
        typeText(element1, texts_intro[curr], 0, '', true, () => {
            // Once the typing is done, just move to the next language
            curr = (curr + 1) % texts_intro.length;  // Cycle through languages
            cycleTextMan();
            cycleText();  // Continue the cycle
        }, 0);
    } else {
            element1.textContent = texts_intro[0];
            element2.textContent = texts_name[0];
            element3.textContent = texts_bye[0];
    }
}

function cycleTextMan() {
    const element2 = document.getElementById("cycle-text2");
    const element3 = document.getElementById("cycle-text3");

    if (language_toggle) {
        element2.textContent = texts_name[curr];
        element3.textContent = texts_bye[curr];
    } else {
        element2.textContent = texts_name[0];
        element3.textContent = texts_bye[0];
    }
}


// Utility function for random typing/erasing speed
function getRandomNormal(mean, stdDev) {
    let u = 1 - Math.random(); // Uniform(0,1) random number
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); // Normal(0,1)
    return Math.round(mean + z * stdDev); // Transform to Normal(mean,stdDev)
}



function toggleCursor() {
    const element1 = document.getElementById("cycle-text1");
    if (!element1) return;

    let cursor = element1.querySelector("span");
    if (!cursor) {
        cursor = document.createElement("span");
        cursor.textContent = "|";
        element1.insertBefore(cursor, element1.firstChild);  // Place the cursor at the beginning
    }

    cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
}


cycleText();

document.getElementById('toggle-view-button').addEventListener('click', function() {
    var content = document.getElementById('toggle-content');
    var viewButton = document.getElementById('toggle-view-button');
    var closeButton = document.getElementById('toggle-close-button');

    // Show the content
    content.style.display = 'block';

    // Hide the "See more projects" button
    viewButton.style.display = 'none';

    // Show the "See less projects" button
    closeButton.style.display = 'inline';
    document.querySelector('#scroll-here').scrollIntoView({ behavior: 'smooth' });

});

document.getElementById('toggle-close-button').addEventListener('click', function() {
    var content = document.getElementById('toggle-content');
    var viewButton = document.getElementById('toggle-view-button');
    var closeButton = document.getElementById('toggle-close-button');

    // Hide the content
    content.style.display = 'none';

    // Hide the "See less projects" button
    closeButton.style.display = 'none';

    // Show the "See more projects" button
    viewButton.style.display = 'inline';
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
});