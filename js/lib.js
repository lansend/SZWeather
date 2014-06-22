/**
 @author leuko
 @date 2009-9-6
**/
var sz121 = {
	getLeftTop:function(evnt,l,t){
		var evt  = evnt?evnt:window.event;
		var lsub = l?l:0;
		var tsub = t?t:0;
		var domBody = document.body?document.body:document.documentElement;
		var left = domBody.scrollLeft + evt.clientX + lsub ;
		var top  = domBody.scrollTop  + evt.clientY + tsub ;
		return {'left':left,'top':top};
	},
	//**s在数组arr中查找
	in_array: function (s,arr)
	{
		for(var i=0,l=arr.length;i<l;i++){
			if(arr[i]==s)
				return true;
		}
		return false;
	},
	//去除空白
	trim: function (str)
	{
		return lib.replace(str, "(^\\s+)|(\\s+$)", "");
	},

	//匹配
	match: function (str, regexp, mode)
	{
		if (typeof mode == "undefined") mode = "g";
		var re = new RegExp(regexp, mode);
		var arr = re.exec(str);
		return arr;
	},

	//替换
	replace: function (str, regexp, rep, mode)
	{
		if (typeof rep == "undefined") rep = "";
		if (typeof mode == "undefined") mode = "g";
		var re = new RegExp(regexp, mode);
		var s = str.replace(re, rep);
		return s;
	},

	//取得对象
	e: function (elementId)
	{
		return document.getElementById(elementId);
	}, 

	//取得一个元素的text
	getText: function (element)
	{
		if (typeof element.innerText != "undefined") return element.innerText;
		if (typeof element.textContent != "undefined") return element.textContent;
		return null;
	},

	//设置一个元素的text
	setText: function (element, text)
	{
		if (typeof element.innerText != "undefined") 
		{
			element.innerText = text;
			return true;
		}
		if (typeof element.textContent != "undefined") 
		{
			element.textContent = text;
			return true;
		}
		return false;
	},

	//取得元素的innerHTML
	getHTML: function (element)
	{
		return element.innerHTML;
	},
	
	//设置元素的innerHTML
	setHTML: function (element, html)
	{
		element.innerHTML = html;
		return true;
	},	

	//通过打印其下元素调试对象
	debug: function (element)
	{
		try 
		{
			var win = window.open("", win, "width=320,height=240,scrollbars=yes");
			win.document.open();
			win.document.write("<ul>");
			for (var i in element)
			{
				win.document.write("<li>" + i + "=" + element[i] + "</li>")
			}
			win.document.write("</ul>");
			win.document.close();
		}catch (e)
		{
			alert(e);
		}
	},

	//取得对象的子节点
	childNodes: function (element)
	{
		var nodes = element.childNodes;
		var _nodes = new Array();
		var j = 0;
		for (var i = 0; i < nodes.length; i ++)
		{
			if (nodes[i].nodeType == 1) 
			{
				_nodes[j] = nodes[i];
				j ++;
			}
		}

		return _nodes;
	},

	//删除一个元素
	remove: function (element)
	{
		element.parentNode.removeChild(element);
	},
	
	//取得一个对象的X坐标
	x: function (element)
	{
		var positionX = 0;
		while (element != null)
		{
			positionX += element.offsetLeft;
			element = element.offsetParent;
		}
		return positionX;
	},
	
	//取得一个对象的y坐标
	y: function (element)
	{
		var positionY = 0;
		while (element != null)
		{
			positionY += element.offsetTop;
			element = element.offsetParent;
		}
		return positionY;
	},

	//取得一个对象的width
	w: function (element)
	{
		return element.offsetWidth;
	},
	
	//取得一个对象的Height offsetHeight
	h:  function (element)
	{
		return element.offsetHeight;
	},


	//取得url中参数值
	getParameter: function (varName)
	{
		var query = window.location.search;
		if (query != null || query != "")
		{
			query = query.replace(/^\?+/, "");
			var qArray = query.split("&");
			var len = qArray.length;
			if (len > 0)
			{
				for (var i=0; i<len; i++)
				{
					var sArray = qArray[i].split("=", 2);
					if (sArray[0] && sArray[1] && sArray[0] == varName)
					{
						return unescape(sArray[1]);
					}
				}
			}
		}
		return null;
	},

	//url编码
	urlencode: function (str)
	{
		return encodeURIComponent(str);
	},	

	//url解码
	urldecode: function (str)
	{
		return decodeURIComponent(str);
	},
		
	//将字符串转换成整数
	intval:function(s)
	{
		var _s = parseInt(s);
		if (isNaN(_s)) _s = 0;
		return _s;
	},
	
	//取得body对象
	getBody:function(s)
	{
		if (document.compatMode && document.compatMode != "BackCompat")
		{
			return document.documentElement;
		}
		else
		{
			return document.body;
		}
	}
}

