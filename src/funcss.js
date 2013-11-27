/* funcss.js by gogoprog @ gmail . com */

var _funcssClasses = {};

function funcssLoad(file)
{
    $.get(file, function(data) {
            _funcssParse(data);
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
    var len = content.length;

    var STATE = {
        IDENTIFIER: 1,
        DEFINITION: 2,
        PARAMETERS: 3
    }

    var state = STATE.IDENTIFIER;

    var current_id = "";
    var current_def = "";
    var current_params = "";
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
                        current_params = "(";
                        state = STATE.PARAMETERS;
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

            case STATE.PARAMETERS:
            {
                switch(c)
                {
                    case ')':
                    {
                        current_params += c;
                    }
                    break;

                    case '{':
                    {
                        state = STATE.DEFINITION;
                        current_def = "";
                    }
                    break;

                    default:
                    {
                        if(_funcssIsAlphaNumeric(c) || c == "," || c == "$")
                        {
                            current_params += c;
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
                        if(current_is_func)
                        {
                            var args = _funcssParseArgs(current_params);
                            _funcssClasses[current_id] = {
                                    params : args,
                                    def : current_def
                                }
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
    args = args.split(/\b,+/);

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
    if(args.length == 0)
    {
        element.setAttribute("style", _funcssClasses[funclass].def);
    }
    else
    {
        var def = _funcssClasses[funclass].def;
        var params = _funcssClasses[funclass].params;

        for(var i=0; i<args.length; ++i)
        {
            console.log(params[i]);
            def = def.replace(params[i], args[i]);
        }

        element.setAttribute("style", def);
    }
}