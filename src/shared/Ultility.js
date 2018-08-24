export const getWindowSelf = () => {
    return window.self;
};

export const getWindowTop = () => {
    return window.top;
};

export const inIframe = () => {
    try {
        return getWindowSelf() !== getWindowTop();
    } catch (e) {
        return true;
    }
};

export const createInvisibleIframe = () => {
    const iframe = document.createElement('iframe');
    iframe.height = 0;
    iframe.width = 0;
    iframe.border = '0px';
    iframe.hspace = '0';
    iframe.vspace = '0';
    iframe.marginHeight = '0';
    iframe.marginWidth = '0';
    iframe.style.border = '0';
    iframe.scrolling = 'no';
    iframe.frameBorder = '0';
    iframe.src = 'about:blank';
    iframe.style.display = 'none';

    return iframe;
};

export const createTrackPixelHtml = (url) => {
    if (!url) {
        return '';
    }

    const escapedUrl = encodeURI(url);
    const img =`
        <div style="position:absolute;left:0px;top:0px;visibility:hidden;">
            <img src="${escapedUrl}">
        </div>
    `;

    return img;
};

export const createTrackPixelIframeHtml = (url, encodeURI = true, sandbox = '') => {
    if (!url) {
        return '';
    }
    if (encodeURI) {
        url = encodeURI(url);
    }
    if (sandbox) {
        sandbox = `sandbox=${sandbox}`;
    }

    return `<iframe ${sandbox}
        frameborder="0"
        allowtransparency="true"
        marginheight="0" marginwidth="0"
        width="0" hspace="0" vspace="0" height="0"
        style="height:0px;width:0px;display:none;"
        scrolling="no"
        src="${url}">
    </iframe>`;
};

export const getIframeDocument = (iframe) => {
    if (!iframe) {
        return;
    }
    let doc;
    try {
        if (iframe.contentWindow) {
            doc = iframe.contentWindow.document;
        } else if (iframe.contentDocument.document) {
            doc = iframe.contentDocument.document;
        } else {
            doc = iframe.contentDocument;
        }
    } catch (e) {

    }
    
    return doc;
};

export const insertHtmlIntoIframe = (html, width, height) => {
    if (!html) {
        return;
      }
    
      let iframe = document.createElement('iframe');
      iframe.width = width;
      iframe.height = height;
      iframe.hspace = '0';
      iframe.vspace = '0';
      iframe.marginWidth = '0';
      iframe.marginHeight = '0';
      iframe.style.display = 'none';
      iframe.style.height = '0px';
      iframe.style.width = '0px';
      iframe.scrolling = 'no';
      iframe.frameBorder = '0';
      iframe.allowtransparency = 'true';
    
      insertElement(iframe, document, 'body');
    
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
};

export const insertElement = (element, doc, target) => {
    doc = doc || document;
    let elToAppend;
    if (target) {
      elToAppend = doc.getElementsByTagName(target);
    } else {
      elToAppend = doc.getElementsByTagName('head');
    }

    try {
      elToAppend = elToAppend.length ? elToAppend : doc.getElementsByTagName('body');
      if (elToAppend.length) {
        elToAppend = elToAppend[0];
        elToAppend.insertBefore(element, elToAppend.firstChild);
      }
    } catch (e) {}
};

export const addEventHandler = (element, event, func) => {
    if (element.addEventListener) {
        element.addEventListener(event, func, true);
    } else if (element.attachEvent) {
        element.attachEvent(`on${event}`, func);
    }
};

export const getOrigin = () => {
    if (!window.location.origin) {
        return `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`
    } else {
        window.location.origin;
    }
};

export const loadScript = (src) => {
    const script = document.createElement('script');
    const node = document.getElementsByTagName('script')[0];
    script.async = true;
    script.type = 'text/javascript';
    script.src = src;
    node.parentNode.insertBefore(script, node);
};