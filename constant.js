function extractListItemsByClass(html) {
    const startTag = `<li class="latest-stories__item">`;
    const endTag = '</li>';

    const listItems = [];
    let startIndex = 0;

    while ((startIndex = html.indexOf(startTag, startIndex)) !== -1) {
        console.log(startIndex," " ,startTag);
        const endIndex = html.indexOf(endTag, startIndex) + endTag.length;
        if (endIndex === -1) break;

        const item = html.slice(startIndex, endIndex);
        listItems.push(item);
        startIndex = endIndex;
    }   
    return listItems;
} 


function extractHrefAndHeadings(items) {
    return items.map(item => {
        
        const hrefStartIndex = item.indexOf('href="');
        const hrefEndIndex = hrefStartIndex !== -1 ? item.indexOf('"', hrefStartIndex + 6) : -1;
        const href = hrefStartIndex !== -1 && hrefEndIndex !== -1 ? item.slice(hrefStartIndex + 6, hrefEndIndex) : null;
        
        
        const titleStartIndex = item.indexOf('<h3 class="latest-stories__item-headline">');
        const titleEndIndex = titleStartIndex !== -1 ? item.indexOf('</h3>', titleStartIndex + 4) : -1;
        const title = titleStartIndex !== -1 && titleEndIndex !== -1 ? item.slice(titleStartIndex + 42, titleEndIndex) : null;

        return {
            title: title,
            link: href ? "https://time.com/" + href : null
        };
    });
}

module.exports = {
    extractListItemsByClass,
    extractHrefAndHeadings
};


