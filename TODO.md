## Todo/Idea
- [ ] Pernamently disable tabs? stored in storage? (a bit bad UX btw)
   - [ ] Easy Enable all/Reset ignored links button
- [ ] using j,k or tab, shift tab to switch between group
- [ ] Or enable user to click in a line in lines in a group, so that it will open jus tabs in a single line, less tabs to open, less delay
- [ ] Confirmation dialog for opening group with number of tabs exceed a threshold? if user agree then open all, mind user that open large number of tabs can cause lagging for browser and device... 
- [ ] Instead delaying for each tab, delaying in batch, smart batching
- [ ]  when open tabs, check if the browser already have that tab or not (expensive query operation)
    - [ ] Optional toggle: “Skip already open tabs”, default False
- [ ] using Shift + Click on group will auto confirm to open multiple tabs without delay
- [ ] Add Options in options page: Open instantly, Open gradually (recommended)
- [ ] Limit tabs for group, like to 20 tabs for safety
- [ ] Fix chrome cannot save options changing (maybe problem come from chrome storage)

## Done
- [x] Add shortcut to open options page
- [x]  middle click to open tabs in group in background
- [x] termporary disable/ignore link when open tabs in group
- [x]  fix delay < 1 (handle delay < 1)
- [x] fix if disable links, and the remain links < limit but it still add delay
- [x] when opening delayed tabs, open in background? better UX than let it jump to the opened tab

## Abandoned
- More levels for group, group can contain other groups?
- Options to change theme/colors on the main page -> Keep it simple
- Implement alt + arrow key to move line -> Ctrl X and Ctrl V do the j
- Comment feature in textarea -> Unnecessary
- Using right click to hide links -> worse UX than Alt + Click, maybe add custom context menu for ignore and unignore links is better