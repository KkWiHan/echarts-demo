/**
* @Author: Smj
* @Date 2023/10/7 14:50
* @Description: 乡镇名称初始化
*/


export function districtInit(district) {
  let initDistrict = '';
  switch (district) {
    case '江苏省':
      initDistrict = '全省';
      break;
    default:
      initDistrict = district.replace('市', '');
      break;
  }
  return initDistrict;
}

export function districtFill(district) {
  let initDistrict = '';
  switch (district) {
    case '全省':
      initDistrict = '江苏省';
      break;
    default:
      initDistrict = district + '市';
      break;
  }
  return initDistrict;
}