//去除空格
String.prototype.trim = function() 
{
	var str = "";
	try{
		str = lib.trim(this);
	}catch(e){}
	return str;
};

//取得字符串长度，flg:true时 一个中文算两个
String.prototype.strlen = function(flg)
{
	if (typeof flg == "undefined") flg = false;
	if (flg == true)
	{
		return this.replace(/[^\x00-\xff]/g, "##").length;
	}
	else
	{
		return this.length;
	}
}

/**
listener.add(element, "mousedown", function(){alert("xx");});
**/
var listener = {
	/** 添加一事件的监听器 **/
	add: function (element, event, listener)
	{
		if (typeof element.addEventListener != "undefined")
		{
			element.addEventListener(event, listener, false);
		}
		else if (typeof element.attachEvent != "undefined")
		{
			element.attachEvent("on" + event, listener);
		}
		else
		{
			eval("element." + "on" + event + "=listener");
		}
	},

	/** 删除事件的监听器 **/
	remove: function (element, event, listener)
	{
		if (typeof element.removeEventListener != "undefined")
		{
			element.removeEventListener(event, listener, false);
		}
		else if (typeof element.detachEvent != "undefined")
		{
			element.detachEvent("on" + event, listener);
		}
		else
		{
			element["on" + event] = null;
		}
	},

	/** 事件目标 **/
	src: function (event)
	{
		var targetElement = null;
		if (typeof event.target != "undefined")
		{
			targetElement = event.target;
		}
		else
		{
			targetElement = event.srcElement;
		}
		while (targetElement.nodeType == 3 && targetElement.parentNode != null)
		{
			targetElement = targetElement.parentNode;
		}
		return targetElement;
	},

	stop: function (event)
	{
		if (typeof event.stopPropagation != "undefined")
		{
			event.stopPropagation();
		}
		else
		{
			event.cancelBubble = true;
		}
	}

}

