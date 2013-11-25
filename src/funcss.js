/* funcss.js by gogoprog @ gmail . com */

function funcssLoad(file)
{
    console.log("funcssLoad");

    $.get(file, function(data) {
            _funcssParse(data);
        });
}

function _funcssInjectCss(content)
{
    var el=document.createElement("style");
    el.setAttribute("type", "text/css");
    el.innerText = content;

    document.getElementsByTagName("head")[0].appendChild(el);
}

function _isAlphaNumeric(c)
{
    return /^a-zA-Z0-9]/.test(c);
}

function _funcssIterate(node)
{
    var children = node.childNodes;

    _funcssProcess(node);

    for(i=0;i<children.length; i++)
    {
        if(children[i].nodeType == 1)
        {
            _funcssIterate(children[i]);
        }
    }
}

function _funcssParse(content)
{
    _funcssInjectCss(content);

    var len = content.length;

    for(var i=0; i<len; i++) {
        
    }
}

function _funcssProcess(element)
{
    console.log(element.tagName + " : " + element.className)
}

$(function() {
    _funcssIterate(document.getElementsByTagName("body")[0]);
});