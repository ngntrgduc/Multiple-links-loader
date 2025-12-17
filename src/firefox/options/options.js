const saveButton = document.getElementById('button');
const optionsTextArea = document.getElementById('options');
const delayInput = document.getElementById('delay');
const limitInput = document.getElementById('limit');

function loadOptions() {
    browser.storage.local.get(['links', 'delay', 'limit'], (data) => {
        if (data.links) {
            optionsTextArea.value = data.links.join('\n');
        }

        if (data.delay >= 0) {
            delayInput.value = data.delay;
        } else {
            delayInput.value = delayInput.defaultValue;
        }

        if (data.limit >= 0) {
            limitInput.value = data.limit;
        } else {
            limitInput.value = limitInput.defaultValue;
        }
    });
}

function formatLink(link) {
    return link.trim();
}

function getLinks() {
    return optionsTextArea.value.split('\n').map(formatLink);
}

function getValue(inputElement) {
    const value = inputElement.valueAsNumber;
    return Number.isFinite(value) ? value : Number(inputElement.defaultValue);
} 

function getDelay() {
    return getValue(delayInput);
}

function getLimit() {
    return getValue(limitInput);
}

function saveOptions() {
    saveButton.innerText = 'Saved';

    const links = getLinks();
    const delay = getDelay();
    const limit = getLimit();

    browser.storage.local.set({ 
        'links': links,
        'delay': delay,
        'limit': limit,
    });
}

saveButton.addEventListener('click', () => {
    saveOptions();
    loadOptions();
});

// Change button text when user change option
[optionsTextArea, delayInput, limitInput].forEach(element => {
    element.addEventListener('input', () => {
        saveButton.innerText = 'Save';
    });
});


document.addEventListener('keydown', (e) => {
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        saveOptions();
        loadOptions();
    }
})

loadOptions();
