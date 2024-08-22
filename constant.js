function extractListItemsByClass(html, className) {
    const startTag = `<li class="${className}">`;
    const endTag = '</li>';

    const listItems = [];
    let startIndex = 0;

    while ((startIndex = html.indexOf(startTag, startIndex)) !== -1) {
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
        const hrefMatch = item.match(/href="([^"]*)"/);
        const h3Match = item.match(/<h3[^>]*>([^<]*)<\/h3>/);

        return {
            title: h3Match ? h3Match[1] : null,
            link: hrefMatch ? "https://time.com/" + hrefMatch[1] : null
        };
    });
}


module.exports = {
    extractListItemsByClass,
    extractHrefAndHeadings
};