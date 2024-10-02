let cookieHTMLCodeFull = `

<div class='cookie-popup'>
<div class='cookie-popup-content-container'>
    <div class='cookie-panel'>
        <ul class="p-0 border-0">
            <li class='active consent-panel d-none'>Consent</li>
            <li class='details-panel d-none'>Details</li>
        </ul>
    </div>
    <div class='cookie-content cookie-mid'>
    
        <div class='cookie-consent'>
            <p>
                For more comprehensive information on how we manage personal data, please see our <b><a href='privacy-policy.html' class='privacy-policy-href'>Privacy Policy</a></b>. 
            </p>
        </div>
        <div class='cookie-consent2' style="text-align: center;">
            <h3 style="color: #1529a1;" data-tl="413">COOKIE DETAILS</h3>
            <p data-tl="414">
            Essential cookies are necessary for the website's core functionality and cannot be deactivated.
            </p>
        </div>
        <div class='cookie-cookies-display'>
            <div class='cookie-category cookie-cat-necessary'>
                <div class='data'>
                    <div class='data-resume'>
                        <div class='cat-main'>
                            <div title="You can't unselect this option.">
                                <div class='choose always-on active'></div>
                                <div class='cookie-cat-name' data-tl="415">Essential Cookies</div>
                            </div>
                            <div class='on-off'></div>
                        </div>
                        <div class='cat-describe' data-tl="416">These cookies are crucial for the website to function correctly and provide you with the services you request, such as navigating the site. Without these cookies, certain functions of the website may not operate properly.
                        </div>
                    </div>
                </div>
            </div>
            <div class='cookie-category cookie-cat-preferences'>
                <div class='data'>
                    <div class='data-resume'>
                        <div class='cat-main'>
                            <div>
                                <div class='choose active'></div>
                                <div class='cookie-cat-name' data-tl="417">Performance and Analytics Cookies</div>
                            </div>
                            <div class='on-off'></div>
                        </div>
                        <div class='cat-describe' data-tl="418">These cookies collect information about how you use our website, including the pages you visit and any errors you encounter. This helps us monitor website performance and improve the overall user experience. The data collected by these cookies is aggregated and anonymous.
                        </div>
                    </div>
                </div>
            </div>
            <div class='cookie-category cookie-cat-statistics'>
                <div class='data'>
                    <div class='data-resume'>
                        <div class='cat-main'>
                            <div>
                                <div class='choose active'></div>
                                <div class='cookie-cat-name' data-tl="419">Functionality Cookies</div>
                            </div>
                            <div class='on-off'></div>
                        </div>
                        <div class='cat-describe' data-tl="420">Functionality cookies allow the website to remember the choices you make, if any, and provide enhanced, personalised features. They are used to improve your browsing experience.
                        </div>
                    </div>
                </div>
            </div>
            <div class='cookie-category cookie-cat-marketing'>
                <div class='data'>
                    <div class='data-resume'>
                        <div class='cat-main'>
                            <div>
                                <div class='choose active'></div>
                                <div class='cookie-cat-name' data-tl="421">Advertising Cookies</div>
                            </div>
                            <div class='on-off'></div>
                        </div>
                        <div class='cat-describe' data-tl="422">These cookies are used to deliver advertisements that are relevant to you. They also limit the number of times you see an ad and help measure the effectiveness of advertising campaigns. These cookies are usually placed by third-party advertising networks with our permission.
                        </div>
                    </div>
                </div>
            </div>
            <div class='cookie-category cookie-cat-unclassified mb-0'>
                <div class='data'>
                    <div class='data-resume'>
                        <div class='cat-main'>
                            <div>
                                <div class='choose active'></div>
                                <div class='cookie-cat-name' data-tl="423">Under Review Cookies</div>
                            </div>
                            <div class='on-off'></div>
                        </div>
                        <div class='cat-describe' data-tl="424">We may employ certain cookies that are under evaluation to determine their purpose and relevance. While these cookies are being reviewed, they may collect data similar to other categories, such as performance or analytics. We are committed to ensuring these cookies align with our privacy standards.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>
<div class='cookie-decide'>
    <div class="pre-cookie-box d-flex gap-2 align-items-center justify-content-center mb-2 mb-lg-0">
    <div>
        <strong data-tl="410">Cookies Notice</strong>
        <p>
            <span data-tl="411">We use cookies to improve your experience and analyse website traffic. By continuing, you agree to our use of cookies. You can manage your preferences anytime.</span> <a class="cookie-box-toggle" data-tl="412"></a>
        </p>
        
    </div>
    </div>
    <ul>
        <li class='allow' data-tl="425">Accept</li>
        <li class='customize' data-tl="429">Customise</li>
        <li class='allow-selection dactive' data-tl="426">Allow Selection</li>
    </ul>
</div>
</div>
`

let cookiePageWrapper = document.querySelector(".cookie-popup-container")
cookiePageWrapper.innerHTML = cookieHTMLCodeFull

if(termsURL)
    document.querySelector(".privacy-policy-href").href = termsURL