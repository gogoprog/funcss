/* funcss.js by gogoprog @ gmail . com */

var _funcssClasses = {};

function funcssLoad(file)
{
    $.get(file, function(data) {
            _funcssParse(data);

            for(var key in _funcssClasses)
            {
                console.log(key + " = " + _funcssClasses[key]);
            }

            _funcssIterate();
        });
}

function _funcssInjectCss(content)
{
    var el=document.createElement("style");
    el.setAttribute("type", "text/css");
    el.innerText = content;

    document.getElementsByTagName("head")[0].appendChild(el);
}

function _funcssIsAlphaNumeric(c)
{
    return /^[a-z0-9\\_]+$/i.test(c);
}

function _funcssIterate()
{
    var all = document.getElementsByTagName("*");

    for (var i=0, max=all.length; i < max; i++)
    {
        _funcssProcess(all[i]);
    }
}

function _funcssParse(content)
{
    //_funcssInjectCss(content);

    var len = content.length;

    var STATE = {
        IDENTIFIER: 1,
        DEFINITION: 2,
    }

    var state = STATE.IDENTIFIER;

    var current_id = "";
    var current_def = "";
    var current_is_func = false;

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
                        state = STATE.DEFINITION;
                        current_def = "";
                    }
                    break;

                    case '(':
                    {
                        current_is_func = true;
                    }
                    break;

                    default:
                    {
                        if(_funcssIsAlphaNumeric(c))
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
                        //current_def += "}";

                        if(current_is_func)
                        {
                            _funcssClasses[current_id] = current_def;
                        }
                        else
                        {
                            // :todo: handle non-func classes.
                        }

                        current_id = "";
                        current_is_func = "";
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

function _funcssParseArgs(str)
{
    var args = str.slice(1, -1);
    args = args.split(/\b\s+/);

    for(var i = args.length - 1; i >= 0; i--) {
        if(args[i] === "") {
           args.splice(i, 1);
        }
    }

    return args;
}

function _funcssProcess(element)
{
    var p = element.className.indexOf("(");

    if(p !== -1)
    {
        var shortname = element.className.substring(0,p);

        var args = _funcssParseArgs(element.className.substring(p));

        _funcssApply(element, shortname, args);
    }
}

function _funcssApply(element, funclass, args)
{
    console.log("Applying '" + funclass + "'on " + element.tagName);
    console.log(args);

    if(args.length == 0)
    {
        element.setAttribute("style", _funcssClasses[funclass]);
    }
    else
    {
        var def = _funcssClasses[funclass];

        for(var i=0; i<args.length; ++i)
        {
            def = def.replace("$" + i, args[i]);
        }

        element.setAttribute("style", def);
    }
}