/**
cookie.set("name", "value", 3600, "/", "wangyou.com");
cookie.get("name");
**/
var cookies = {
	//设置cookie
	set: function (name, value, time, path, domain) 
	{
		var expires = "";
		if (time) 
		{
			var date = new Date();
			date.setTime(date.getTime() + time * 1000);
			expires = "; expires=" + date.toGMTString();
		}
		if (!path) path = "/";
		
		if (domain)
		{
			document.cookie = name + "=" + value + expires + "; path=" + path + "; domain=" + domain + ";";
		}
		else
		{
			document.cookie = name + "=" + value + expires + "; path=" + path + ";";
		}
	},

	//取得cookie值
	get: function (name) 
	{
		var name = name + "=";
		var cookies = document.cookie.split(";");
		for(var i=0; i<cookies.length; i++) 
		{
			var c = cookies[i];
			while (c.charAt(0) == " ") c = c.substring(1, c.length);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return null;
	}
}



function setThemes(src){
	mzsky.e("theme_css").href = src;
}
function getThemes(){
	return mzsky.e("theme_css").href;
}

function getDefaultThemes(){
	return "1.css";
}










//**确认对话框
function show_confirm(callback,tips,ifDel,ifCancel){
	
	if(document.getElementById('_shield'))
		return;
	var oDiv = document.createElement('div');
	var domBody = document.documentElement?document.documentElement:document.body;
	document.body.appendChild(oDiv);
	oDiv.setAttribute('id','_shield');
	oDiv.style.position = 'absolute';
	oDiv.style.zIndex = '99999998';
	oDiv.style.left = '0px';
	oDiv.style.top  = '0px';
	oDiv.style.width  = domBody.scrollWidth  + 'px';
	oDiv.style.height = domBody.scrollHeight + 'px';
	oDiv.style.backgroundColor = '#888';
	oDiv.style.filter  = "alpha(opacity=50)";
	oDiv.style.opacity = 0.5;
	var left_scroll = domBody.scrollLeft; //滚动条卷去的宽度
	var top_scroll = domBody.scrollTop;  //滚动条卷去的高度
	var width_view = domBody.clientWidth; //正文可见宽度
	var height_view = domBody.clientHeight; //正文可见高度
	var l = left_scroll + (width_view-260)/2;
	var t = top_scroll + (height_view-180)/2
	var tip = tips?tips:'';
	if(typeof ifDel == 'undefined')
		ifDel = 1;
	if(typeof ifCancel == 'undefined')
		ifCancel = 1;
	
	var sDel = ifDel==0?'':'<p class="color1">确定要删除吗？</p>';
	var sCancel = ifCancel==0?'':'<input class="btncm btncc" value="取　消"  type="button" onclick="hide_confirm()" />';
	
	$(document.body).append('<div class="clue_to" id="_confirm">'+sDel+'<p class="color2">'+tip+'</p><p><input class="btncm btnok" value="确　定" type="button" onclick="'+callback+'" />&nbsp;&nbsp;'+sCancel+'</p></div>');
	document.getElementById('_confirm').style.left = l + 'px';
	document.getElementById('_confirm').style.top  = t + 'px';
	document.getElementById('_confirm').style.zIndex  = '99999999';
	try{
		$e('entry').style.visibility = 'hidden';
		/*var arrObj = document.getElementsByTagName('object');
		for(var i=0,l=arrObj.length;i<l;i++){
			arrObj[i].style.visibility = 'hidden';
		}*/
	}catch(e){}
}
function hide_confirm(){
	try{
		$e('entry').style.visibility = 'visible';
		/*var arrObj = document.getElementsByTagName('object');
		for(var i=0,l=arrObj.length;i<l;i++)
			arrObj[i].style.visibility = 'visible';*/
	}catch(e){}
	try{document.getElementById('_shield').parentNode.removeChild(document.getElementById('_shield'));}catch(e){}
	try{document.getElementById('_confirm').parentNode.removeChild(document.getElementById('_confirm'));}catch(e){}
}
//**end 确认对话框


function copyToClipboard(txt) {
      if(window.clipboardData) {
              window.clipboardData.clearData();
              window.clipboardData.setData("Text", txt);
			  alert('地址已复制，可直接粘贴！');
      } else if(navigator.userAgent.indexOf("Opera") != -1) {
           window.location = txt;
      } else if (window.netscape) {
           try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				alert('地址已复制，可直接粘贴！');
           } catch (e) {
                alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
           }
           var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
           if (!clip)
                return;
           var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
           if (!trans)
                return;
           trans.addDataFlavor('text/unicode');
           var str = new Object();
           var len = new Object();
           var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
           var copytext = txt;
           str.data = copytext;
           trans.setTransferData("text/unicode",str,copytext.length*2);
           var clipid = Components.interfaces.nsIClipboard;
           if (!clip)
                return false;
           clip.setData(trans,null,clipid.kGlobalClipboard);
      }
}

