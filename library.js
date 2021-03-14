Element.prototype.createNode = function(name,attr,html)
{
    if(!name) return this;
    attr = attr || undefined;
    html = (html === false) ? undefined : html;
    let element = document.createElement(name);
    if(attr != undefined)
    {
        for(var i in attr) element.setAttribute(i,attr[i]);
    }
    if(html != undefined) element.innerHTML = html;
    this.appendChild(element)
    return element;
}
Element.prototype.css = function(data){
    if(data == undefined) return this;
    for (var i in data) this.style[i] = data[i];
    return this;
}
Element.prototype.getCSS = function(css,element)
{
    if(css === undefined) return;
    
    element = element || undefined ;
    return window.getComputedStyle(this,element).getPropertyValue(css);
}
String.prototype.toNumber = function(){return Number(this)}
String.prototype.filterNumber = function(){return this.match(/[0-9,.]/ig).join("").toNumber()}