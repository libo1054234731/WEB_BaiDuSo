window.onload = function(){
	
	//获得元素对象
	var searchInput = document.getElementById('searchInput');
	var searchTips = document.getElementById('searchTips');
	var tipsItems = searchTips.getElementsByTagName('li');
	
	//下标计数变量
	var keyIndex = -1;
	
	//文本框获得焦点，显示内容
	searchInput.onfocus = function(){
		searchTips.style.display = 'block';
	}
	//阻止文本框单击事件冒泡
	
	searchInput.onclick = function(e){
		e = e || window.event;
		e.stopPropagation ? e.stopPropagation() :e.cancelBubble = true;
	}
	
	
	
	//document 单击隐藏事件
	
	document.onclick = function(){
		resetSearchTips();
		
		
		
	}
	
	
	for(var i = 0; i < tipsItems.length - 1;i++){
		
		//单击文本框
		tipsItems[i].onclick = function(){
			
			//返回li中的文字
			var txt = this.getElementsByTagName('span')[0].innerText;
			//文本框赋值
			searchInput.value = txt;
			
		}
		
		;(function(index){
			
			//鼠标悬停li事件
			tipsItems[i].onmouseenter = function(){
				keyIndex = index;//当前下标赋值给计数变量
			}
			
		})(i);
		
		
		
		//单击a标签删除li
		var a = tipsItems[i].getElementsByTagName('a')[0];
		
		a.onclick = function (e) {
			//阻止事件冒泡
			e = e || window.event;
			e.stopPropagation ? e.stopPropagation() :e.cancelBubble = true;
			
			//删除li
			searchTips.removeChild(this.parentNode);
			
		}
		
	}
	//键盘上下键选择文字
	document.onkeydown = function(e){
		
		//判断提示框是否显示
		if (searchTips.style.display != 'block') {
			return;
		}
		
		e = e ||window.event;
		
//		ESC键关闭提示
		if(e.keyCode == 27){
			resetSearchTips();
			
		}
		//下箭头
		if (e.keyCode == 40) {
			//下标自加
			keyIndex ++;
			if (keyIndex > tipsItems.length - 2) {
				keyIndex = 0;
			}
			
			highlight(keyIndex);//高亮
			
		}
//		上箭头
		if (e.keyCode == 38) {
			//下标自减
			keyIndex --;
			if (keyIndex < 0) {
				keyIndex = tipsItems.length - 2;
			}
			
			highlight(keyIndex);//高亮
			
		}
		//回车选择文字
		if(e.keyCode == 13){
			//返回li中的文字
			var txt = tipsItems[keyIndex].getElementsByTagName('span')[0].innerText;
			//文本框赋值
			searchInput.value = txt;
			
			resetSearchTips();
		}
		
	}
	
	//提示内容恢复初始状态
	
	function resetSearchTips(){
		
		searchTips.style.display = 'none';
		searchInput.blur();
		//失去高亮
		highlight(-1);
		keyIndex = -1;
	}
	//高亮函数
	function highlight(index){
		//去掉说有的高亮
		for (var i = 0;i < tipsItems.length; i ++) {
			tipsItems[i].className = '';
		}
		if(index == -1){
			return;
		}
//		单独高亮
		tipsItems[index].className = 'active';
	}
	
}