//**控制日志图片的大小
function ctrl_pic_size(s,width){
	var w = width?width:200;
	$(s+" img").each(function(){
		if($(this).width()>w){
			var tmp_w = $(this).width();
			var tmp_h = $(this).height();
			var height = Math.round(tmp_h*w/tmp_w);
			$(this).height(height);
			$(this).width(w);
		}
	});
}

function get_div_count(){
	return $('div').length;
}

function get_slt_index(e,v){
	if(!document.getElementById(e))
		return -1;
	var o = document.getElementById(e).options;
	for(var i=0,l=o.length;i<l;i++){
		if(o[i].value == v)
			return i;
	}
	return -1;
}



function getWindEnByZh(s)
{
	var wind = {'北':'n','东北偏北':'nne','东北':'ne','东北偏东':'ene','东':'e','东南偏东':'ese','东南':'se','东南偏南':'sse','南':'s','西南偏南':'ssw','西南':'sw','西南偏西':'wsw','西':'w','西北偏西':'wnw','西北':'nw','西北偏北':'nnw'};
	return wind[s];
}


function createScript(src,callback,tag,arg){
	var oScript = document.createElement('script');
	oScript.setAttribute('type','text/javascript');
	oScript.src = src;
	if(typeof tag != 'undefined' && tag!='')
		oScript.setAttribute('tag',tag);
	oScript[document.all?"onreadystatechange":"onload"]=function(){
		if(typeof arg=='undefined')
			var arg=false;
		if(typeof callback=='function')
			callback(arg);
    }
	document.getElementsByTagName('head')[0].appendChild(oScript);
}
function formatDate(d,format,addDay,t)
{
	if(typeof d == 'undefined')return;
	if(typeof t=='undefined' || t=='day')
		addDay = (typeof addDay!='undefined')?86400*addDay*1000:0;
	else if(t=='hour'){
		addDay = (typeof addDay!='undefined')?3600*addDay*1000:0;
	}else{
		return;
	}
	var arr = d.split('-');
	if(typeof arr[3]!='undefined' && arr[3].indexOf(':')>0){
		var arrH = arr[3].split(':');
		var time = parseInt(Date.parse(arr[0]+'/'+arr[1]+'/'+arr[2]+" "+arrH[0]+':'+arrH[1])) + addDay;
	}else{
		var time = parseInt(Date.parse(arr[0]+'/'+arr[1]+'/'+arr[2])) + addDay;
	}
	var d = new Date();
	d.setTime(time);
	if(typeof format=='undefined')
		return (d.getMonth()+1)+'月'+d.getDate()+'日';
	var s = '';
	format = format.toLowerCase();
	if(format.indexOf('y')>=0) s = (d.getFullYear())+'年';
	if(format.indexOf('m')>=0) s += (d.getMonth()+1)+'月';
	if(format.indexOf('d')>=0) s += d.getDate()+'日';
	if(format.indexOf('h')>=0) s += (d.getHours())+'时';
	if(format.indexOf('i')>=0) s += (d.getMinutes())+'分';
	if(format.indexOf('w')>=0){
		var week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
		s += ' ' + week[d.getDay()];
	}
	return s;
}
function getWindDirection(d){
	if(typeof d=='undefined')return {'w':'','f':'bg_weatherwind'};
	if(d<=11.25 || d>=348.76)
		return {'w':'北风','f':'n'};
	else if(d>=11.26 && d<=33.75)
		return {'w':'东北偏北风','f':'nne'};
	else if(d>=33.76 && d<=56.25)
		return {'w':'东北风','f':'ne'};
	else if(d>=56.26 && d<=78.75)
		return {'w':'东北偏东风','f':'ene'};
	else if(d>=78.76 && d<=101.25)
		return {'w':'东风','f':'e'};
	else if(d>=101.26 && d<=123.75)
		return {'w':'东南偏东风','f':'ese'};
	else if(d>=123.76 && d<=146.25)
		return {'w':'东南风','f':'se'};
	else if(d>=146.26 && d<=168.75)
		return {'w':'东南偏南风','f':'sse'};
	else if(d>=168.76 && d<=191.25)
		return {'w':'南风','f':'s'};
	else if(d>=191.26 && d<=213.75)
		return {'w':'西南偏南风','f':'ssw'};
	else if(d>=213.76 && d<=236.25)
		return {'w':'西南风','f':'sw'};
	else if(d>=236.26 && d<=258.75)
		return {'w':'西南偏西风','f':'wsw'};
	else if(d>=258.76 && d<=281.25)
		return {'w':'西风','f':'w'};
	else if(d>=281.26 && d<=303.75)
		return {'w':'西北偏西风','f':'wnw'};
	else if(d>=303.76 && d<=326.25)
		return {'w':'西北风','f':'nw'};
	else if(d>=326.26 && d<=348.75)
		return {'w':'西北偏北风','f':'nnw'};
	return {'w':'','f':'bg_weatherwind'};

}
function getWindLevel(l){
	if(typeof l=='undefined')return;
	if(l<3.4) return '小于三级';
	else if(l<=5.4) return '三级';
	else if(l<=7.9) return '四级';
	else if(l<=10.7) return '五级';
	else if(l<=13.8) return '六级';
	else if(l<=17.1) return '七级';
	else if(l<=20.7) return '八级';
	else if(l<=24.4) return '九级';
	else if(l<=28.4) return '十级';
	else if(l<=32.6) return '十一级';
	else if(l>32.6) return '十二级';
}

