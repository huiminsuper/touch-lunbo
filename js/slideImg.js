/*
	写插件
*/
function SlideImg(opt){//原生中用构造函数使用插件，此为构造函数
	//将传来的实际参数作为实例的属性以便在构造函数中的其他方法使用
	this.json=opt.data;
	//判断传入的是字符串"banner"还是对象(document.getElementById('banner'));
	this.banner=typeof opt.wrap==="string"?document.getElementById(opt.banner):opt.wrap;//此两句是分开写的也可总写this.opt=opt
	//this.opt=opt;
	//在构造函数中调用方法
	this.init();
	this.render();
	this.bindEvent();
}
//构造函数SlideImg的原型(将方法写在原型中以便公用)
SlideImg.prototype={
	init:function(){//初始化(一打开页面需显示的东西)
		this.w=window.innerWidth,//console.log(this.w);
		this.Index=0;//存放当前张的索引(因一打开页面显示的就是第一张故定义在初始化位置)
	},
	render:function(){//通过json渲染数据到页面中
		//console.log(this.json[0].src);
		var ul=document.createElement("ul");
			ol=document.createElement('ol');		
		for(var i=0,len=this.json.length;i<len;i++){
			var li=document.createElement('li'),
				olli=document.createElement('li');
			li.innerHTML='<img src="'+this.json[i].src+'" />';
			li.style.left=i*this.w+'px';
			ul.appendChild(li);			
			ol.appendChild(olli);
		}
		this.banner.appendChild(ul);
		this.banner.appendChild(ol);
	},
	bindEvent:function(){//手指触摸事件	
		//这里的this指的是实例而w是实例的属性	
		var startX,offsetX,_this=this,

		//函数声明式定义三种事件(必须先定义后调用)
		sFn=function(e){//手指触摸
			//手指在视口的X坐标
			startX=e.touches[0].clientX;//console.log(startX);
		},
		mFn=function(e){//手指移动
			//手指移动的X坐标
			//因touchmove事件默认有横向滚动条但此时不需要故取消默认行为
			e.preventDefault();
			offsetX=e.touches[0].clientX-startX;//console.log(offsetX);
			
			//更改三张图片的位置 前一张(this.Index-1) 当前张(this.Index) 后一张(this.Index+1)
			//console.log(this.getElementsByTagName('ul')[0]); 
			imgs=this.getElementsByTagName('ul')[0].getElementsByTagName('li'),//获取所有图片
			ollis=this.getElementsByTagName('ol')[0].getElementsByTagName('li');//获取lo中所有li
			//ollis=this.getElementsByTagName
			//console.log(_this.Index);
			var j=_this.Index-1,l=_this.Index+1;//console.log(j-_this.Index);
			for(j;j<=l;j++){//因事件函数所以this不可直接用
				if(imgs[j]){
					imgs[j].style.left=(j-_this.Index)*_this.w+offsetX+'px';//console.log(this);
					imgs[j].style.webkitTransition='none';				
				}
			}					
		},

		eFn=function(){//手指离开
			//判断左划还是右划
			if(offsetX>50){//向右划
				_this.change('-1');
			}else if(offsetX<-50){//向左划
				_this.change('+1');
			}else{//不划
				_this.change('0');
			}
		}

		this.banner.addEventListener("touchstart",sFn,false);
		this.banner.addEventListener("touchmove",mFn,false);
		this.banner.addEventListener("touchend",eFn,false);
	},
	change:function(n){
		var curIndex=0;//需要换的图片的索引
		//判断pc端还是移动端pc端点击数字图片滑动，移动端传字符串
		//console.log(n);
		if(typeof n==="number"){//pc端
			curIndex=n;
		}else if(typeof n==="string"){//移动端
			curIndex=this.Index+n*1;//n传过来是字符串不*1会变成字符串拼接
			//console.log(this.Index+n*1)//*1转数字		
		}
		//console.log(curIndex);
		//因索引不能一直向上加或一直向下减故需判断
		if(curIndex>=imgs.length-1){
			curIndex=imgs.length-1
		}else if(curIndex<=0){
			curIndex=0;
		}
		//切换图片与移动一样也是需要三张图一起改变位置
		var m=curIndex-1,ml=curIndex+1;
		for(m;m<=ml;m++){
			if(imgs[m]){
				imgs[m].style.left=(m-curIndex)*this.w+'px';
				imgs[m].style.webkitTransition='left 1s';
			}
		}
		//切换后之前的索引应该为现在图片的索引
		this.Index=curIndex;	
		ollis[curIndex].style.background='red';
		if(ollis[curIndex-1]) ollis[curIndex-1].style.background='none';
		if(ollis[curIndex+1]) ollis[curIndex+1].style.background='none';
	}
}

  