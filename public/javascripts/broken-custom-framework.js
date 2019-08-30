// function call syntax
/*  [optional parameter]
* for Get:
  -.id('id of target'); 
  -.Class('targeted class name', '[element in which to search]');
  -.Tag('targeted tag name', '[element in which to search]');
  -.Name('targeted name', '[element in which to search]');
  -.Attribute('targeted Attribute name', '[element in which to search]');
*
* for Link:
    /remove the 'Active' class  on the target/
  -.Close(targeted element);
    /add the 'Active' class  on the target/
  -.Open(targeted element);
    /remove or add the 'Active' class  on the target/
  -.OpenClose(targeted element);
    /remove the 'Active' class on the current target or add the 'Active' class on the current target and remove the 'Active' class  on the other target/
  -.Select({Target: current targeted element, LeftOver: other targeted elements});
*
*/
const Get = {

  Id: function(string) {
    return document.getElementById(string);
  },

  Class: function(string, target) {
    if(target) target = eval(target);
    else target = document;
    return target.getElementsByClassName(string);
  },

  Tag: function(string, target) {
    if(target) target = eval(target);
    else target = document;
    return target.getElementsByTagName(string);
  },

  Name: function(string, target) {
    if(target) target = eval(target);
    else target = document;
    return target.getElementsByName(string);
  },

  Attribute: function(string, target) {

    if(target) target = eval(target);
    else target = document;
    return target.querySelectorAll('['+string+']');

  }

}

const Link = {

  Close: function(info) {
    
    if(!info||info==event) info = eval(this.valevent);
    if(info.classList.contains('active')) info.classList.remove('active');
    else return true;

  },

  Open: function(info) {
    
    if(!info||info==event) info = eval(this.valevent);
    if(!info.classList.contains('active')) info.classList.add('active');
    else return true;

  },
  
  OpenClose: function(info) {
    
    if(!info||info==event) info = eval(this.valevent);
    if(Link.Open(info)) Link.Close(info);

  },

  Select: function(info) {
    
    if(!info||info==event) eval("info="+this.valevent);
    if(Link.Close(info.Target)) {

      links = info.LeftOver
      for (let i = 0; i < links.length; i++) { Link.Close(links[i]); }
      Link.Open(info.Target);

    }

  },

  Tracker: function(target, homelink) {

    url = window.location.href;
    target = document.getElementById(target);
    links = target.querySelectorAll('[href]');
    for (let i = 0; i < links.length; i++) {
      
      links[i].classList.remove('active');
      if(i!=homelink) { 
        if(url.includes(links[i].getAttribute('href').split('=')[0])) {
          links[i].classList.add('active');
          return;
        }
      }
      
    }
    if(Number.isInteger(homelink)) links[homelink].classList.add('active');

  }

}

const Form = {

  Post: function(info) {

    let form = document.createElement("form"), input = document.createElement("input");
    if(!info || info==event) eval("info="+this.valevent);
    if(typeof(info.target) != 'string' || !Array.isArray(info.params) || info.params.length < 1) return;
    form.setAttribute('method',"post");
    form.setAttribute('action',"");
    for (let i = 0; i < info.params.length; i++) {
      
      input.setAttribute('type',"text");
      input.setAttribute('name', info.params[i].name);
      input.setAttribute('value', info.params[i].value);
      form.appendChild(input);      
      
    }

    Get.Id(info.target).appendChild(form);
    form.submit();

  },

  Switch: function(info) {

    if(!info || info==event) eval("info="+this.valevent);
    info.Target.innerHTML="";
    for (let i = 0; i < info.Source.length; i++) {

      if(info.Trigger.value==info.Source[i].getAttribute('name')) {

        info.Target.appendChild(info.Source[i].cloneNode(true));
        return;

      }
      
    }

    if(info.Error) info.Target.innerHTML=info.Error;
    else info.Target.innerHTML= "ERROR"

  }

}

function addEvent(elem, event, call) {

  elem.addEventListener(event, call);

}

window.onload = function(){
  
  lf = Get.Attribute('addEvent');
  for (let i = 0; i < lf.length; i++) {
    
    lf[i].valevent = lf[i].getAttribute('info');
    params = eval(lf[i].getAttribute('addEvent'));
    addEvent(lf[i], params[0], params[1]);
    lf[i].removeAttribute('info');
    lf[i].removeAttribute('addEvent');

  }

  addEvent = "";

}