//图片轮播
function playImg_index(){
	var time = 3000;//图片延时
	var curImgID = 0;//当前显示图片的序号
	var intervalID = setInterval(imgToggle, time);
	$(".img_title a").text($(".cur_img").attr("title"));
	$(".img_title a").attr("title", $(".cur_img").attr("title"));
	$(".img_title a").attr("href", $(".cur_img").attr("href"));
	$(".imgID a").click(function(){
		clearInterval(intervalID);//先停止定时器，保证点击了某项的时候该项有足够的时间显示
		$(".cur_img").css({
			display: "none"
		});//除了cur_img外的其余图片设置为不可见
		$(".cur_img").removeClass("cur_img");
		$(".imgbox a").eq($(".imgID a").index($(this))).fadeIn("slow");//选择对应的按钮序号的图片显示，this指向你按下的按钮
		$(".imgbox a").eq($(".imgID a").index($(this))).addClass("cur_img");
		$(".cur_ID").removeClass("cur_ID");
		$(this).addClass("cur_ID");
		change();//change函数主要是把处理img_title的a标签的相关操作放到一起
		intervalID = setInterval(imgToggle, time);
	});
	$(".img_title a").click(function(){
		//alert($(this).attr("href"));//响应点击题目
	});
	$(".imgbox img").click(function(){
		//alert($(this).parent().attr("href"));//响应点击图片
	});
	function imgToggle(){
		curImgID = $(".imgID a").index($(".cur_ID"));//当前按钮的序号，与当前图片序号对应
		$(".imgbox .all").css({
			display: "none"
		});//除了cur_img外的其余图片设置为不可见
		$(".cur_img").removeClass("cur_img");
		if (curImgID == $(".imgID a").length - 1) {
			curImgID = 0;
		}
		else {
			curImgID += 1;
		}
		$(".imgbox a").eq(curImgID).fadeIn("slow");
		$(".imgbox a").eq(curImgID).addClass("cur_img");
		$(".cur_ID").removeClass("cur_ID");
		$(".imgID a").eq(curImgID).addClass("cur_ID");
		change();
	}
	function change(){
		$(".img_title a").attr("title", $(".cur_img").attr("title"));
		$(".img_title a").text($(".cur_img").attr("title"));
		$(".img_title a").attr("href", $(".cur_img").attr("href"));
	}
}