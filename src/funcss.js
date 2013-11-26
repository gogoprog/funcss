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
    return /^[a-z0-9]+$/i.test(c);
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

    var STATE = {
        IDENTIFIER: 1,
        DEFINITION: 2,
    }

    var state = STATE.IDENTIFIER;

    var current_id = "";
    var current_def = "";

    for(var i=0; i<len; i++)
    {
        var c = content[i];

        switch(state)
        {
            case STATE.IDENTIFIER:
            {
                switch(c)
                {
                    case '{':
                    {
                        console.log("Identifier : '" + current_id + "'");
                        state = STATE.DEFINITION;
                        current_def = "";
                    }
                    break;

                    default:
                    {
                        if(_isAlphaNumeric(c))
                        {
                            current_id += c;
                        }
                    }
                    break;
                }
            }
            break;

            case STATE.DEFINITION:
            {
                switch(c)
                {
                    case '}':
                    {
                        current_id = "";
                        state = STATE.IDENTIFIER;
                    }
                    break;

                    default:
                    {
                        current_def += c;
                    }
                    break;
                }
            }
            break;
        }
    }
}

function _funcssProcess(element)
{
    console.log(element.tagName + " : " + element.className)
}

$(function() {
    _funcssIterate(document.getElementsByTagName("body")[0]);
});