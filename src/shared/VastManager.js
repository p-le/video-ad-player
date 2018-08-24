
class JXONTree {
    constructor(parentDom) {
        if (parentDom.hasChildNodes()) {
            let sCollectedTxt = '';
            for (var oNode, sProp, vContent, nItem = 0; nItem < parentDom.childNodes.length; nItem++) {
                oNode = parentDom.childNodes.item(nItem);
                if ((oNode.nodeType - Node.ELEMENT_NODE | Node.ELEMENT_NODE) === Node.TEXT_NODE) { 
                    sCollectedTxt += oNode.nodeType === Node.ELEMENT_NODE ? oNode.nodeValue.trim() : oNode.nodeValue; 
                } else if (oNode.nodeType === Node.ELEMENT_NODE && !oNode.prefix) {
                    sProp = oNode.nodeName.toLowerCase();
                    vContent = new JXONTree(oNode);
                    if (this.hasOwnProperty(sProp)) {
                        if (this[sProp].constructor !== Array) { this[sProp] = [this[sProp]]; }
                            this[sProp].push(vContent);
                        } else {     
                            this[sProp] = vContent; 
                        }
                    }
                }
                if (sCollectedTxt) { 
                    this.value = this.parseText(sCollectedTxt); 
                }
          }

          if (parentDom.hasAttributes && parentDom.hasAttributes()) {
                let oAttrib;
                for (var nAttrib = 0; nAttrib < parentDom.attributes.length; nAttrib++) {
                    oAttrib = parentDom.attributes.item(nAttrib);
                    this[`@${oAttrib.name.toLowerCase()}`] = this.parseText(oAttrib.value.trim());
                }
          }
    }

    parseText(sValue) {
        if (/^\s*$/.test(sValue)) { return null; }
        if (/^(?:true|false)$/i.test(sValue)) { return sValue.toLowerCase() === 'true'; }
        if (isFinite(sValue)) { return parseFloat(sValue); }
        if (isFinite(Date.parse(sValue))) { return new Date(sValue); }
        return sValue.trim();
    }
}

class VastManager {
    constructor(opts) {
        this.settings = opts;
        this.vastResponses = [];
        this.isFollowing = true;
    }

    followAdTagUrl() {
        this.vastResponses.push(this.fetchAd(this.settings.AD_TAG_URL));
    }

    fetchAd(adTagUrl) {
        if (!adTagUrl) {
            // LOG ERROR
            return ;
        }
        return fetch(adTagUrl, {})
            .then(response => response.text())
            .then(xmlText => this.parseToXmlDom(xmlText))
            .then(xmlDom => this.validateXmlDom(xmlDom))
            .catch(error => console.log(error));
    }

    parseToXmlDom(xmlText) {
        let result;

        if (typeof window.DOMParser === 'undefined') {
            const xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlText);
            if (xmlDoc.parseError.errorCode != 0) {
                return Promise.reject('Error Parsing XML');
            }
        } else {
            const parser = new window.DOMParser();
            result = parser.parseFromString(xmlText, 'text/xml');
        }

        return Promise.resolve(result);
    }

    validateXmlDom(xmlDom) {
        const jxonTree = new JXONTree(xmlDom);
    }
}

export default VastManager;