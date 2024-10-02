// DATA PREPARATION PROCESS STARTS HERE

let cookiePopup = "cookie-notice-" + siteID

// Step 1: Get all cookies
function getCookies() {
    let cookies = {};

    if (document.cookie)
        document.cookie.split(";").forEach((cookie) => {
            const [name, value] = cookie.trim().split("=");
            cookies[name] = value;
        });

    return cookies;
}

// Step 2: Parse cookies
function parseCookies() {
    const cookies = getCookies();
    const parsedCookies = [];
    for (const [name, value] of Object.entries(cookies)) {
        const [cookieValue, ...options] = value.split("; ");
        const cookie = {
            name,
            value: cookieValue,
        };
        options.forEach((option) => {
            const [key, val] = option.split("=");
            cookie[key] = val;
        });
        parsedCookies.push(cookie);
    }
    return parsedCookies;
}

// Step 3: Classify cookies
function classifyCookies() {
    const cookies = parseCookies();
    const classifiedCookies = {
        necessary: [],
        statistics: [],
        marketing: [],
        preferences: [],
        unclassified: [],
    };
    const regex = {
        necessary: /^cookie-notice-[^=]+$/,
        statistics: /^(ga|_ga|_gid|_gat_|__utma|__utmb|__utmc|__utmz)$/,
        marketing: /^(fbp|_fbp|fr|_fr|tr|_tr|tawkUUID|tawkUUID|tawkConnectionTime|_uetsid|_uetvid|_cc_cc|_cc_aud|_cc_dc)$/,
        preferences: /^(language_|currency_|timezone_|theme_|product_category_|consent_cookie)$/,
    };
    cookies.forEach((cookie) => {
        const { name } = cookie;
        let matched = false;
        Object.keys(regex).forEach((category) => {
            if (name.match(regex[category])) {
                classifiedCookies[category].push(cookie);
                matched = true;
            }
        });
        if (!matched) {
            classifiedCookies.unclassified.push(cookie);
        }
    });
    return classifiedCookies;
}

// Cookies Classification
const classifiedNecessary = classifyCookies().necessary;
const classifiedStatistics = classifyCookies().statistics;
const classifiedMarketing = classifyCookies().marketing;
const classifiedPreferences = classifyCookies().preferences;
const classifiedUnclassified = classifyCookies().unclassified;


// DATA PREPARATION PROCESS ENDS HERE

// FRONTEND WORK STARTS HERE

const cookiePopupContainer = document.querySelector(".cookie-popup-container"); // cookie container

// Cookie panel and top options
const cookiePanel = document.querySelector(".cookie-panel");
const cookiePanelOptions = document.querySelectorAll(".cookie-panel ul li");

