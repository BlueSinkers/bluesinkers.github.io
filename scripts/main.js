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

let texts_intro = ["Hello, World!", "Hola, Mundo!", "హలో వరల్డ్!", "مرحبا بالعالم", "Salut, monde!"];
let texts_name = ["Hi, I'm Abhi!", "Hola, soy Abhi!", "హాయ్, నేను అభి!", "مرحبا اسمي ابهي", "Salut, je suis Abhi!"]
let texts_bye = ["See ya!", "Nos vemos!", "వీడ్కోలు!", "!مع السلامة", "Au revoir!"]
let curr = 0;

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



function cycleText() {
    const element1 = document.getElementById("cycle-text1");
    const element2 = document.getElementById("cycle-text2");
    const element3 = document.getElementById("cycle-text3");

    if (language_toggle) {
        element1.textContent = texts_intro[curr];
        element2.textContent = texts_name[curr];
        element3.textContent = texts_bye[curr];
        curr = (curr + 1) % texts_intro.length;
    } else {
        element1.textContent = texts_intro[0];
        element2.textContent = texts_name[0];
        element3.textContent = texts_bye[0];
    }
}


document.addEventListener("DOMContentLoaded", () => {
    setInterval(cycleText, 5000);
});

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