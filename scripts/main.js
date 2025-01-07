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
let texts_name = ["Hi, I'm Abhi!", "Hola, soy Abhi!", "హాయ్, నేను అభి!", "مرحبا اسمي ابهي", "Salut, je suis Abhi!"]
let texts_bye = ["See ya!", "Nos vemos!", "వీడ్కోలు!", "!مع السلامة", "Au revoir!"]
let curr = 0;
let typingSpeed = 150;  // Typing speed (ms per character)
let typingstd = 20
let erasingSpeed = 40; // Erasing speed (ms per character)

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
    }
});

function typeText(element1, element2, element3, text, index = 0, currentText = '', typingDirection = true, callback) {
    // Add cursor element at the end of the text
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.fontWeight = 'normal';
    cursor.style.fontWeight = 'lighter'; // Makes the cursor thinner than normal
    cursor.style.transform = 'scaleX(0.25)'; // Scales the width to make it thinner while keeping the height same
    // Cursor should be inline with the text

    // Function to update the text with cursor at the end
    function updateTextWithCursor() {
        element1.textContent = currentText;
        element1.appendChild(cursor); // Always append the cursor at the end
    }

    // Function to check if a character is part of the Latin alphabet
    function isLatinChar(char) {
        return /^[A-Za-z]$/.test(char);
    }
    if (index < text.length) {
        let charToType = text.charAt(index);
        // Introduce a typo with a small probability for Latin characters only
        if (isLatinChar(charToType) && Math.random() < 0.02 && index > 0) { // 2% chance of a typo for Latin letters
            const typoChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
            currentText += typoChar;
            updateTextWithCursor(); // Update text with the typo and cursor

            setTimeout(() => {
                // Correct the typo
                currentText = currentText.slice(0, -1) + charToType; // Remove typo and add the correct character
                updateTextWithCursor(); // Update text with the corrected character
                setTimeout(() => typeText(element1, element2, element3, text, index + 1, currentText, typingDirection, callback), getRandomNormal(120, 15));
            }, getRandomNormal(typingSpeed, typingstd)); // Typo correction delay 
        } else {
            currentText += charToType;
            updateTextWithCursor(); // Update text with the character and cursor

            setTimeout(() => typeText(element1, element2, element3, text, index + 1, currentText, typingDirection, callback), getRandomNormal(typingSpeed, typingstd));
        }
    } else if (typingDirection) {
        // After typing is complete, remove the cursor and start erasing
        cursor.style.display = 'none'; // Hide the cursor
        let timer_id = setInterval(toggleCursor, 700);
        // After typing, start erasing immediately
        setTimeout(() => eraseText(element1, text, currentText, callback, timer_id), 2500); // No pause before erasing
    }
}


function eraseText(element, text, currentText, callback, timer_id) {
    clearInterval(timer_id);
    
    // Function to update the text with cursor at the end
    function updateTextWithCursor() {
        element.textContent = currentText;
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.fontWeight = 'normal';
        cursor.style.fontWeight = 'lighter'; // Makes the cursor thinner than normal
        cursor.style.transform = 'scaleX(0.25)';
        cursor.style.display = 'inline'; // Ensure the cursor is inline with the text
        element.appendChild(cursor); // Append the cursor at the end
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


function cycleText() {
    const element1 = document.getElementById("cycle-text1");
    const element2 = document.getElementById("cycle-text2");
    const element3 = document.getElementById("cycle-text3");

    // Proceed only if language_toggle is 1
    if (language_toggle === 1) {
        // Type the first text for element1
        typeText(element1, element2, element3, texts_intro[curr], 0, '', true, () => {
            // Once the typing is done, just move to the next language
            curr = (curr + 1) % texts_intro.length;  // Cycle through languages
            cycleText();  // Continue the cycle
        });
    } else {
        // Directly show the first element when language_toggle is off
        element1.textContent = texts_intro[0];
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
        element1.appendChild(cursor);
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
