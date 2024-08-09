"use strict";

export const notificationTabs = () => {
    const tabContainer = document.getElementById("tabs-container");
    if (!tabContainer) return;
    const tabs = Array.from(tabContainer.querySelectorAll("[data-type='tab']"))
    const tabContent = Array.from(tabContainer.querySelectorAll("[data-type='tab-content']"))
    if (tabs.length !== tabContent.length) return;

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tab.classList.add("activate");
            tabContent[index].classList.remove("hidden");
            tabs.forEach((tab, key) => {
                if (index !== key) {
                    tab.classList.remove("activate")
                    tabContent[key].classList.add("hidden")
                }
            });
        })
    })
}