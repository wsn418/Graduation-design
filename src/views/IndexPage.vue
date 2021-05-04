<template>
<div class="W-100 h-100">
  <div class="w-75 mx-auto">
    <div class="bg-gray border-bottom">
      <div class="btn-group" role="group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
        <label class="btn " for="btnradio1">全部</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
        <label class="btn " for="btnradio2">精华</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
        <label class="btn " for="btnradio3">分享</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off">
        <label class="btn " for="btnradio4">问答</label>
       </div>
    </div>
    <div class="bg-light">
      <ul class="list-inline">
        <li class="border-bottom d-flex justify-content-between py-1 px-3">
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" class="rounded-circle border border-light" style="width:50px">
            <span class="rounded px-2 mx-2 bg-green" style="fontSize:10px">置顶</span>
            <span style="fontSize:15px">这里是标题，这里是标题，这里是标题</span>
            </div>
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" style="width:20px" class="mr-2">
            <span>20小时前</span>
          </div>
        </li>
         <li class="border-bottom d-flex justify-content-between py-1 px-3">
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" class="rounded-circle border border-light" style="width:50px">
            <span class="rounded px-2 mx-2 bg-green" style="fontSize:10px">置顶</span>
            <span style="fontSize:15px">这里是标题，这里是标题，这里是标题</span>
            </div>
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" style="width:20px" class="mr-2">
            <span>20小时前</span>
          </div>
        </li>
         <li class="border-bottom d-flex justify-content-between py-1 px-3">
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" class="rounded-circle border border-light" style="width:50px">
            <span class="rounded px-2 mx-2 bg-green" style="fontSize:10px">置顶</span>
            <span style="fontSize:15px">这里是标题，这里是标题，这里是标题</span>
            </div>
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" style="width:20px" class="mr-2">
            <span>20小时前</span>
          </div>
        </li>
        <li class="border-bottom d-flex justify-content-between py-1 px-3">
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" class="rounded-circle border border-light" style="width:50px">
            <span class="rounded px-2 mx-2 bg-green" style="fontSize:10px">置顶</span>
            <span style="fontSize:15px">这里是标题，这里是标题，这里是标题</span>
            </div>
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" style="width:20px" class="mr-2">
            <span>20小时前</span>
          </div>
        </li>
        <li class="border-bottom d-flex justify-content-between py-1 px-3">
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" class="rounded-circle border border-light" style="width:50px">
            <span class="rounded px-2 mx-2 bg-green" style="fontSize:10px">置顶</span>
            <span style="fontSize:15px">这里是标题，这里是标题，这里是标题</span>
            </div>
          <div class="d-flex align-items-center">
            <img src="../assets/avatar.jpg" alt="" style="width:20px" class="mr-2">
            <span>20小时前</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script lang='ts'>
export default {
  name: 'indexPage'
}
</script>
<style>
.bg-gray{
  background-color: #F6F6F6;
}
.bg-E1 {
  background-color: #EFF3F5;
}
.btn:focus, .btn:active, .btn:visited {
    outline: none !important;
    box-shadow: none !important;
}
.btn-outline-primary{
  border: none  !important;
}
.bg-green{
  background-color: #80BD01;
  color: white;
}
</style>
