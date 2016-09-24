/*
	使用插件
*/
//用ajsx的原生方法获取json数据
var data=null;
function getData(){
	//判断兼容
	if(window.XMLHttpRequest){
		var xhr=new XMLHttpRequest();
	}else{//ie浏览器
		var xhr=new ActiveXObjext('Microsoft.HMLHTTP');
	}
	//打开链接
	xhr.open("get","data.json",false);
	//接收数据（会执行一个方法即onreadystatechange()）
	xhr.onreadystatechange=function(){
		//判断是否接收成功
		if(xhr.readyState==4 && xhr.status>=200 && xhr.status<300){
			//成功则接收的数据存储在 对象.responseText中获取到的数据是对象式的字符串需转换成真正的对象有两种方法
			//JSON.parse();//功能：转成真正的数组或对象
			//eval();//功能：同上；//区别：变量需加小括号且括号要拼接
			//eg:eval("("+xhr.responseText+")");
			data=JSON.parse(xhr.responseText);//或eval("("+xhr.responseText+")");
			//console.log(data);
		}
	}
	//发送数据
	xhr.send();
	return data;//封装的函数返回最终的结果
}
//使用插件
new SlideImg({
	data:getData(),
	wrap:document.getElementById('banner')//页可能传"banner";
})