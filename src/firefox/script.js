function createLink(name, url) {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = name;
    // Alt + Left Click to toggle ignore
    link.addEventListener('click', (event) => {
        if (event.altKey && event.button === 0) {
            event.preventDefault();
            link.classList.toggle('ignore');
        }
    });
    return link;
}

function addLink(groupLinks, line) {
    // The line have format: <name> | <link>
    const [name, url] = line.split('|').map(part => part.trim());
    const link = createLink(name, url);
    groupLinks.appendChild(link);
}

function isGroupName(line) {
    return line[0] == '#';
}

function isLink(line) {
    return line.length != 0 && !isGroupName(line);
}

async function getLimit() {
    const data = await browser.storage.local.get('limit');
    return data.limit;
}

async function getDelay() {
    const data = await browser.storage.local.get('delay');
    return data.delay;
}

async function openTabsInGroup(group, inBackground = false) {
    const links = Array.from(group.getElementsByTagName('a'));
    const activeLinks = links.filter(
        link => !link.classList.contains('ignore')
    );

    try {
        const [limit, delay] = await Promise.all([getLimit(), getDelay()]);
        const delayMs = delay * 1000;
        const shouldDelay = activeLinks.length > limit;

        for (let i = 0; i < activeLinks.length; i++) {
            const link = activeLinks[i];

            if (shouldDelay && i > 0) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }

            await browser.tabs.create({
                url: link.href,
                // opening delayed tabs in background to avoid focus stealing
                active: !(inBackground || shouldDelay)
            });
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}

container = document.getElementById('main')

browser.storage.local.get('links', (data) => {
    if (!data.links) {
        browser.runtime.openOptionsPage();
    } else {
        let i = 0;
        while (i < data.links.length) {
            let line = data.links[i];
            if (isGroupName(line)) {
                const group = document.createElement('div');
                group.classList.add('group');

                const groupLinks = document.createElement('div');
                groupLinks.classList.add('group-links');
                
                const groupName = document.createElement('p');
                groupName.textContent = line.slice(1).trim();
                groupName.addEventListener('mousedown', (event) => {
                    if (event.button === 0) { // Left Click: Open tabs normally
                        openTabsInGroup(group);
                    } else if (event.button === 1) { // Middle Click: Open tabs in background
                        event.preventDefault();
                        openTabsInGroup(group, true);
                    }
                });
                group.appendChild(groupName);

                let j = i + 1;
                while (j < data.links.length && isLink(data.links[j])) {
                    addLink(groupLinks, data.links[j]);
                    j++;
                }

                group.appendChild(groupLinks);
                container.appendChild(group);
            }
            i++;
        }
    }
});