// Cookie content for each option
const cookieConsentContent = document.querySelector(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-mid .cookie-consent");
const cookieCookiesDisplayContent = document.querySelector(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-mid .cookie-cookies-display");

// Cookie categories (necessary cookies, statistics cookies, marketing cookies, preferences cookies, unclassified cookies)
const cookieCategories = document.querySelectorAll(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-category");
const cookieCatNecessary = document.querySelector(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-cat-necessary");
const cookieCatStatistics = document.querySelector(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-cat-statistics");
const cookieCatMarketing = document.querySelector(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-cat-marketing");
const cookieCatPreferences = document.querySelector(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-cat-preferences");
const cookieCatUnclassified = document.querySelector(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-cat-unclassified");

// Elements for each cookie category: name, check mark to set on and off and counter of cookies in each categroy
const cookieCatMains = document.querySelectorAll(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-category .cat-main > div");
const cookieCatNames = document.querySelectorAll(".cookie-popup-container .cookie-popup .cookie-popup-content-container .cookie-cat-name");
const cookieCheckMarks = document.querySelectorAll(".cookie-popup-container .cookie-popup .cookie-popup-content-container .choose");

// Cookie popup buttons (customize will become allow selection in details panel)
const cookieCustomizeBtn = document.querySelector(".cookie-popup-container .cookie-popup .cookie-decide .customize");
const cookieAllowCustomisedBtn = document.querySelector(".cookie-popup-container .cookie-popup .cookie-decide .allow-selection");
const cookieAllowBtn = document.querySelector(".cookie-popup-container .cookie-popup .cookie-decide .allow");

// Active Content
function setActiveMidContent(option) {
    // If user clicked "Consent" in panel, we will show consent text content
    if (option.classList.contains("consent-panel")) {
        cookieConsentContent.style.display = "block";
        cookieCookiesDisplayContent.style.display = "none";
    }

    // If user clicked "Details" in panel, we will show the cookies panel with classification and cookies list
    else if (option.classList.contains("details-panel")) {
        cookieConsentContent.style.display = "none";
        cookieCookiesDisplayContent.style.display = "block";
    }

    // In case we have the cookies panel active, we'll hide "Customize" button and show "Allow Selection"; In other panels, we'll change back to "Customize" visible and "Allow Selection" hidden
    if (document.querySelector(".cookie-panel ul li.details-panel").classList.contains("active")) {
        cookieCustomizeBtn.style.display = "none";
        cookieAllowCustomisedBtn.style.display = "block";
    } else {
        cookieCustomizeBtn.style.display = "block";
        cookieAllowCustomisedBtn.style.display = "none";
    }
}

// When user clicks on option in cookie panel we'll set that specific option as active and then call the setActiveMidContent function to make sure we're matching option with specific content
cookiePanelOptions.forEach((option) => {
    option.addEventListener("click", function () {
        // Set all options inactive
        cookiePanelOptions.forEach((panelOption) => {
            panelOption.classList.remove("active");
        });

        // Set clicked option active and call setActiveMidContent() function to show specific content, based on selection
        option.classList.add("active");
        setActiveMidContent(option);
    });
});
const toggleBtn = document.querySelector(".cookie-box-toggle");
toggleBtn.addEventListener('click', function () {
    document.querySelector(".cookie-popup-content-container").classList.toggle("open");
    document.querySelector(".site-icon").classList.toggle('img-border');
});

// When "Customize" button from the bottom of the popup is clicked, remove the active class from other tabs, set details tab as active and display content about the cookies
cookieCustomizeBtn.addEventListener("click", function () {
    document.querySelector(".cookie-popup-content-container").classList.toggle("open");
    if (!document.querySelector(".cookie-panel ul li.details-panel").classList.contains("active"))
        cookiePanelOptions.forEach((panelOption) => {
            panelOption.classList.remove("active");
        });

    document.querySelector(".cookie-panel ul li.details-panel").classList.add("active");
    setActiveMidContent(document.querySelector(".cookie-panel ul li.details-panel"));

});

// Init state: always on consent tab
setActiveMidContent(document.querySelector(".cookie-popup .cookie-panel ul li.active"));

// Disable/Reenable category when user clicks on cookie category
cookieCatMains.forEach((category) => {

    category.addEventListener("click", function () {
        // In case user wants to disable mandatory cookies category, alert him that's not possible
        if (category.querySelector(".choose").classList.contains("always-on"))
            alert(
                "Mandatory - can not be deselected. Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies."
            );
        else {
            // Disable cookies
            if (category.querySelector(".choose").classList.contains("active"))
                category.querySelector(".choose").classList.remove("active");
            else
                // Enable cookies
                category.querySelector(".choose").classList.add("active");
        }
    });
});


// FRONTEND WORK ENDS HERE

// INTEGRATE FE WITH BE PROCESS STARTS HERE

// Set cookie with specific name, value and duration !Used 5s for testing, don't forget to set days back
function setcookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        // date.setTime(date.getTime()+5*1000); // TO BE COMMENTED
        var expires = "; expires=" + date.toGMTString(); //
    } else var expires = "";
    document.cookie = name + "=" + value + expires + ";path=/"; // + and " added
}

// Check if the user is in incognito mode
function isIncognito() {
    return !!(window.webkitRequestFileSystem || window.RequestFileSystem);
}

// Set the cookie popup to display
function showCookiePopup() {
    document.querySelector(".cookie-popup-container").style.display = "flex";
}


// Hide the cookie popup and set a verification cookie when the user makes a selection to be able to decide if popup will be shown when user interacts again with the website

function decideCookies() {
    var popup = document.querySelector(".cookie-popup-container");
    popup.style.display = "none";

    // Set the cookie with a 90-day expiration
    setcookie(cookiePopup, "true", 90);
}

// Check if the cookie has been set and show the cookie popup if it hasn't or if the user is in incognito mode
function checkCookiesAccepted() {
    var cookiesAccepted = document.cookie.match('(^|;\\s*)' + cookiePopup + '\\s*=\\s*([^;]+)');
    if (!cookiesAccepted || cookiesAccepted[2] !== "true") {
        showCookiePopup();
    }
}

// Helper function to retrieve the value of a cookie by its name
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");

    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Disable selected cookies by setting date in the past
function disableCookies(cookieCategories) {
    cookieCategories.forEach(function (category) {
        category.forEach(function (cookieObj) {
            var cookieName = cookieObj.name;
            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // in case we need to disable cookie, we'll set its expiration date in the past
        });
    });
}

// User clicks Allow All: enable all cookies and go in decideCookies()
cookieAllowBtn.addEventListener("click", function () {
    decideCookies();
});

// User clicks Allow Selection: Disable the cookies which are not selected, enable the ones which are selected and go in decideCookies()
cookieAllowCustomisedBtn.addEventListener("click", function () {
    let cookiesToDisable = new Array();
    // If cookie category is not active, push it to cookiesToDisable array
    if (!cookieCatPreferences.querySelector(".choose").classList.contains("active")) cookiesToDisable.push(classifiedPreferences);
    if (!cookieCatStatistics.querySelector(".choose").classList.contains("active")) cookiesToDisable.push(classifiedStatistics);
    if (!cookieCatMarketing.querySelector(".choose").classList.contains("active")) cookiesToDisable.push(classifiedMarketing);
    if (!cookieCatUnclassified.querySelector(".choose").classList.contains("active")) cookiesToDisable.push(classifiedUnclassified);

    disableCookies(cookiesToDisable); // disable cookies which are deactivated
    decideCookies();
});

checkCookiesAccepted(); // Check if cookie pop-up should be shown (if cookie-notice-ID expired and needs update )

// INTEGRATE FE WITH BE PROCESS ENDS HERE

// TESTING DATA STARTS HERE

// // Statistics cookies
// setcookie("_ga", "GA1.2.1234567890.1616380655", 90);
// setcookie("_gid", "GA1.2.987654321.1616380655", 90);
// setcookie("_gat_UA-123456-7", "1", 90);
// setcookie("__utma", "123456789.987654321.1616380655.1616380655.1616380655.1", 90);
// setcookie("__utmb", "123456789.1.10.1616380655", 90);
// setcookie("__utmc", "123456789", 90);
// setcookie("__utmz", "123456789.1616380655.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)", 90);

// // Marketing cookies
// setcookie("fbp", "fb.1.1616380655.1234567890", 90);
// setcookie("utm_source", "google", 90);
// setcookie("utm_medium", "cpc", 90);
// setcookie("utm_campaign", "summer_sale", 90);
// setcookie("referral_code", "friend567", 90);
// setcookie("ab_test", "variation_a", 90);

// // Preferences cookies
// setcookie("language_pref", "en_US", 90);
// setcookie("currency_pref", "USD", 90);
// setcookie("timezone_pref", "America/New_York", 90);
// setcookie("theme_pref", "light", 90);
// setcookie("product_category_pref", "clothing", 90);
// setcookie("consent_cookie", "true", 90);

// TESTING DATA ENDS HERE
