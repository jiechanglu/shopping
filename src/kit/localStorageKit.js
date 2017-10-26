// localStorage中的key
const key = 'buyGoodsCount';

// 1.0 存储方法
// goodsinfo:{gid:99,bcount:1}
export function setItem(goodsinfo){
    // console.log('setItem');
    // console.log(goodsinfo);
    // 1.0 判断 localStorage中是否有这个商品的记录了，
    // 如果有则更新购买数量 否则追加
    // {88:1,89:2}
    var goodsObj = getItem();
    // 2.0 判断goodsinfo.gid 是否在goodsObj中存在
    if(goodsObj[goodsinfo.gid]){
        goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid] + goodsinfo.bcount;
    }else{
        goodsObj[goodsinfo.gid] = goodsinfo.bcount;
    }
    // 将修改以后的goodsObj的值设置回localStorage中
    // 所以最后得到的对象型式为{88:1,89:2}
    localStorage.setItem(key,JSON.stringify(goodsObj));
}

// 2.0 获取方法
export function getItem(){
    // console.log('getItem');
    var gStr = localStorage.getItem(key);
    // 将字符串转换成js对象
    var goodsObj = JSON.parse(gStr);
    // 判断goodsObj是否存在（是否是一个对象）
    if(!goodsObj){
        // 向localStorage中写一个空对象
        localStorage.setItem(key,JSON.stringify({}));
        return;
    }
    return goodsObj;
}

// 3.0 删除方法
export function removeItem(goodsid){
    // 获取值
    var goodsObj = getItem();
    // 删除goodsObj中（删除一个对象中的内容可以用delete，但数组则不能用delete，因为还会占位置）
    delete goodsObj[goodsid];
    // 重新设置localStroage
    localStorage.setItem(key,JSON.stringify(goodsObj));
}