import { Injectable } from '@angular/core';

@Injectable()
export class GetExportServiceService {

  constructor() { }
  public goExport(JSONData,listSave,ths,FileName) {
	// JSONData：Array 列表数据
	// listSave:Array 所需数据列的key
	// ths:Array 表头
	// FileName:String 输入excel表的文件名
	//listSave和ths的顺序保持一致
	
	//列表数据处理
	function delKey(obj,arrs){
		for(let i=0;i<obj.length;i++){
			Object.keys(obj[i]).forEach(keys => {
				if(arrs.indexOf(keys) == -1){
					delete obj[i][keys];
				}
			});
		}
		return obj;
	}

	//列表排序
	function ksort(obj,listOrder){
		for(let i=0;i<obj.length;i++){
			let objorder = {}
			listOrder.forEach(el => {
				objorder[el] = obj[i][el]
			});
			obj[i] = objorder;
		}
	  }

	//列表数据处理
	delKey(JSONData,listSave)

	ksort(JSONData,listSave);

    // 先转化json  
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var excel = '<table>';
    var row = "<tr>";
	// 设置表头
	for(let i=0;i<ths.length;i++){
		row += '<td>'+ths[i]+'</td>'
	}
    // 换行
    excel += row + "</tr>";
    // 设置数据
    for (var i = 0; i < arrData.length; i++) {
      var row = "<tr>";
      for (var index in arrData[i]) {
        row += '<td>' +arrData[i][index]+ '</td>';
      }
      excel += row + "</tr>";
    }
    excel += "</table>";
    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";
    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
    var link = document.createElement("a");
    link.href = uri;
    link.download = FileName + ".xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
